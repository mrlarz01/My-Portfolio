# Email Notification Setup Checklist

## ✅ Pre-Setup Checklist

- [ ] Gmail account ready (or other email service)
- [ ] Backend server accessible
- [ ] Text editor open

---

## 📝 Setup Steps

### 1. Gmail App Password (2 minutes)

- [ ] Go to https://myaccount.google.com/apppasswords
- [ ] Enable 2FA if prompted
- [ ] Select **Mail** → **Other (Custom name)**
- [ ] Enter name: **Portfolio Website**
- [ ] Click **Generate**
- [ ] Copy 16-character password
- [ ] Save password temporarily (you'll need it next)

### 2. Configure Backend (1 minute)

- [ ] Open `backend/.env` in text editor
- [ ] Update `EMAIL_SERVICE=gmail`
- [ ] Update `EMAIL_USER=your-gmail@gmail.com`
- [ ] Update `EMAIL_PASSWORD=your-app-password` (remove spaces)
- [ ] Verify `ADMIN_EMAIL=bakrinola80@gmail.com`
- [ ] Save file

### 3. Test Email (1 minute)

- [ ] Open terminal
- [ ] Run: `cd backend`
- [ ] Run: `node test-email.js`
- [ ] Look for: ✅ SUCCESS message
- [ ] Check bakrinola80@gmail.com inbox
- [ ] Check spam folder if not in inbox

### 4. Start Backend (30 seconds)

- [ ] Run: `npm start`
- [ ] Look for: "Server is running on port 5000"
- [ ] No error messages in console

### 5. Test Contact Form (1 minute)

- [ ] Start frontend: `cd frontend` → `npm start`
- [ ] Open website in browser
- [ ] Go to Contact page
- [ ] Fill out form with test data
- [ ] Submit form
- [ ] Check for success message
- [ ] Check bakrinola80@gmail.com for notification

---

## ✅ Verification Checklist

- [ ] Test email received at bakrinola80@gmail.com
- [ ] Email contains all form details
- [ ] Email looks professional (HTML formatted)
- [ ] Reply button works
- [ ] Contact form submission succeeds
- [ ] Message appears in admin panel
- [ ] No errors in backend console

---

## 🐛 Troubleshooting Checklist

If email not working:

- [ ] All EMAIL_* variables set in .env?
- [ ] Using App Password (not regular password)?
- [ ] Removed spaces from App Password?
- [ ] 2FA enabled on Gmail?
- [ ] Backend server restarted after .env changes?
- [ ] Checked backend console for errors?
- [ ] Checked spam folder?
- [ ] Internet connection working?

---

## 📋 Configuration Template

Copy this to your `backend/.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=bakrinola80@gmail.com
```

**Replace:**
- `your-gmail@gmail.com` → Your Gmail address
- `your-16-char-app-password` → Your App Password (no spaces)

---

## 🎯 Success Criteria

You're done when:

✅ Test script shows: "Email notification sent successfully"  
✅ Email received at bakrinola80@gmail.com  
✅ Contact form works on website  
✅ Notifications arrive for real submissions  
✅ No errors in backend console

---

## 📚 Need Help?

- **Quick Setup:** See `EMAIL_QUICK_START.md`
- **Detailed Guide:** See `EMAIL_NOTIFICATION_SETUP.md`
- **Overview:** See `EMAIL_FEATURE_SUMMARY.md`

---

## ⏱️ Total Time: ~5 minutes

**Status:** [ ] Not Started | [ ] In Progress | [ ] Complete

---

**Last Updated:** January 9, 2026
