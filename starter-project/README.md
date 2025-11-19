# Full-Stack Starter Project

A clean starter project with Express backend, Next.js frontend, and Prisma ORM.

## Project Structure

```
root/
├── backend/          # Express.js backend
│   └── src/
│       ├── app.js
│       ├── lib/
│       │   └── prisma.js
│       ├── routes/
│       └── middleware/
├── frontend/         # Next.js App Router frontend
│   └── app/
├── prisma/           # Prisma schema and migrations
│   └── schema.prisma
├── .env              # Environment variables
├── package.json      # Root package.json with Prisma scripts
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL (or Docker for PostgreSQL)
- Docker and Docker Compose (optional)

## Setup Instructions

### 1. Install Dependencies

```bash
# Install root dependencies (for Prisma)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and configure:
# - DATABASE_URL (PostgreSQL connection string)
# - JWT_SECRET (for authentication)
# - PORT (backend port, default: 3001)
```

### 3. Set Up Database

**Option A: Using Docker Compose**
```bash
docker-compose up -d postgres
```

**Option B: Using Local PostgreSQL**
- Create a database named `inventory` (or update DATABASE_URL)
- Ensure PostgreSQL is running

### 4. Run Prisma Migrations

```bash
# From root directory
npm run prisma:dev
```

This will:
- Generate Prisma Client to `node_modules/@prisma/client`
- Create migration files
- Apply migrations to the database

### 5. Start Backend

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

Backend runs on `http://localhost:3001`

### 6. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000`

## Available Scripts

### Root Scripts
- `npm run prisma:dev` - Run Prisma migrations in development
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:studio` - Open Prisma Studio

### Backend Scripts
- `npm start` - Start backend server
- `npm run dev` - Start backend with nodemon (auto-reload)

### Frontend Scripts
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

### Backend
- **Express.js** - Web framework
- **JWT** (jsonwebtoken) - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Prisma** - ORM

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **React 19** - UI library

### Database
- **PostgreSQL** - Relational database
- **Prisma** - Database ORM

## Prisma Client Usage

Prisma Client is generated to the default location: `node_modules/@prisma/client`

Import in your backend code:
```javascript
const { PrismaClient } = require("@prisma/client");
// or
import { PrismaClient } from "@prisma/client";
```

Use the shared instance from `backend/src/lib/prisma.js`:
```javascript
const prisma = require('../lib/prisma');
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

All other endpoints require JWT authentication via `Authorization: Bearer <token>` header.

## Development

### Adding New Routes

1. Create route file in `backend/src/routes/`
2. Import and use in `backend/src/app.js`

Example:
```javascript
// backend/src/routes/users.js
const express = require('express');
const router = express.Router();
// ... routes
module.exports = router;

// backend/src/app.js
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
```

### Adding New Models

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:dev` from root
3. Use Prisma Client in your routes

## Notes

- Prisma schema is located at `prisma/schema.prisma` (root level)
- Prisma Client is generated to default path: `node_modules/@prisma/client`
- Backend uses `backend/src/lib/prisma.js` for shared Prisma instance
- All Prisma scripts should be run from the root directory

## License

ISC

