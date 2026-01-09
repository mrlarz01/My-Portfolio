# Troubleshooting PDF Upload Issue

## Issue Fixed

The "Failed to upload PDF" error has been resolved with the following improvements:

### Changes Made

1. **Enhanced Error Handling in Backend** (`backend/routes/admin.js`)
   - Added proper Multer error handling
   - Better error messages for file size limits
   - Improved error logging

2. **Improved CORS Configuration** (`backend/server.js`)
   - Explicit CORS origins for all ports
   - Added credentials support
   - Added global error handler

3. **Better Error Logging in Admin Panel** (`admin-panel/src/pages/ResumeManagement.jsx`)
   - Added detailed console logging
   - Extended error message display time
   - Better error message extraction

## How to Test the Fix

### 1. Start Backend Server
```bash
cd backend
npm start
```

You should see:
```
Server is running on port 5000
CORS enabled for: http://localhost:3000, http://localhost:4000, http://localhost:3001
```

### 2. Start Admin Panel
```bash
cd admin-panel
npm start
```

Admin panel runs on port 4000.

### 3. Test Upload
1. Login to admin panel (http://localhost:4000)
2. Go to Resume → Resume PDF tab
3. Click "Choose PDF File"
4. Select a PDF file
5. Check browser console for detailed logs

## Common Issues & Solutions

### Issue: "Failed to upload PDF"
**Possible Causes:**
- Backend server not running
- Wrong port configuration
- File too large (>10MB)
- Not a PDF file

**Solution:**
1. Ensure backend is running on port 5000
2. Check browser console for detailed error
3. Verify file is PDF and under 10MB
4. Check backend terminal for error logs

### Issue: "No file uploaded"
**Cause:** File input not properly configured

**Solution:**
- Ensure file input has `accept=".pdf"` attribute
- Check FormData is properly created
- Verify field name is 'pdf'

### Issue: CORS Error
**Cause:** CORS not configured for admin panel port

**Solution:**
- Backend now includes port 4000 in CORS origins
- Restart backend server after changes

### Issue: 401 Unauthorized
**Cause:** Token expired or invalid

**Solution:**
- Logout and login again
- Check localStorage for 'adminToken'

## Debugging Steps

### 1. Check Backend Logs
Look for these in backend terminal:
```
Upload error: [error details]
```

### 2. Check Browser Console
Look for these in browser console:
```
Uploading PDF: filename.pdf Size: 12345
Upload error details: [error object]
Error response: [server response]
Error status: [HTTP status code]
```

### 3. Test Backend Directly
Use curl or Postman:
```bash
curl -X POST http://localhost:5000/api/admin/resume/upload-pdf \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "pdf=@/path/to/resume.pdf"
```

### 4. Check File Permissions
Ensure `backend/uploads/` directory exists and is writable:
```bash
cd backend
ls -la uploads/
```

## Error Messages Explained

| Error Message | Meaning | Solution |
|--------------|---------|----------|
| "No file uploaded" | File not received by server | Check FormData and field name |
| "Only PDF files are allowed" | Wrong file type | Select a PDF file |
| "File size exceeds 10MB limit" | File too large | Compress or use smaller file |
| "Access token required" | Not authenticated | Login again |
| "Failed to upload resume PDF" | Server error | Check backend logs |

## Verification

After the fix, you should see:
1. Detailed error messages in browser console
2. Better error messages in UI
3. Proper file size limit errors
4. Successful uploads with confirmation

## Next Steps

If issue persists:
1. Check backend terminal for errors
2. Check browser console for detailed logs
3. Verify backend is running on port 5000
4. Verify admin panel proxy is working
5. Try uploading a small test PDF (< 1MB)
