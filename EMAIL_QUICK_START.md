# Email Notification - Quick Start

## 🚀 Get Started in 3 Steps

### Step 1: Get Gmail App Password (2 minutes)

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Gmail account
3. If you don't see the page, enable 2FA first at: https://myaccount.google.com/security
4. Select **Mail** and **Other (Custom name)**
5. Enter: **Portfolio Website**
6. Click **Generate**
7. Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

### Step 2: Configure Backend (1 minute)

Open `backend/.env` and update these lines:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=bakrinola80@gmail.com
```

**Replace:**
- `your-gmail@gmail.com` with your Gmail address
- `abcdefghijklmnop` with your App Password (remove spaces)

### Step 3: Test It (1 minute)

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Test email
cd backend
node test-email.js
```

Check **bakrinola80@gmail.com** for the test email!

---

## ✅ That's It!

Now whenever someone submits your contact form, you'll get an instant email notification at **bakrinola80@gmail.com**.

---

## 🆘 Not Working?

### Quick Fixes:

**"Invalid login" error?**
- Use App Password, not your regular Gmail password
- Remove spaces from the App Password

**"Username and Password not accepted"?**
- Enable 2FA first: https://myaccount.google.com/security
- Then generate App Password: https://myaccount.google.com/apppasswords

**Still not working?**
- See full guide: `EMAIL_NOTIFICATION_SETUP.md`
- Check backend console for error messages

---

## 📧 What You'll Receive

Every contact form submission sends you a beautiful email with:
- Sender's name and email
- Phone number (if provided)
- Subject line
- Full message
- Date and time
- Quick reply button

---

## 🔒 Security Note

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- Use App Passwords, not regular passwords
- Keep your credentials secure

---

**Need more help?** See `EMAIL_NOTIFICATION_SETUP.md` for detailed instructions.
