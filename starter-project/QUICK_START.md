# Quick Start Guide

## ✅ Project Structure

```
starter-project/
├── backend/
│   └── src/
│       ├── app.js
│       ├── lib/
│       │   └── prisma.js          # Exports PrismaClient instance
│       ├── routes/
│       │   └── auth.js            # Authentication routes
│       └── middleware/
│           └── auth.js           # JWT authentication middleware
├── frontend/
│   └── app/                       # Next.js App Router
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── prisma/
│   └── schema.prisma              # Prisma schema (root level)
├── package.json                   # Root package.json with Prisma scripts
├── .env.example
└── README.md
```

## ✅ Key Features

1. **Prisma Schema at Root**: `prisma/schema.prisma`
2. **Default Prisma Client**: Generated to `node_modules/@prisma/client`
3. **PrismaClient Import**: `import { PrismaClient } from "@prisma/client"`
4. **Shared Prisma Instance**: `backend/src/lib/prisma.js`
5. **Prisma Script**: `npm run prisma:dev` from root

## 🚀 Setup Steps

### 1. Install Dependencies

```bash
# Root (for Prisma)
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your database URL and JWT secret
```

### 3. Set Up Database

Start PostgreSQL (via Docker or locally), then:

```bash
# From root directory
npm run prisma:dev
```

This will:
- Generate Prisma Client to `node_modules/@prisma/client`
- Create and apply migrations

### 4. Start Servers

**Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:3001
```

**Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

## 📝 Usage Examples

### Using Prisma in Backend

```javascript
// backend/src/routes/users.js
const prisma = require('../lib/prisma');

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
```

### Using JWT Authentication

```javascript
// backend/src/routes/protected.js
const authenticateToken = require('../middleware/auth');

router.get('/protected', authenticateToken, async (req, res) => {
  // req.user is available here
  res.json({ user: req.user });
});
```

### Using Multer for File Uploads

```javascript
// backend/src/routes/upload.js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});
```

## ✅ Verification Checklist

- [x] Prisma schema at `prisma/schema.prisma`
- [x] Prisma Client generates to default path
- [x] `backend/src/lib/prisma.js` exports PrismaClient instance
- [x] Root `package.json` has `prisma:dev` script
- [x] Backend has Express, JWT, Multer
- [x] Frontend uses Next.js App Router
- [x] All imports use `@prisma/client`

## 🎯 Next Steps

1. Add more models to `prisma/schema.prisma`
2. Create new routes in `backend/src/routes/`
3. Add new pages in `frontend/app/`
4. Run `npm run prisma:dev` after schema changes

