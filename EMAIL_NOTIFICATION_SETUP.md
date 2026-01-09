# Email Notification Setup Guide

## Overview
Your portfolio website now sends automatic email notifications to **bakrinola80@gmail.com** whenever someone submits a contact form.

## Features Implemented
✅ Instant email notifications when new messages are submitted
✅ Beautiful HTML email template with all message details
✅ Sender information (name, email, phone)
✅ Message content and timestamp
✅ Quick reply button in email
✅ Graceful error handling (won't break contact form if email fails)
✅ Secure credential management via environment variables
✅ Messages still saved to database for admin panel review

---

## Setup Instructions

### Option 1: Gmail (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Under "Signing in to Google", enable **2-Step Verification**
4. Follow the setup process

#### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select app: **Mail**
3. Select device: **Other (Custom name)**
4. Enter name: **Portfolio Website**
5. Click **Generate**
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

#### Step 3: Configure Environment Variables
Open `backend/.env` and update:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=bakrinola80@gmail.com
```

**Important:** 
- Use the App Password (16 characters), NOT your regular Gmail password
- Remove spaces from the App Password when pasting

---

### Option 2: Outlook/Hotmail

#### Step 1: Enable App Password
1. Go to: https://account.microsoft.com/security
2. Click **Advanced security options**
3. Under **App passwords**, click **Create a new app password**
4. Copy the generated password

#### Step 2: Configure Environment Variables
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=bakrinola80@gmail.com
```

---

### Option 3: Other Email Services

Nodemailer supports many email services. Update `.env`:

```env
# For Yahoo
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=bakrinola80@gmail.com

# For iCloud
EMAIL_SERVICE=iCloud
EMAIL_USER=your-email@icloud.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=bakrinola80@gmail.com
```

---

## Testing the Email Feature

### Step 1: Configure Your Email
1. Update `backend/.env` with your email credentials
2. Restart the backend server:
   ```bash
   cd backend
   npm start
   ```

### Step 2: Test the Contact Form
1. Start your frontend:
   ```bash
   cd frontend
   npm start
   ```
2. Go to the Contact page
3. Fill out and submit the form
4. Check **bakrinola80@gmail.com** for the notification email

### Step 3: Verify
- ✅ Email received at bakrinola80@gmail.com
- ✅ Email contains all form details
- ✅ Message saved in admin panel
- ✅ No errors in backend console

---

## Email Template Features

The notification email includes:
- 📧 **Professional design** with gradient header
- 👤 **Sender details**: Name, email, phone
- 📝 **Message content**: Full message text
- 🕐 **Timestamp**: Date and time submitted
- 🔵 **Reply button**: Quick link to reply via email
- 📱 **Mobile responsive**: Looks great on all devices

---

## Troubleshooting

### Email Not Sending

**Check 1: Environment Variables**
```bash
# In backend folder
cat .env
```
Verify all EMAIL_* variables are set correctly.

**Check 2: App Password**
- Make sure you're using an App Password, not your regular password
- Remove any spaces from the App Password
- Regenerate the App Password if needed

**Check 3: Backend Logs**
Look for error messages in the backend console:
```
Email notification sent successfully: <message-id>
```
or
```
Failed to send email notification: <error>
```

**Check 4: Gmail Security**
- Ensure 2FA is enabled
- Check if Google blocked the sign-in attempt
- Visit: https://myaccount.google.com/notifications

### Common Errors

**Error: "Invalid login"**
- Solution: Use App Password, not regular password
- Regenerate App Password

**Error: "Username and Password not accepted"**
- Solution: Enable 2FA first, then generate App Password

**Error: "Connection timeout"**
- Solution: Check your internet connection
- Try a different email service

**Error: "Email service not configured"**
- Solution: Make sure all EMAIL_* variables are set in .env
- Restart the backend server after updating .env

---

## Security Best Practices

✅ **Never commit .env file to Git** (already in .gitignore)
✅ **Use App Passwords** instead of regular passwords
✅ **Keep credentials secure** - don't share them
✅ **Rotate passwords** periodically
✅ **Use environment variables** for all sensitive data

---

## How It Works

1. **User submits contact form** on your website
2. **Backend receives** the form data
3. **Message is saved** to `backend/data/contacts.json`
4. **Email notification sent** to bakrinola80@gmail.com (non-blocking)
5. **Success response** returned to user
6. **Admin can view** message in admin panel

**Note:** Email sending is non-blocking, so even if email fails, the contact form submission still succeeds and the message is saved.

---

## Production Deployment

When deploying to production (Heroku, Vercel, etc.):

1. **Set environment variables** in your hosting platform
2. **Don't use .env file** in production
3. **Use platform's environment variable settings**:
   - Heroku: Settings → Config Vars
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Environment variables

Example for Heroku:
```bash
heroku config:set EMAIL_SERVICE=gmail
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set ADMIN_EMAIL=bakrinola80@gmail.com
```

---

## Advanced Configuration

### Custom SMTP Server

If you want to use a custom SMTP server:

Edit `backend/services/emailService.js`:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Multiple Admin Emails

To send notifications to multiple admins:

Update `.env`:
```env
ADMIN_EMAIL=admin1@gmail.com,admin2@gmail.com,admin3@gmail.com
```

Update `backend/services/emailService.js`:
```javascript
to: process.env.ADMIN_EMAIL.split(',').map(e => e.trim()),
```

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review backend console logs
3. Verify email service credentials
4. Test with a simple email first

---

## Files Modified

- ✅ `backend/services/emailService.js` - Email service implementation
- ✅ `backend/routes/api.js` - Added email notification to contact endpoint
- ✅ `backend/.env` - Added email configuration variables
- ✅ `backend/package.json` - Added nodemailer dependency

---

## Next Steps

1. ✅ Configure your email credentials in `backend/.env`
2. ✅ Restart the backend server
3. ✅ Test the contact form
4. ✅ Check bakrinola80@gmail.com for notifications
5. ✅ Customize email template if needed (optional)

**Your email notification system is ready to use!** 🎉
