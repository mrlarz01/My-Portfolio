# My Portfolio

A full-stack portfolio website with an admin panel for managing content dynamically.

## Features

- **Frontend**: Modern React-based portfolio showcasing projects, resume, services, and contact information
- **Backend**: Node.js/Express API for managing portfolio data
- **Admin Panel**: Secure admin interface for content management
- **Email Notifications**: Contact form with email integration
- **Resume Download**: Downloadable CV/resume functionality
- **Portfolio Management**: Dynamic project showcase with categories and filtering
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- React
- React Router
- Sass/SCSS
- Axios

### Backend
- Node.js
- Express
- Nodemailer (email service)
- Multer (file uploads)

### Admin Panel
- React
- React Router
- Sass/SCSS

## Project Structure

```
portfolio/
├── frontend/          # Main portfolio website
├── backend/           # API server
├── admin-panel/       # Admin dashboard
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/mrlarz01/My-Portfolio.git
cd My-Portfolio
```

2. **Install dependencies for all projects**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin Panel
cd ../admin-panel
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

4. **Start the applications**

```bash
# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm start

# Start admin panel (from admin-panel directory)
npm start
```

## Usage

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:4000

## Features Overview

### Portfolio Management
- Add, edit, and delete projects
- Upload project images
- Categorize projects
- Featured project highlighting

### Resume Management
- Update work experience
- Add education details
- Manage skills and certifications
- Upload downloadable CV

### Contact Management
- View contact form submissions
- Email notifications for new messages
- Manage contact information

### Services Management
- Add and edit service offerings
- Update service descriptions

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Contact

For any inquiries, please reach out through the contact form on the website.
