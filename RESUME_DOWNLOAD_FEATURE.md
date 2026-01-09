# Resume Download Feature

## Overview
The resume download feature allows administrators to upload a PDF version of their resume, which visitors can then download from the website.

## Features

### Admin Panel
- Upload PDF resume file (max 10MB)
- Preview uploaded PDF
- Delete/replace existing PDF
- Visual feedback for upload status

### Frontend
- Download button appears only when PDF is available
- Direct download functionality
- Smooth animations and user experience

## How to Use

### For Administrators

1. **Login to Admin Panel**
   - Navigate to `http://localhost:3001`
   - Login with your credentials

2. **Upload Resume PDF**
   - Go to "Resume" section in the sidebar
   - Click on "Resume PDF" tab
   - Click "Choose PDF File" button
   - Select your PDF file (max 10MB)
   - Wait for upload confirmation

3. **Manage PDF**
   - Preview the uploaded PDF by clicking "Preview PDF"
   - Remove PDF by clicking "Remove PDF" button
   - Upload a new PDF to replace the existing one

### For Visitors

1. **View Resume Page**
   - Navigate to the Resume page on the website
   - Scroll to the bottom of the page

2. **Download Resume**
   - Click the "Download CV" button
   - The PDF will be downloaded to your device

## API Endpoints

### Public Endpoints

#### Get Resume Data
```
GET /api/resume
```
Returns resume data including the `cvFile` path if available.

#### Download Resume PDF
```
GET /api/resume/download
```
Downloads the resume PDF file.

### Admin Endpoints (Requires Authentication)

#### Upload Resume PDF
```
POST /api/admin/resume/upload-pdf
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- pdf: PDF file
```

#### Delete Resume PDF
```
DELETE /api/admin/resume/pdf
Authorization: Bearer <token>
```

## File Storage

- PDF files are stored in `backend/uploads/` directory
- Files are named with timestamp and random suffix for uniqueness
- Old PDF files are automatically deleted when a new one is uploaded

## Technical Details

### Backend
- Uses `multer` for file upload handling
- File size limit: 10MB
- Only PDF files are accepted
- Automatic cleanup of old files

### Frontend
- React component with file upload UI
- Real-time upload progress feedback
- PDF preview functionality
- Responsive design

### Admin Panel
- Integrated into Resume Management section
- New "Resume PDF" tab
- Upload/delete functionality
- Visual status indicators

## Security Considerations

- Only authenticated admins can upload/delete PDFs
- File type validation (PDF only)
- File size limits enforced
- Secure file storage in uploads directory

## Future Enhancements

- Multiple resume versions (different languages)
- Resume analytics (download tracking)
- Automatic PDF generation from resume data
- Cloud storage integration (AWS S3, etc.)
