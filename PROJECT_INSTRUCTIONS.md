# 🎨 Larz Design Portfolio Website - Project Instructions

## Project Overview
A modern, animated portfolio website inspired by InBio theme, built with React.js, Node.js, and Express. The website showcases the work and skills of Larz Design.

## Technology Stack

### Frontend
- **React.js** (v18+) - UI framework
- **React Router** - Navigation and routing
- **CSS3 / SCSS** - Styling and animations
- **Framer Motion** - Smooth animations
- **Axios** - API communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB / JSON File Storage** - Data persistence
- **JWT** - Authentication for admin panel
- **Multer** - File upload handling (for portfolio images)

## Project Structure

```
larz-design-portfolio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   ├── Home/
│   │   │   ├── Portfolio/
│   │   │   ├── Resume/
│   │   │   └── Contact/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── PortfolioPage.jsx
│   │   │   ├── ResumePage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── styles/
│   │   │   ├── variables.scss
│   │   │   ├── mixins.scss
│   │   │   └── animations.scss
│   │   ├── utils/
│   │   ├── context/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
├── backend/
│   ├── routes/
│   │   ├── api/
│   │   └── admin/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── admin-panel/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Design System - Larz Design

### Color Palette
- **Primary**: Deep Purple (#6C5CE7)
- **Accent**: Coral (#FF6B6B)
- **Dark**: #1A1A2E
- **Light**: #F8F9FA
- **Text Primary**: #2D3436
- **Text Secondary**: #636E72

### Typography
- **Heading Font**: 'Poppins', sans-serif (Bold 700, SemiBold 600)
- **Body Font**: 'Inter', sans-serif (Regular 400, Medium 500)
- **Font Sizes**:
  - H1: 3.5rem (56px)
  - H2: 2.5rem (40px)
  - H3: 2rem (32px)
  - Body: 1rem (16px)

### Spacing Scale
- 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px

### Animation Guidelines
- **Page Transitions**: Fade + Slide (0.3s ease-out)
- **Hover Effects**: Scale 1.05, shadow increase
- **Button Animations**: Ripple effect, gradient shift
- **Scroll Animations**: Fade in up (staggered delays)

## Pages & Features

### 1. Home Page (`/`)
- **Hero Section**: Large profile image, name, title, tagline, CTA buttons
- **About Preview**: Short introduction with skill badges
- **Featured Projects**: 3-6 selected portfolio items
- **Services**: What I Do cards (UI/UX, Branding, Web Design)
- **Testimonials**: Client testimonials slider (optional)
- **CTA Section**: Contact call-to-action
- **Footer**: Social links, email, copyright

### 2. Portfolio Page (`/portfolio`)
- **Filter Tabs**: All, UI/UX, Web Design, Branding, Graphics
- **Portfolio Grid**: Responsive masonry/grid layout
- **Project Cards**: Thumbnail, title, category, hover effect
- **Project Detail Modal/Page**: 
  - Large hero image
  - Title, category, tools used
  - Overview
  - Process (wireframes, UI screens)
  - Final designs gallery
  - Next/Previous navigation

### 3. Resume Page (`/resume`)
- **Professional Summary**: 2-3 line introduction
- **Education Timeline**: Vertical timeline with dates, degrees, schools
- **Experience Timeline**: Work history with dates, titles, companies
- **Skills Section**: Progress bars or visual indicators
- **Software Skills**: Icons for Figma, Photoshop, Illustrator, etc.
- **Certifications**: Certificate cards
- **Download CV Button**: PDF download

### 4. Contact Page (`/contact`)
- **Contact Form**: Name, Email, Subject, Message fields
- **Direct Contact Info**: Email, Phone, Location
- **Social Links**: Behance, Dribbble, Instagram, LinkedIn
- **Map Integration**: Optional Google Maps embed
- **Footer**: Consistent footer

## Backend API Endpoints

### Public Endpoints
```
GET    /api/portfolio          - Get all portfolio items
GET    /api/portfolio/:id      - Get single portfolio item
GET    /api/resume             - Get resume data
GET    /api/testimonials       - Get testimonials
POST   /api/contact            - Submit contact form
```

### Admin Endpoints (Protected)
```
POST   /api/admin/login        - Admin login
POST   /api/admin/logout       - Admin logout

GET    /api/admin/portfolio    - Get all portfolio items (admin)
POST   /api/admin/portfolio    - Create portfolio item
PUT    /api/admin/portfolio/:id - Update portfolio item
DELETE /api/admin/portfolio/:id - Delete portfolio item

GET    /api/admin/resume       - Get resume data (admin)
PUT    /api/admin/resume       - Update resume data

GET    /api/admin/contact      - Get contact form submissions
```

## Admin Panel Features

1. **Dashboard**: Overview statistics
2. **Portfolio Management**: 
   - Add/Edit/Delete projects
   - Upload images
   - Set featured projects
   - Categorize projects
3. **Resume Management**: 
   - Edit education, experience, skills
   - Upload CV PDF
4. **Contact Management**: View and manage contact submissions
5. **Settings**: Update personal info, social links, site settings

## Development Workflow

### Initial Setup
1. Initialize React app: `npx create-react-app frontend`
2. Initialize Node.js backend: `mkdir backend && npm init -y`
3. Install dependencies
4. Set up environment variables
5. Configure database/storage

### Development
1. Start backend: `npm run dev` (port 5000)
2. Start frontend: `npm start` (port 3000)
3. Start admin panel: `npm start` (port 4000)

### Build & Deploy
1. Build React app: `npm run build`
2. Deploy backend to hosting service
3. Configure environment variables
4. Set up database

## Key Animations to Implement

1. **Page Load**: Smooth fade-in
2. **Hero Section**: Text animation, image reveal
3. **Scroll Animations**: Elements fade in as they enter viewport
4. **Hover Effects**: Card lift, color transitions
5. **Button Interactions**: Ripple, gradient animations
6. **Navigation**: Smooth scroll, active state transitions
7. **Modal/Detail Views**: Slide up with backdrop blur

## Performance Considerations

- Lazy load images
- Code splitting for routes
- Optimize animations (use transform/opacity)
- Minify CSS/JS
- Image optimization (WebP format)
- Caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

1. Set up project structure
2. Install dependencies
3. Create design system foundation
4. Build components progressively
5. Implement backend API
6. Connect frontend to backend
7. Build admin panel
8. Add animations
9. Test and optimize
10. Deploy

