const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const { sendContactNotification } = require('../services/emailService');

const dataPath = path.join(__dirname, '../data');

// Ensure data directory exists
fs.ensureDirSync(dataPath);

// Get all portfolio items
router.get('/portfolio', async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    if (await fs.pathExists(portfolioPath)) {
      const portfolio = await fs.readJson(portfolioPath);
      res.json(portfolio);
    } else {
      // Default portfolio data
      const defaultPortfolio = [
        {
          id: 1,
          title: 'NFT Dashboard Application',
          category: 'UI/UX Design',
          tags: ['UI/UX', 'Dashboard', 'Web App'],
          image: 'portfolio-1',
          description: 'Modern dashboard design for NFT marketplace',
          fullDescription: 'A comprehensive NFT marketplace dashboard with real-time analytics and user management.',
          tools: ['Figma', 'Adobe XD', 'React'],
          featured: true,
        },
      ];
      await fs.writeJson(portfolioPath, defaultPortfolio);
      res.json(defaultPortfolio);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Get single portfolio item
router.get('/portfolio/:id', async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    if (await fs.pathExists(portfolioPath)) {
      const portfolio = await fs.readJson(portfolioPath);
      const item = portfolio.find((p) => p.id === parseInt(req.params.id));
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Portfolio item not found' });
      }
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio item' });
  }
});

// Get resume data
router.get('/resume', async (req, res) => {
  try {
    const resumePath = path.join(dataPath, 'resume.json');
    if (await fs.pathExists(resumePath)) {
      const resume = await fs.readJson(resumePath);
      res.json(resume);
    } else {
      // Default resume data
      const defaultResume = {
        summary: 'Creative UI/UX designer with over 5 years of experience...',
        education: [],
        experience: [],
        skills: [],
        certifications: [],
        cvFile: null,
      };
      await fs.writeJson(resumePath, defaultResume);
      res.json(defaultResume);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Download resume PDF
router.get('/resume/download', async (req, res) => {
  try {
    const resumePath = path.join(dataPath, 'resume.json');
    
    if (!(await fs.pathExists(resumePath))) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const resume = await fs.readJson(resumePath);

    if (!resume.cvFile) {
      return res.status(404).json({ error: 'No resume PDF available' });
    }

    const filePath = path.join(__dirname, '..', resume.cvFile);
    
    if (!(await fs.pathExists(filePath))) {
      return res.status(404).json({ error: 'Resume file not found' });
    }

    // Set headers for download
    res.download(filePath, 'resume.pdf', (err) => {
      if (err) {
        console.error('Download error:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download resume' });
        }
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download resume' });
  }
});

// Get testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonialsPath = path.join(dataPath, 'testimonials.json');
    if (await fs.pathExists(testimonialsPath)) {
      const testimonials = await fs.readJson(testimonialsPath);
      res.json(testimonials);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Get all services
router.get('/services', async (req, res) => {
  try {
    const servicesPath = path.join(dataPath, 'services.json');
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

// Get service by slug
router.get('/services/:slug', async (req, res) => {
  try {
    const servicesPath = path.join(dataPath, 'services.json');
    if (await fs.pathExists(servicesPath)) {
      const services = await fs.readJson(servicesPath);
      const service = services.find((s) => s.slug === req.params.slug);
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categoriesPath = path.join(dataPath, 'categories.json');
    if (await fs.pathExists(categoriesPath)) {
      const categories = await fs.readJson(categoriesPath);
      res.json(categories);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get categories by service ID
router.get('/categories/service/:serviceId', async (req, res) => {
  try {
    const categoriesPath = path.join(dataPath, 'categories.json');
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

// Get portfolio by service
router.get('/portfolio/service/:serviceId', async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    if (await fs.pathExists(portfolioPath)) {
      const portfolio = await fs.readJson(portfolioPath);
      const filtered = portfolio.filter((p) => p.serviceId === parseInt(req.params.serviceId));
      res.json(filtered);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Get portfolio by service and category
router.get('/portfolio/service/:serviceId/category/:categoryId', async (req, res) => {
  try {
    const portfolioPath = path.join(dataPath, 'portfolio.json');
    if (await fs.pathExists(portfolioPath)) {
      const portfolio = await fs.readJson(portfolioPath);
      const filtered = portfolio.filter(
        (p) => p.serviceId === parseInt(req.params.serviceId) && p.categoryId === parseInt(req.params.categoryId)
      );
      res.json(filtered);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contactPath = path.join(dataPath, 'contacts.json');
    let contacts = [];
    
    if (await fs.pathExists(contactPath)) {
      contacts = await fs.readJson(contactPath);
    }

    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone: phone || '',
      subject,
      message,
      date: new Date().toISOString(),
      read: false,
    };

    contacts.push(newContact);
    await fs.writeJson(contactPath, contacts);

    // Send email notification to admin (non-blocking)
    sendContactNotification(newContact).catch((error) => {
      console.error('Email notification failed:', error);
      // Log the error but don't fail the request
    });

    res.json({ message: 'Contact form submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

module.exports = router;

