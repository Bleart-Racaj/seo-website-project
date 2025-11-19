# 🚀 START HERE - Quick Setup Guide

Follow these steps in order to get your project running!

## Step 1: Install Dependencies

Open a terminal in the `starter-project` folder and run:

```bash
# Install Prisma and root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 2: Create .env File

Create a `.env` file in the `starter-project` folder (same level as package.json):

```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/inventory?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## Step 3: Start PostgreSQL Database

From the **main project folder** (seo-website-project), run:

```bash
docker-compose up -d postgres
```

This will start PostgreSQL in the background. Wait a few seconds for it to be ready.

## Step 4: Set Up Database Tables

From the `starter-project` folder, run:

```bash
npm run prisma:dev
```

This will:
- Generate Prisma Client
- Create database tables
- Set up migrations

## Step 5: Start Backend Server

Open a terminal and run:

```bash
cd starter-project/backend
npm start
```

You should see: `Server is running on port 3001`

## Step 6: Start Frontend Server

Open a **NEW terminal** and run:

```bash
cd starter-project/frontend
npm run dev
```

You should see: `Ready on http://localhost:3000`

## Step 7: Open Your Browser

Go to: **http://localhost:3000**

You should see the starter page!

## ✅ Verification

- ✅ Backend running on http://localhost:3001
- ✅ Frontend running on http://localhost:3000
- ✅ Database connected and tables created
- ✅ Authentication routes available at `/auth/register` and `/auth/login`

## 🎯 Next Steps

Now you can start building:
1. Add Product and Supplier models to `prisma/schema.prisma`
2. Create API routes in `backend/src/routes/`
3. Build frontend pages in `frontend/app/`
4. Add file upload functionality
5. Add search functionality

## 🐛 Troubleshooting

**Database connection error?**
- Make sure Docker is running
- Check if PostgreSQL is running: `docker ps`
- Verify DATABASE_URL in `.env` file

**Prisma errors?**
- Make sure you're in `starter-project` folder
- Run `npm install` again
- Check that `.env` file exists

**Port already in use?**
- Change PORT in `.env` file
- Or stop the service using that port

---

**You're all set! 🎉**

