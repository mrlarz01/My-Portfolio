# 🎨 Larz Design Portfolio Website

A modern, animated portfolio website inspired by InBio theme. Built with React.js, Node.js, and Express.

## 🚀 Features

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Portfolio Showcase**: Display your work with filtering and detailed project views
- **Resume Page**: Professional timeline-based resume with skills and certifications
- **Contact Form**: Easy-to-use contact form with backend integration
- **Admin Panel**: Complete content management system for portfolio and resume

## 📁 Project Structure

```
larz-design-portfolio/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express API server
├── admin-panel/       # React admin panel for content management
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- React.js 18+
- React Router
- Framer Motion (animations)
- SCSS/CSS3
- Axios

### Backend
- Node.js
- Express.js
- JSON file storage (can be replaced with MongoDB)
- JWT authentication
- Multer (file uploads)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "my code"
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Install Admin Panel Dependencies**
   ```bash
   cd ../admin-panel
   npm install
   ```

5. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   JWT_SECRET=your-secret-key-change-in-production
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Application**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

3. **Start the Admin Panel** (Optional)
   ```bash
   cd admin-panel
   npm start
   ```
   Admin panel will run on `http://localhost:3001`

## 📖 Usage

### Frontend
- Navigate to `http://localhost:3000` to view the portfolio website
- Browse through Home, Portfolio, Resume, and Contact pages

### Admin Panel
- Navigate to `http://localhost:3001` and login with:
  - Username: `admin`
  - Password: `admin123`
- Manage portfolio items, resume data, and view contact submissions

## 🎨 Design System

### Colors
- Primary: #6C5CE7 (Deep Purple)
- Secondary: #00D2D3 (Teal)
- Accent: #FF6B6B (Coral)
- Dark: #1A1A2E
- Light: #F8F9FA

### Typography
- Headings: Poppins (Bold 700, SemiBold 600)
- Body: Inter (Regular 400, Medium 500)

## 📝 API Endpoints

### Public Endpoints
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single portfolio item
- `GET /api/resume` - Get resume data
- `GET /api/testimonials` - Get testimonials
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/portfolio` - Get all portfolio items
- `POST /api/admin/portfolio` - Create portfolio item
- `PUT /api/admin/portfolio/:id` - Update portfolio item
- `DELETE /api/admin/portfolio/:id` - Delete portfolio item
- `GET /api/admin/resume` - Get resume data
- `PUT /api/admin/resume` - Update resume data
- `GET /api/admin/contact` - Get contact submissions

## 🔧 Customization

1. **Update Brand Name**: Search and replace "Larz Design" throughout the codebase
2. **Change Colors**: Update the color variables in `frontend/src/styles/variables.scss`
3. **Modify Content**: Use the admin panel or edit JSON files in `backend/data/`
4. **Add Images**: Place images in appropriate directories and update references

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Admin Panel
```bash
cd admin-panel
npm run build
```

## 🤝 Contributing

This is a portfolio template. Feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Design inspired by InBio WordPress theme
- Icons from React Icons
- Animations powered by Framer Motion

---

Built with ❤️ using React, Node.js, and Express

