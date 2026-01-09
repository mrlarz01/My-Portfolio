# 🚀 Setup Guide - Larz Design Portfolio

This guide will help you set up and run the Larz Design Portfolio website on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)

## 🔧 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd "my code"
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```
This will install all React dependencies including:
- React & React DOM
- React Router
- Framer Motion
- Axios
- React Icons
- SCSS support

### Step 3: Install Backend Dependencies
```bash
cd ../backend
npm install
```
This will install:
- Express.js
- CORS
- JWT (authentication)
- Multer (file uploads)
- and other backend dependencies

### Step 4: Install Admin Panel Dependencies
```bash
cd ../admin-panel
npm install
```

### Step 5: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd ../backend
```

Create `.env` file with the following content:
```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production-use-strong-random-string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

**Important**: Change the `JWT_SECRET` to a strong random string in production!

### Step 6: Create Data Directory

The backend will automatically create the `data` directory when you first run it. However, you can create it manually:

```bash
mkdir -p backend/data
mkdir -p backend/uploads
```

## 🚀 Running the Application

You'll need **three terminal windows** to run all components simultaneously.

### Terminal 1: Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

### Terminal 2: Frontend Application
```bash
cd frontend
npm start
```
The frontend will start on `http://localhost:3000`
It will automatically open in your browser.

### Terminal 3: Admin Panel (Optional)
```bash
cd admin-panel
npm start
```
The admin panel will start on `http://localhost:3001`

## 🎯 Accessing the Application

1. **Frontend (Portfolio Website)**: 
   - Open your browser and go to `http://localhost:3000`
   - You'll see the beautiful portfolio homepage

2. **Admin Panel**: 
   - Go to `http://localhost:3001`
   - Login with:
     - Username: `admin`
     - Password: `admin123`
   - Manage your portfolio content from here

3. **Backend API**: 
   - API endpoints are available at `http://localhost:5000/api`
   - Health check: `http://localhost:5000/health`

## 📁 Project Structure Overview

```
larz-design-portfolio/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Main pages (Home, Portfolio, Resume, Contact)
│   │   ├── styles/       # SCSS styles and design system
│   │   └── App.jsx       # Main app component
│   └── package.json
│
├── backend/              # Node.js/Express API
│   ├── routes/          # API routes
│   ├── data/            # JSON data storage (auto-created)
│   ├── uploads/         # Uploaded files (auto-created)
│   └── server.js        # Main server file
│
├── admin-panel/         # React admin interface
│   ├── src/
│   │   ├── pages/       # Admin pages
│   │   └── components/  # Admin components
│   └── package.json
│
└── README.md
```

## 🎨 Customization

### Changing Brand Name
1. Search for "Larz Design" in all files
2. Replace with your brand name
3. Update logo text in components

### Changing Colors
1. Open `frontend/src/styles/variables.scss`
2. Modify the color variables:
   ```scss
   $primary: #6C5CE7;      // Your primary color
   $secondary: #00D2D3;    // Your secondary color
   $accent: #FF6B6B;       // Your accent color
   ```

### Adding Your Content
1. Use the Admin Panel to add portfolio items
2. Or manually edit JSON files in `backend/data/`:
   - `portfolio.json` - Portfolio items
   - `resume.json` - Resume data
   - `testimonials.json` - Testimonials
   - `contacts.json` - Contact submissions

## 🐛 Troubleshooting

### Port Already in Use
If port 3000, 3001, or 5000 is already in use:

**Frontend:**
- Change port: `PORT=3002 npm start` in frontend directory

**Backend:**
- Update `PORT` in `backend/.env` file

**Admin Panel:**
- Change port: `PORT=3003 npm start` in admin-panel directory

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Make sure backend is running on port 5000
- Check that frontend proxy is set correctly in `frontend/package.json`

### Authentication Errors
- Verify `.env` file exists in backend directory
- Check that JWT_SECRET is set
- Clear browser localStorage if needed

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
The build folder will contain optimized production files.

### Admin Panel
```bash
cd admin-panel
npm run build
```

### Backend
For production, use:
- Process manager (PM2)
- Environment variables
- Proper database (instead of JSON files)
- HTTPS/SSL certificates

## 🔒 Security Notes

**Before deploying to production:**

1. Change all default passwords
2. Use strong JWT_SECRET
3. Enable HTTPS
4. Use a proper database (MongoDB, PostgreSQL, etc.)
5. Implement rate limiting
6. Add input validation and sanitization
7. Set up proper CORS policies
8. Use environment variables for all secrets

## 📚 Next Steps

1. **Add Real Images**: Replace placeholder images with your actual portfolio images
2. **Connect to Database**: Replace JSON storage with MongoDB or PostgreSQL
3. **Add Email Service**: Configure email notifications for contact form
4. **Deploy**: Deploy to hosting services like Vercel, Netlify, or Heroku
5. **SEO Optimization**: Add meta tags, Open Graph, and SEO optimization
6. **Analytics**: Add Google Analytics or similar tracking

## 💡 Tips

- Use the admin panel to manage content easily
- Keep the design system consistent
- Test on different devices and browsers
- Optimize images before uploading
- Regular backups of your data

## 🆘 Need Help?

- Check the README.md for more information
- Review the PROJECT_INSTRUCTIONS.md for detailed documentation
- Check browser console for errors
- Verify all services are running

---

Happy coding! 🎉

