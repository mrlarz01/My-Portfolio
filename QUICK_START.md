# 🚀 Quick Start Guide

Get your Larz Design Portfolio website running in **5 minutes**!

## ⚡ Step 1: Install Dependencies

Open **3 terminal windows** and run these commands:

### Terminal 1 - Frontend
```bash
cd frontend
npm install
```

### Terminal 2 - Backend
```bash
cd backend
npm install
```

### Terminal 3 - Admin Panel (Optional)
```bash
cd admin-panel
npm install
```

⏱️ This will take 2-3 minutes depending on your internet speed.

---

## ⚡ Step 2: Start the Backend Server

In **Terminal 2** (backend directory):
```bash
npm run dev
```

✅ You should see: `Server is running on port 5000`

---

## ⚡ Step 3: Start the Frontend

In **Terminal 1** (frontend directory):
```bash
npm start
```

✅ Your browser will automatically open to `http://localhost:3000`

🎉 **You should now see your portfolio website!**

---

## ⚡ Step 4: Start Admin Panel (Optional)

In **Terminal 3** (admin-panel directory):
```bash
npm start
```

Then open `http://localhost:4000` and login with:
- Username: `admin`
- Password: `admin123`

---

## 🎨 What to Expect

### Frontend (`http://localhost:3000`)
- Beautiful homepage with hero section
- Portfolio page with project filtering
- Resume page with timeline
- Contact page with form

### Admin Panel (`http://localhost:4000`)
- Dashboard with statistics
- Portfolio management
- Resume management
- Contact submissions viewer

---

## 🐛 Troubleshooting

### "Port already in use" error?
**Solution:** Kill the process using that port or change the port number.

### "Module not found" error?
**Solution:** Make sure you ran `npm install` in each directory.

### Frontend can't connect to backend?
**Solution:** Make sure backend is running first on port 5000.

### Still having issues?
Check `SETUP_GUIDE.md` for detailed troubleshooting steps.

---

## ✅ Next Steps After Running

1. **Customize Content**: 
   - Edit portfolio items via Admin Panel
   - Update resume information
   - Change contact details

2. **Add Images**: 
   - Replace placeholder images with your actual portfolio images
   - Upload images in Admin Panel or manually add to backend/uploads

3. **Customize Branding**:
   - Change "Larz Design" to your brand name
   - Update colors in `frontend/src/styles/variables.scss`

4. **Deploy**:
   - Build frontend: `cd frontend && npm run build`
   - Deploy to Vercel, Netlify, or your preferred hosting

---

## 📚 Need More Help?

- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Project Documentation**: See `PROJECT_INSTRUCTIONS.md`
- **Main README**: See `README.md`

---

**Happy coding! 🎉**

