# Backend Issues and Fixes

## Issues Found

1. ❌ **Prisma Client Not Generated**
   - Error: `Cannot find module '../generated/prisma'`
   - **Status:** ✅ FIXED - Ran `npx prisma generate`

2. ❌ **Incorrect DATABASE_URL**
   - Current: Prisma Postgres server URL
   - **Status:** ✅ FIXED - Updated to standard PostgreSQL connection string

3. ❌ **Missing JWT_SECRET**
   - **Status:** ✅ FIXED - Added JWT_SECRET to .env

4. ❌ **PORT Mismatch**
   - Backend: Port 3000
   - Frontend expects: Port 3001
   - **Status:** ✅ FIXED - Changed PORT to 3001

5. ⚠️ **Database Migrations Not Run**
   - Migrations directory is empty
   - **Action Required:** Run `npx prisma migrate dev`

6. ⚠️ **PostgreSQL Database Not Running**
   - Need to start PostgreSQL (via Docker or locally)
   - **Action Required:** Start database before running migrations

## How to Fix (Step by Step)

### Step 1: Fix .env File
The `.env` file should contain:
```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/inventory?schema=public"
JWT_SECRET="your-secret-key-change-this-in-production"
PORT=3001
```

### Step 2: Start PostgreSQL Database

**Option A: Using Docker Compose**
```bash
docker-compose up -d postgres
```

**Option B: Using Local PostgreSQL**
- Make sure PostgreSQL is installed and running
- Ensure database `inventory` exists
- Ensure user `admin` with password `admin` exists

### Step 3: Run Database Migrations
```bash
cd backend
npx prisma migrate dev --name init
```

This will:
- Create the database schema
- Generate migration files
- Apply migrations to the database

### Step 4: Verify Prisma Client is Generated
```bash
cd backend
npx prisma generate
```

You should see: `Generated Prisma Client`

### Step 5: Start the Backend Server
```bash
cd backend
node src/app.js
```

You should see: `Server is running on port 3001`

### Step 6: Test the Backend
Open your browser or use curl:
```bash
curl http://localhost:3001/auth/register -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"test123"}'
```

## Verification Checklist

- [x] Prisma client generated (`backend/generated/prisma` exists)
- [ ] .env file has correct DATABASE_URL
- [ ] .env file has JWT_SECRET
- [ ] .env file has PORT=3001
- [ ] PostgreSQL database is running
- [ ] Database migrations have been run
- [ ] Backend server starts without errors
- [ ] Backend responds on port 3001

## Common Errors and Solutions

### Error: "Cannot find module '../generated/prisma'"
**Solution:** Run `npx prisma generate`

### Error: "Can't reach database server"
**Solution:** 
1. Start PostgreSQL: `docker-compose up -d postgres`
2. Check DATABASE_URL in .env file
3. Verify database credentials

### Error: "P1001: Can't reach database server"
**Solution:** PostgreSQL is not running. Start it first.

### Error: "P3005: Database schema is not empty"
**Solution:** Database already has tables. Either:
- Use `npx prisma migrate reset` (WARNING: Deletes all data)
- Or use `npx prisma migrate deploy` for production

### Error: "Port 3001 already in use"
**Solution:** 
1. Stop the existing process: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process`
2. Or change PORT in .env to another port

## Testing the Backend

Once the backend is running, test these endpoints:

### 1. Register a User
```bash
POST http://localhost:3001/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123",
  "name": "Test User"
}
```

### 2. Login
```bash
POST http://localhost:3001/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

### 3. Get Suppliers (requires token)
```bash
GET http://localhost:3001/suppliers
Authorization: Bearer YOUR_TOKEN_HERE
```

If all these work, your backend is functioning correctly!

