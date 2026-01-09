const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const dataPath = path.join(__dirname, '../data');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Ensure data directory exists
fs.ensureDirSync(dataPath);
fs.ensureDirSync(path.join(__dirname, '../uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
const uploadMultiple = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
  },
}).array('images', 10); // Allow up to 10 images

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Default admin credentials (in production, use environment variables)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === adminUsername && password === adminPassword) {
      const token = jwt.sign({ username: adminUsername }, JWT_SECRET, {
        expiresIn: '24h',
      });

      res.json({ token, message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Portfolio Management
router.get('/portfolio', authenticateToken, async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    if (await fs.pathExists(portfolioPath)) {
      const portfolio = await fs.readJson(portfolioPath);
      res.json(portfolio);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

router.post('/portfolio', authenticateToken, uploadMultiple, async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    let portfolio = [];

    if (await fs.pathExists(portfolioPath)) {
      portfolio = await fs.readJson(portfolioPath);
    }

    // Handle cover image and gallery images
    let coverImage = null;
    let galleryImages = [];
    
    if (req.files && req.files.length > 0) {
      // Check if we're uploading a cover image (indicated by coverImageUpload field)
      if (req.body.coverImageUpload === 'true') {
        // First file is the cover image
        coverImage = `/uploads/${req.files[0].filename}`;
        // Rest are gallery images (if any)
        if (req.files.length > 1) {
          galleryImages = req.files.slice(1).map((file) => `/uploads/${file.filename}`);
        }
      } else {
        // All files are gallery images
        galleryImages = req.files.map((file) => `/uploads/${file.filename}`);
      }
    }

    const newItem = {
      id: portfolio.length > 0 ? Math.max(...portfolio.map((p) => p.id)) + 1 : 1,
      ...req.body,
      serviceId: req.body.serviceId ? parseInt(req.body.serviceId) : null,
      categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : null,
      coverImage: coverImage || 'portfolio-placeholder', // Cover image
      image: coverImage || 'portfolio-placeholder', // Backward compatibility
      galleryImages: galleryImages, // Gallery images array
      tags: typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags,
      tools: typeof req.body.tools === 'string' ? JSON.parse(req.body.tools) : req.body.tools,
      featured: req.body.featured === 'true' || req.body.featured === true,
    };

    portfolio.push(newItem);
    await fs.writeJson(portfolioPath, portfolio);

    res.json({ message: 'Portfolio item created', item: newItem });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ error: 'Failed to create portfolio item' });
  }
});

router.put('/portfolio/:id', authenticateToken, uploadMultiple, async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    if (!(await fs.pathExists(portfolioPath))) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    let portfolio = await fs.readJson(portfolioPath);
    const index = portfolio.findIndex((p) => p.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    // Handle cover image and gallery images separately
    let coverImage = portfolio[index].coverImage || portfolio[index].image;
    let galleryImages = portfolio[index].galleryImages || [];
    
    // Parse existing images from request
    if (req.body.existingCoverImage) {
      coverImage = req.body.existingCoverImage;
    }
    
    if (req.body.existingGalleryImages) {
      try {
        const existingGalleryArray = typeof req.body.existingGalleryImages === 'string' 
          ? JSON.parse(req.body.existingGalleryImages) 
          : req.body.existingGalleryImages;
        galleryImages = Array.isArray(existingGalleryArray) ? existingGalleryArray : [];
      } catch (e) {
        galleryImages = portfolio[index].galleryImages || [];
      }
    }
    
    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      // Check if we're uploading a new cover image (indicated by coverImageUpload field)
      if (req.body.coverImageUpload === 'true' && req.files.length > 0) {
        // First file is the new cover image
        coverImage = `/uploads/${req.files[0].filename}`;
        // Rest are gallery images (if any)
        if (req.files.length > 1) {
          const newGalleryImages = req.files.slice(1).map((file) => `/uploads/${file.filename}`);
          galleryImages = [...galleryImages, ...newGalleryImages];
        }
      } else {
        // All files are gallery images
        const newGalleryImages = req.files.map((file) => `/uploads/${file.filename}`);
        galleryImages = [...galleryImages, ...newGalleryImages];
      }
    }

    portfolio[index] = {
      ...portfolio[index],
      ...req.body,
      id: parseInt(req.params.id),
      serviceId: req.body.serviceId ? parseInt(req.body.serviceId) : portfolio[index].serviceId,
      categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : portfolio[index].categoryId,
      coverImage: coverImage,
      image: coverImage, // Backward compatibility
      galleryImages: galleryImages,
      tags: typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags,
      tools: typeof req.body.tools === 'string' ? JSON.parse(req.body.tools) : req.body.tools,
      featured: req.body.featured === 'true' || req.body.featured === true,
    };

    await fs.writeJson(portfolioPath, portfolio);

    res.json({ message: 'Portfolio item updated', item: portfolio[index] });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ error: 'Failed to update portfolio item' });
  }
});

