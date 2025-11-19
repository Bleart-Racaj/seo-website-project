# 🚀 Complete Setup - All Steps Together

## Current Status ✅

- ✅ All dependencies installed
- ✅ Environment file (.env) created
- ✅ Project structure ready

## What You Need to Do Now

### STEP 1: Start Docker Desktop ⚠️

**This is REQUIRED before anything else!**

1. Open **Docker Desktop** from your Start menu
2. Wait 1-2 minutes for it to fully start
3. Look for the Docker icon in your system tray (bottom right corner)
4. It should be green/active when ready

**Once Docker Desktop is running, continue to Step 2!**

---

### STEP 2: Run the Setup Script

I've created a script that will do steps 2-3 automatically for you!

**Option A: Use the Script (Easiest)**
```powershell
cd starter-project
.\setup.ps1
```

**Option B: Manual Steps (If script doesn't work)**

#### 2a. Start PostgreSQL Database
```powershell
# From main project folder
docker-compose up -d postgres
```

Wait 5-10 seconds for PostgreSQL to start.

#### 2b. Set Up Database Tables
```powershell
cd starter-project
npm run prisma:dev
```

This will create the User table in your database.

---

### STEP 3: Start Backend Server

Open a **NEW terminal window** and run:

```powershell
cd starter-project\backend
npm start
```

You should see:
```
Server is running on port 3001
```

**Keep this terminal open!** The backend needs to keep running.

---

### STEP 4: Start Frontend Server

Open **ANOTHER NEW terminal window** and run:

```powershell
cd starter-project\frontend
npm run dev
```

You should see:
```
Ready on http://localhost:3000
```

**Keep this terminal open too!**

---

### STEP 5: Test Everything! 🎉

1. **Open your web browser**
2. **Go to:** http://localhost:3000
3. **You should see:** The starter project homepage!

---

## 🧪 Test the API

You can test if the backend is working:

### Test Registration
Open a new terminal and run:
```powershell
curl -X POST http://localhost:3001/auth/register -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"password123\",\"name\":\"Test User\"}'
```

### Test Login
```powershell
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/json" -d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

---

## 📊 What Should Be Running

You should have:
- ✅ Docker Desktop running
- ✅ PostgreSQL container running (check with `docker ps`)
- ✅ Backend server on http://localhost:3001
- ✅ Frontend server on http://localhost:3000

---

## 🐛 Troubleshooting

### Docker won't start?
- Make sure Docker Desktop is installed
- Restart your computer if needed
- Check Windows WSL2 is enabled (Settings > Windows Features)

### Database connection error?
- Make sure Docker Desktop is fully started (wait 1-2 minutes)
- Check: `docker ps` - you should see `postgres_db` container
- Wait a few more seconds after starting PostgreSQL

### Port already in use?
- Backend (3001): Change PORT in `.env` file
- Frontend (3000): Next.js will use next available port automatically
- Or stop the program using that port

### Prisma errors?
- Make sure you're in `starter-project` folder
- Check that `.env` file exists
- Run `npm install` again if needed

---

## ✅ Checklist

Before you start building features, make sure:

- [ ] Docker Desktop is running
- [ ] PostgreSQL container is running (`docker ps` shows postgres_db)
- [ ] Database tables created (ran `npm run prisma:dev`)
- [ ] Backend server running on port 3001
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000 in browser
- [ ] Can test API at http://localhost:3001/auth/register

---

## 🎯 Next Steps After Setup

Once everything is running, you can start building:

1. **Add Product Model** to `prisma/schema.prisma`
2. **Add Supplier Model** to `prisma/schema.prisma`
3. **Run migrations**: `npm run prisma:dev`
4. **Create Product Routes** in `backend/src/routes/products.js`
5. **Create Supplier Routes** in `backend/src/routes/suppliers.js`
6. **Build Frontend Pages** in `frontend/app/`
7. **Add File Upload** functionality
8. **Add Search** functionality

---

**Ready to start? Begin with Step 1 - Start Docker Desktop! 🐳**

