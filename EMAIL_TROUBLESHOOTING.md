# Email Notification Troubleshooting Guide

## 🔍 Quick Diagnostics

Run this command to check your setup:
```bash
cd backend
node test-email.js
```

---

## ❌ Common Errors & Solutions

### Error: "Invalid login"

**Symptoms:**
```
Failed to send email notification: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Causes:**
- Using regular Gmail password instead of App Password
- Incorrect App Password
- Spaces in App Password

**Solutions:**
1. ✅ Generate new App Password at: https://myaccount.google.com/apppasswords
2. ✅ Copy the 16-character password
3. ✅ Remove ALL spaces when pasting into .env
4. ✅ Restart backend server

**Example:**
```env
# ❌ WRONG (has spaces)
EMAIL_PASSWORD=abcd efgh ijkl mnop

# ✅ CORRECT (no spaces)
EMAIL_PASSWORD=abcdefghijklmnop
```

---

### Error: "Username and Password not accepted"

**Symptoms:**
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**Causes:**
- 2-Factor Authentication not enabled
- App Password not generated
- Wrong email address

**Solutions:**
1. ✅ Enable 2FA: https://myaccount.google.com/security
2. ✅ Generate App Password: https://myaccount.google.com/apppasswords
3. ✅ Verify EMAIL_USER matches your Gmail address
4. ✅ Restart backend server

---

### Error: "Email service not configured"

**Symptoms:**
```
Email service not configured. Email notifications will be disabled.
```

**Causes:**
- Missing environment variables in .env
- .env file not loaded
- Typo in variable names

**Solutions:**
1. ✅ Check .env file exists in backend folder
2. ✅ Verify all EMAIL_* variables are set:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=bakrinola80@gmail.com
   ```
3. ✅ No typos in variable names
4. ✅ Restart backend server

---

### Error: "Connection timeout"

**Symptoms:**
```
Error: Connection timeout
```

**Causes:**
- No internet connection
- Firewall blocking SMTP
- Gmail SMTP server down (rare)

**Solutions:**
1. ✅ Check internet connection
2. ✅ Try accessing gmail.com in browser
3. ✅ Check firewall settings
4. ✅ Try different network (mobile hotspot)
5. ✅ Wait a few minutes and retry

---

### Error: "ENOTFOUND smtp.gmail.com"

**Symptoms:**
```
Error: getaddrinfo ENOTFOUND smtp.gmail.com
```

**Causes:**
- DNS resolution failure
- No internet connection
- Network configuration issue

**Solutions:**
1. ✅ Check internet connection
2. ✅ Ping smtp.gmail.com:
   ```bash
   ping smtp.gmail.com
   ```
3. ✅ Try different DNS (8.8.8.8, 1.1.1.1)
4. ✅ Restart router/modem
5. ✅ Try different network

---

### Error: "self signed certificate in certificate chain"

**Symptoms:**
```
Error: self signed certificate in certificate chain
```

**Causes:**
- Corporate proxy/firewall
- Antivirus intercepting SSL
- Network security software

**Solutions:**
1. ✅ Disable antivirus temporarily
2. ✅ Try different network
3. ✅ Add to emailService.js:
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: { ... },
     tls: { rejectUnauthorized: false } // Add this
   });
   ```

---

### Error: "Too many login attempts"

**Symptoms:**
```
Error: 535-5.7.8 Too many login attempts
```

**Causes:**
- Multiple failed login attempts
- Gmail security lockout

**Solutions:**
1. ✅ Wait 15-30 minutes
2. ✅ Check Gmail security alerts: https://myaccount.google.com/notifications
3. ✅ Verify account access
4. ✅ Generate new App Password
5. ✅ Try again

---

## 🔧 Configuration Issues

### Backend server not restarting

**Problem:** Changed .env but still getting errors

**Solution:**
```bash
# Stop server (Ctrl+C)
# Start again
cd backend
npm start
```

---

### .env file not found

**Problem:** "Email service not configured" even though .env exists

**Check:**
```bash
# Verify .env is in backend folder
cd backend
dir .env    # Windows
ls -la .env # Mac/Linux
```

**Solution:**
- Ensure .env is in backend folder (not root)
- Check file name is exactly `.env` (not `.env.txt`)

---

### Wrong email service

**Problem:** Using Outlook but configured for Gmail

**Solution:**
```env
# For Outlook
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-outlook-app-password

# For Yahoo
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-yahoo-app-password
```

---

## 📧 Email Delivery Issues

### Email not arriving

**Check:**
1. ✅ Spam/Junk folder
2. ✅ Promotions tab (Gmail)
3. ✅ All Mail folder
4. ✅ Email filters/rules

**Solutions:**
- Add sender to contacts
- Mark as "Not Spam"
- Check email filters
- Wait 5-10 minutes (delivery delay)

---

### Email goes to spam

**Solutions:**
1. ✅ Add sender to contacts
2. ✅ Mark as "Not Spam"
3. ✅ Create filter to always inbox
4. ✅ Check SPF/DKIM records (advanced)

---

### Email formatting broken

**Problem:** Email shows HTML code instead of formatted content

**Causes:**
- Email client doesn't support HTML
- Security settings blocking HTML

**Solutions:**
- Check plain text version (should still be readable)
- Try different email client
- Check email security settings

---

## 🧪 Testing Issues

### Test script fails

**Problem:** `node test-email.js` shows errors

**Check:**
```bash
# Verify you're in backend folder
cd backend
pwd  # Should show: .../backend