router.delete('/portfolio/:id', authenticateToken, async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    if (!(await fs.pathExists(portfolioPath))) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    let portfolio = await fs.readJson(portfolioPath);
    portfolio = portfolio.filter((p) => p.id !== parseInt(req.params.id));
    await fs.writeJson(portfolioPath, portfolio);

    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});

// Resume Management
router.get('/resume', authenticateToken, async (req, res) => {
  try {
    const resumePath = path.join(dataPath, 'resume.json');
    if (await fs.pathExists(resumePath)) {
      const resume = await fs.readJson(resumePath);
      res.json(resume);
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

router.put('/resume', authenticateToken, async (req, res) => {
  try {
    const resumePath = path.join(dataPath, 'resume.json');
    await fs.writeJson(resumePath, req.body);
    res.json({ message: 'Resume updated', resume: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

// Upload resume PDF
router.post('/resume/upload-pdf', authenticateToken, (req, res) => {
  upload.single('pdf')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 10MB limit' });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({ error: `Server error: ${err.message}` });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Check if file is PDF
      if (req.file.mimetype !== 'application/pdf') {
        // Delete the uploaded file
        await fs.remove(req.file.path);
        return res.status(400).json({ error: 'Only PDF files are allowed' });
      }

      const resumePath = path.join(dataPath, 'resume.json');
      let resume = {};
      
      if (await fs.pathExists(resumePath)) {
        resume = await fs.readJson(resumePath);
      }

      // Delete old PDF file if exists
      if (resume.cvFile) {
        const oldFilePath = path.join(__dirname, '..', resume.cvFile);
        if (await fs.pathExists(oldFilePath)) {
          await fs.remove(oldFilePath);
        }
      }

      // Update resume with new PDF file path
      resume.cvFile = `/uploads/${req.file.filename}`;
      await fs.writeJson(resumePath, resume);

      res.json({ 
        message: 'Resume PDF uploaded successfully', 
        cvFile: resume.cvFile 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload resume PDF' });
    }
  });
});

// Delete resume PDF
router.delete('/resume/pdf', authenticateToken, async (req, res) => {
  try {
    const resumePath = path.join(dataPath, 'resume.json');
    
    if (!(await fs.pathExists(resumePath))) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    let resume = await fs.readJson(resumePath);

    if (!resume.cvFile) {
      return res.status(404).json({ error: 'No PDF file to delete' });
    }

    // Delete the PDF file
    const filePath = path.join(__dirname, '..', resume.cvFile);
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
    }

    // Update resume data
    resume.cvFile = null;
    await fs.writeJson(resumePath, resume);

    res.json({ message: 'Resume PDF deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete resume PDF' });
  }
});

// Contact Management
router.get('/contact', authenticateToken, async (req, res) => {
  try {
    const contactPath = path.join(dataPath, 'contacts.json');
    if (await fs.pathExists(contactPath)) {
      const contacts = await fs.readJson(contactPath);
      // Sort by date, newest first
      contacts.sort((a, b) => new Date(b.date) - new Date(a.date));
      res.json(contacts);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Mark contact as read/unread
router.put('/contact/:id/read', authenticateToken, async (req, res) => {
  try {
    const contactPath = path.join(dataPath, 'contacts.json');
    if (!(await fs.pathExists(contactPath))) {
      return res.status(404).json({ error: 'Contacts file not found' });
    }

    let contacts = await fs.readJson(contactPath);
    const index = contacts.findIndex((c) => c.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contacts[index].read = req.body.read !== undefined ? req.body.read : !contacts[index].read;
    await fs.writeJson(contactPath, contacts);

    res.json({ message: 'Contact updated', contact: contacts[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Dashboard stats
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    const contactPath = path.join(dataPath, 'contacts.json');

    let portfolioCount = 0;
    let contactCount = 0;
    let unreadContacts = 0;

    if (await fs.pathExists(portfolioPath)) {
      const portfolio = await fs.readJson(portfolioPath);
      portfolioCount = portfolio.length;
    }

    if (await fs.pathExists(contactPath)) {
      const contacts = await fs.readJson(contactPath);
      contactCount = contacts.length;
      unreadContacts = contacts.filter((c) => !c.read).length;
    }

    res.json({
      portfolioCount,
      contactCount,
      unreadContacts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Services Management
const servicesPath = path.join(dataPath, 'services.json');

router.get('/services', authenticateToken, async (req, res) => {
  try {
    if (await fs.pathExists(servicesPath)) {
      const services = await fs.readJson(servicesPath);
      res.json(services);
    } else {
      // Default services
      const defaultServices = [
        { id: 1, name: 'Graphic Design', slug: 'graphic-design', order: 1 },
        { id: 2, name: 'UI/UX Design', slug: 'ui-ux-design', order: 2 },
        { id: 3, name: 'Web Development', slug: 'web-development', order: 3 },
      ];
      await fs.writeJson(servicesPath, defaultServices);
      res.json(defaultServices);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

router.post('/services', authenticateToken, async (req, res) => {
  try {
    let services = [];
    if (await fs.pathExists(servicesPath)) {
      services = await fs.readJson(servicesPath);
    }
    
    const newService = {
      id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
      name: req.body.name,
      slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, '-'),
      order: req.body.order || services.length + 1,
    };
    
    services.push(newService);
    await fs.writeJson(servicesPath, services);
    res.json({ message: 'Service created', service: newService });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

router.put('/services/:id', authenticateToken, async (req, res) => {
  try {
    if (!(await fs.pathExists(servicesPath))) {
      return res.status(404).json({ error: 'Services not found' });
    }
    
    let services = await fs.readJson(servicesPath);
    const index = services.findIndex((s) => s.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    services[index] = {
      ...services[index],
      ...req.body,
      id: parseInt(req.params.id),
      slug: req.body.slug || services[index].slug,
    };
    
    await fs.writeJson(servicesPath, services);
    res.json({ message: 'Service updated', service: services[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

router.delete('/services/:id', authenticateToken, async (req, res) => {
  try {
    if (!(await fs.pathExists(servicesPath))) {
      return res.status(404).json({ error: 'Services not found' });
    }
    
    let services = await fs.readJson(servicesPath);
    services = services.filter((s) => s.id !== parseInt(req.params.id));
    await fs.writeJson(servicesPath, services);
    
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Categories Management
const categoriesPath = path.join(dataPath, 'categories.json');

router.get('/categories', authenticateToken, async (req, res) => {
  try {
    if (await fs.pathExists(categoriesPath)) {
      const categories = await fs.readJson(categoriesPath);
      res.json(categories);
    } else {
      // Default categories grouped by service
      const defaultCategories = [
        { id: 1, name: 'Logo Design', serviceId: 1, order: 1 },
        { id: 2, name: 'Brand Identity', serviceId: 1, order: 2 },
        { id: 3, name: 'Print Design', serviceId: 1, order: 3 },
        { id: 4, name: 'Illustration', serviceId: 1, order: 4 },
        { id: 5, name: 'Mobile App Design', serviceId: 2, order: 1 },
        { id: 6, name: 'Web App Design', serviceId: 2, order: 2 },
        { id: 7, name: 'Dashboard Design', serviceId: 2, order: 3 },
        { id: 8, name: 'Frontend Development', serviceId: 3, order: 1 },
        { id: 9, name: 'Backend Development', serviceId: 3, order: 2 },
        { id: 10, name: 'Full Stack', serviceId: 3, order: 3 },
      ];
      await fs.writeJson(categoriesPath, defaultCategories);
      res.json(defaultCategories);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/categories/service/:serviceId', authenticateToken, async (req, res) => {
  try {
    if (await fs.pathExists(categoriesPath)) {
      const categories = await fs.readJson(categoriesPath);
      const filtered = categories.filter((c) => c.serviceId === parseInt(req.params.serviceId));
      res.json(filtered);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.post('/categories', authenticateToken, async (req, res) => {
  try {
    let categories = [];
    if (await fs.pathExists(categoriesPath)) {
      categories = await fs.readJson(categoriesPath);
    }
    
    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      name: req.body.name,
      serviceId: parseInt(req.body.serviceId),
      order: req.body.order || categories.filter((c) => c.serviceId === parseInt(req.body.serviceId)).length + 1,
    };
    
    categories.push(newCategory);
    await fs.writeJson(categoriesPath, categories);
    res.json({ message: 'Category created', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

router.put('/categories/:id', authenticateToken, async (req, res) => {
  try {
    if (!(await fs.pathExists(categoriesPath))) {
      return res.status(404).json({ error: 'Categories not found' });
    }
    
    let categories = await fs.readJson(categoriesPath);
    const index = categories.findIndex((c) => c.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    categories[index] = {
      ...categories[index],
      ...req.body,
      id: parseInt(req.params.id),
      serviceId: req.body.serviceId ? parseInt(req.body.serviceId) : categories[index].serviceId,
    };
    
    await fs.writeJson(categoriesPath, categories);
    res.json({ message: 'Category updated', category: categories[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/categories/:id', authenticateToken, async (req, res) => {
  try {
    if (!(await fs.pathExists(categoriesPath))) {
      return res.status(404).json({ error: 'Categories not found' });
    }
    
    let categories = await fs.readJson(categoriesPath);
    categories = categories.filter((c) => c.id !== parseInt(req.params.id));
    await fs.writeJson(categoriesPath, categories);
    
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;

