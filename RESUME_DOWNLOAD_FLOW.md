# Resume Download Feature - Flow Diagram

## Upload Flow (Admin)

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN PANEL                              │
│                                                              │
│  1. Admin clicks "Resume PDF" tab                           │
│  2. Admin clicks "Choose PDF File"                          │
│  3. Admin selects PDF file                                  │
│                                                              │
│  ┌──────────────────────────────────────┐                  │
│  │  Client-side Validation               │                  │
│  │  - Check file type (PDF only)         │                  │
│  │  - Check file size (max 10MB)         │                  │
│  └──────────────────────────────────────┘                  │
│                    │                                         │
│                    ▼                                         │
│  ┌──────────────────────────────────────┐                  │
│  │  Upload to Backend                    │                  │
│  │  POST /api/admin/resume/upload-pdf    │                  │
│  │  Authorization: Bearer <token>        │                  │
│  └──────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND                                 │
│                                                              │
│  1. Authenticate admin token                                │
│  2. Validate file type (PDF)                                │
│  3. Check file size (10MB limit)                            │
│  4. Delete old PDF if exists                                │
│  5. Save new PDF to uploads/                                │
│  6. Update resume.json with cvFile path                     │
│  7. Return success response                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN PANEL                              │
│                                                              │
│  1. Show success message                                    │
│  2. Display PDF info with preview link                      │
│  3. Show "Remove PDF" button                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Download Flow (Visitor)

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                                │
│                                                              │
│  1. User visits Resume page                                 │
│  2. Page fetches resume data                                │
│     GET /api/resume                                         │
│                                                              │
│  ┌──────────────────────────────────────┐                  │
│  │  Check if cvFile exists              │                  │
│  │  - If yes: Show download button       │                  │
│  │  - If no: Hide download section       │                  │
│  └──────────────────────────────────────┘                  │
│                    │                                         │
│                    ▼                                         │
│  3. User clicks "Download CV" button                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND                                 │
│                                                              │
│  1. Receive download request                                │
│     GET /api/resume/download                                │
│  2. Read resume.json                                        │
│  3. Check if cvFile exists                                  │
│  4. Verify file exists on disk                              │
│  5. Send PDF file to browser                                │
│     Content-Disposition: attachment                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER                                 │
│                                                              │
│  1. Receive PDF file                                        │
│  2. Trigger download dialog                                 │
│  3. Save as "resume.pdf"                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Structure

```json
{
  "summary": "...",
  "education": [...],
  "experience": [...],
  "skills": [...],
  "software": [...],
  "certifications": [...],
  "cvFile": "/uploads/pdf-1234567890-123456789.pdf"
}
```

## File Storage

```
backend/
  └── uploads/
      └── pdf-1234567890-123456789.pdf
```

## API Endpoints

### Public
- `GET /api/resume` - Get resume data (includes cvFile)
- `GET /api/resume/download` - Download PDF file

### Admin (Authenticated)
- `POST /api/admin/resume/upload-pdf` - Upload PDF
- `DELETE /api/admin/resume/pdf` - Delete PDF