# Check if file exists
dir test-email.js    # Windows
ls test-email.js     # Mac/Linux

# Run test
node test-email.js
```

---

### Contact form not triggering email

**Problem:** Form submits but no email sent

**Check:**
1. ✅ Backend console for errors
2. ✅ Network tab in browser DevTools
3. ✅ Backend server running
4. ✅ CORS configured correctly

**Debug:**
```javascript
// Add logging to routes/api.js
router.post('/contact', async (req, res) => {
  console.log('Contact form received:', req.body);
  
  // ... existing code ...
  
  sendContactNotification(newContact)
    .then(result => console.log('Email result:', result))
    .catch(error => console.error('Email error:', error));
});
```

---

## 🔍 Debugging Steps

### Step 1: Check Configuration
```bash
cd backend
cat .env  # Mac/Linux
type .env # Windows
```

Verify:
- ✅ EMAIL_SERVICE is set
- ✅ EMAIL_USER is your email
- ✅ EMAIL_PASSWORD is App Password (no spaces)
- ✅ ADMIN_EMAIL is bakrinola80@gmail.com

---

### Step 2: Test Email Service
```bash
cd backend
node test-email.js
```

Expected output:
```
✅ SUCCESS! Email notification sent successfully!
   Message ID: <some-id>

📬 Check your inbox at: bakrinola80@gmail.com
```

---

### Step 3: Check Backend Logs
```bash
cd backend
npm start
```

Look for:
- ✅ "Server is running on port 5000"
- ✅ No error messages
- ✅ "Email notification sent successfully" (after form submission)

---

### Step 4: Test Contact Form
1. Open website
2. Go to Contact page
3. Fill out form
4. Submit
5. Check browser console (F12)
6. Check backend console
7. Check email inbox

---

### Step 5: Verify Email Delivery
1. Check inbox
2. Check spam folder
3. Check all mail
4. Wait 5 minutes
5. Try test script again

---

## 🆘 Still Not Working?

### Collect Information

1. **Backend Console Output:**
   ```bash
   cd backend
   npm start
   # Copy any error messages
   ```

2. **Test Script Output:**
   ```bash
   cd backend
   node test-email.js
   # Copy full output
   ```

3. **Environment Variables:**
   ```bash
   cd backend
   cat .env
   # Verify (don't share passwords!)
   ```

4. **Node Version:**
   ```bash
   node --version
   # Should be v14 or higher
   ```

---

### Try Alternative Email Service

If Gmail not working, try Outlook:

1. **Get Outlook App Password:**
   - Go to: https://account.microsoft.com/security
   - Advanced security options
   - Create app password

2. **Update .env:**
   ```env
   EMAIL_SERVICE=outlook
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASSWORD=your-outlook-app-password
   ADMIN_EMAIL=bakrinola80@gmail.com
   ```

3. **Test:**
   ```bash
   cd backend
   node test-email.js
   ```

---

## 📋 Diagnostic Checklist

Run through this checklist:

- [ ] .env file exists in backend folder
- [ ] All EMAIL_* variables set in .env
- [ ] Using App Password (not regular password)
- [ ] No spaces in App Password
- [ ] 2FA enabled on Gmail
- [ ] Backend server restarted after .env changes
- [ ] Internet connection working
- [ ] Can access gmail.com in browser
- [ ] Test script runs without errors
- [ ] Backend console shows no errors
- [ ] Contact form submits successfully
- [ ] Checked spam folder
- [ ] Waited 5-10 minutes for delivery

---

## 🔄 Reset Everything

If nothing works, start fresh:

1. **Generate New App Password:**
   - Delete old one
   - Create new at: https://myaccount.google.com/apppasswords

2. **Update .env:**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=new-app-password-no-spaces
   ADMIN_EMAIL=bakrinola80@gmail.com
   ```

3. **Restart Backend:**
   ```bash
   # Stop server (Ctrl+C)
   cd backend
   npm start
   ```

4. **Test:**
   ```bash
   # New terminal
   cd backend
   node test-email.js
   ```

---

## 📞 Additional Resources

- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **Gmail Security:** https://myaccount.google.com/security
- **Nodemailer Docs:** https://nodemailer.com/
- **Setup Guide:** See `EMAIL_NOTIFICATION_SETUP.md`
- **Quick Start:** See `EMAIL_QUICK_START.md`

---

## ✅ Success Indicators

You know it's working when:

✅ Test script shows: "Email notification sent successfully"  
✅ Backend console shows: "Email notification sent successfully: <message-id>"  
✅ Email arrives at bakrinola80@gmail.com  
✅ Email is properly formatted (HTML)  
✅ Contact form submissions trigger emails  
✅ No errors in backend console

---

**Most issues are solved by:**
1. Using App Password (not regular password)
2. Removing spaces from App Password
3. Restarting backend server
4. Checking spam folder

**Good luck! 🎉**
