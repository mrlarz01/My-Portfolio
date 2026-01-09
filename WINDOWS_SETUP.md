# 🪟 Windows Setup Guide - Step by Step

## The Problem
You tried to run commands from `C:\Users\US3E>`, but your project is actually located at:
```
C:\Users\US3E\Downloads\my code
```

## ✅ The Solution - Follow These Steps

### Step 1: Open Command Prompt
Press `Windows Key + R`, type `cmd`, and press Enter.

### Step 2: Navigate to Your Project Directory

Copy and paste these commands **one at a time**:

```cmd
cd "C:\Users\US3E\Downloads\my code"
```

**Important:** Notice the quotes around the path because there's a space in "my code"

### Step 3: Verify You're in the Right Place

Type:
```cmd
dir
```

You should see folders named:
- `frontend`
- `backend`
- `admin-panel`

If you see these folders, you're in the right place! ✅

### Step 4: Install Frontend Dependencies

```cmd
cd frontend
npm install
```

⏱️ This will take 2-3 minutes. Wait until it finishes!

### Step 5: Go Back and Install Backend Dependencies

```cmd
cd ..
cd backend
npm install
```

⏱️ Wait for this to finish too!

### Step 6: Install Admin Panel Dependencies (Optional)

```cmd
cd ..
cd admin-panel
npm install
```

---

## 🚀 Starting the Servers

### Option 1: Using Command Prompt (One Window at a Time)

**Terminal Window 1 - Start Backend:**
```cmd
cd "C:\Users\US3E\Downloads\my code"
cd backend
npm run dev
```

Keep this window open and open a NEW Command Prompt window.

**Terminal Window 2 - Start Frontend:**
```cmd
cd "C:\Users\US3E\Downloads\my code"
cd frontend
npm start
```

### Option 2: Using PowerShell (Recommended for Windows)

You can also use **PowerShell** instead of Command Prompt:

1. Press `Windows Key + X`
2. Select "Windows PowerShell" or "Terminal"
3. Use the same commands as above

---

## 📝 Quick Copy-Paste Commands

**To install everything at once, open Command Prompt and paste:**

```cmd
cd "C:\Users\US3E\Downloads\my code" && cd frontend && npm install && cd .. && cd backend && npm install && cd .. && cd admin-panel && npm install
```

**Note:** In Command Prompt, use `&&` to chain commands. In PowerShell, use `;` instead.

---

## 🐛 Common Errors & Fixes

### Error: "The system cannot find the path specified"
**Fix:** Make sure you're using quotes around the path:
```cmd
cd "C:\Users\US3E\Downloads\my code"
```
NOT:
```cmd
cd C:\Users\US3E\Downloads\my code
```

### Error: "npm is not recognized"
**Fix:** You need to install Node.js first:
1. Go to https://nodejs.org/
2. Download and install the LTS version
3. Restart Command Prompt
4. Try again

### Error: "ENOENT: no such file or directory"
**Fix:** You're in the wrong directory. Make sure you navigate to the project folder first!

### Error: Port already in use
**Fix:** 
- Close any other programs using port 3000 or 5000
- Or change the port in the `.env` file

---

## ✅ Verification Checklist

After running `npm install` in each folder, verify:

- [ ] `frontend/node_modules` folder exists
- [ ] `backend/node_modules` folder exists  
- [ ] `admin-panel/node_modules` folder exists

If you see `node_modules` folders in each directory, installation was successful! 🎉

---

## 🎯 What to Do Next

Once all dependencies are installed:

1. **Start Backend** (in one terminal):
   ```cmd
   cd "C:\Users\US3E\Downloads\my code\backend"
   npm run dev
   ```

2. **Start Frontend** (in another terminal):
   ```cmd
   cd "C:\Users\US3E\Downloads\my code\frontend"
   npm start
   ```

3. **Open browser** to `http://localhost:3000`

---

## 💡 Pro Tip

Create a shortcut! Create a `.bat` file on your desktop:

**start-backend.bat:**
```batch
@echo off
cd /d "C:\Users\US3E\Downloads\my code\backend"
npm run dev
pause
```

**start-frontend.bat:**
```batch
@echo off
cd /d "C:\Users\US3E\Downloads\my code\frontend"
npm start
pause
```

Double-click these files to start your servers quickly!

---

Need help? Check `QUICK_START.md` for more details!


