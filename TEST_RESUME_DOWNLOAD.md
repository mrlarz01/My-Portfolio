# Testing Resume Download Feature

## Quick Test Steps

### 1. Start the Backend Server
```bash
cd backend
npm start
```

### 2. Start the Admin Panel
```bash
cd admin-panel
npm start
```

### 3. Start the Frontend
```bash
cd frontend
npm start
```

### 4. Upload Resume PDF (Admin)
1. Go to http://localhost:3001
2. Login (default: admin/admin123)
3. Click "Resume" in sidebar
4. Click "Resume PDF" tab
5. Click "Choose PDF File"
6. Select a PDF file (max 10MB)
7. Wait for success message

### 5. Test Download (Frontend)
1. Go to http://localhost:3000/resume
2. Scroll to bottom
3. Click "Download CV" button
4. PDF should download

## Expected Results
- Admin can upload PDF successfully
- PDF preview link works
- Frontend shows download button only when PDF exists
- Download triggers PDF file download
- Admin can delete PDF
