# Inventory Management System

A full-stack inventory management application with Node.js/Express backend and Next.js frontend, featuring authentication, supplier management, and product tracking with image uploads.

## Project Structure

```
.
├── backend/          # Node.js/Express API server
│   ├── src/
│   │   ├── app.js              # Express application
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Authentication middleware
│   │   ├── lib/                # Prisma client
│   │   └── uploads/            # Uploaded product images
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   └── package.json
├── frontend/        # Next.js React application
│   ├── app/                    # Next.js App Router pages
│   ├── lib/                    # API utilities
│   └── package.json
└── docker-compose.yml          # Docker services configuration
```

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (optional, for database)
- PostgreSQL 15 (if not using Docker)

## Quick Start with Docker

1. **Clone the repository** (if applicable)

2. **Set up environment variables:**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```

3. **Start Docker services:**
   ```bash
   docker-compose up -d postgres
   ```
   This starts PostgreSQL on port 5432.

4. **Set up Backend:**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Set up Frontend:**
   ```bash
   cd frontend
   npm install
   ```

6. **Start Backend:**
   ```bash
   cd backend
   node src/app.js
   ```
   Backend runs on `http://localhost:3001`

7. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## Manual Setup (Without Docker)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure:
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `PORT` - Server port (default: 3000)

4. **Set up PostgreSQL database:**
   - Create a database named `inventory` (or update DATABASE_URL)
   - Ensure PostgreSQL is running

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

6. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

7. **Start the server:**
   ```bash
   node src/app.js
   ```
   Or create a start script in `package.json`:
   ```json
   "scripts": {
     "start": "node src/app.js",
     "dev": "nodemon src/app.js"
   }
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and configure:
   - `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001)

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## Docker Compose

To run all services with Docker:

```bash
docker-compose up
```

This will start:
- **PostgreSQL** on port 5432
- **Backend** on port 3001 (requires build)
- **Frontend** on port 3000 (requires build)

Note: You'll need to create Dockerfiles for backend and frontend services, or remove those services from docker-compose.yml and run them manually.

### Docker Services

- **postgres**: PostgreSQL 15 database
  - Port: 5432
  - Database: inventory
  - User: admin
  - Password: admin

## API Documentation

Base URL: `http://localhost:3001`

### Authentication Endpoints

#### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe" // optional
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/auth/login`
Login and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "jwt-token-here",
  "userId": "uuid",
  "email": "user@example.com"
}
```

**Note:** Include token in subsequent requests: `Authorization: Bearer <token>`

---

### Supplier Endpoints

All supplier endpoints require JWT authentication.

#### GET `/suppliers`
Get all suppliers.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Supplier Name",
    "email": "supplier@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "products": [...]
  }
]
```

#### POST `/suppliers`
Create a new supplier.

**Request Body:**
```json
{
  "name": "Supplier Name", // required
  "email": "supplier@example.com", // optional, must be unique
  "phone": "123-456-7890", // optional
  "address": "123 Main St" // optional
}
```

**Response:** `201 Created`

#### PUT `/suppliers/:id`
Update a supplier.

**Request Body:**
```json
{
  "name": "Updated Name", // optional
  "email": "newemail@example.com", // optional
  "phone": "987-654-3210", // optional
  "address": "456 New St" // optional
}
```

**Response:** `200 OK`

---

### Product Endpoints

All product endpoints require JWT authentication.

#### GET `/products`
Get all products.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 100,
    "imagePath": "/uploads/product-image.jpg",
    "supplierId": "uuid",
    "userId": "uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "supplier": {...},
    "user": {...}
  }
]
```

#### GET `/products/search?q=query`
Search products by name or supplier name.

**Query Parameters:**
- `q` (required): Search query string

**Response:** `200 OK` - Array of matching products

#### POST `/products`
Create a new product.

**Request Body:**
```json
{
  "name": "Product Name", // required
  "description": "Product description", // optional
  "price": 99.99, // required, must be >= 0
  "stock": 100, // optional, defaults to 0
  "supplierId": "uuid" // required, must exist
}
```

**Response:** `201 Created`

#### PUT `/products/:id`
Update a product.

**Request Body:**
```json
{
  "name": "Updated Name", // optional
  "description": "Updated description", // optional
  "price": 149.99, // optional, must be >= 0
  "stock": 50, // optional
  "supplierId": "uuid" // optional, must exist if provided
}
```

**Response:** `200 OK`

#### POST `/products/upload`
Upload a product image.

**Request:** `multipart/form-data`
- `image`: Image file (required, JPG/JPEG/PNG, max 5MB)
- `productId`: Product UUID (required)

**Response:** `200 OK`
```json
{
  "message": "Image uploaded successfully",
  "filePath": "/uploads/product-1234567890.jpg",
  "product": {...}
}
```

---

## Database Schema

### Models

- **User**: Authentication and user management
- **Supplier**: Supplier information
- **Product**: Product information with supplier and user relationships

See `backend/prisma/schema.prisma` for detailed schema definition.

## Technologies Used

### Backend
- Node.js & Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing
- Multer for file uploads

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Axios for HTTP requests
- SWR for data fetching (installed but not yet used)

## Development

### Backend Scripts

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# View database (Prisma Studio)
npx prisma studio
```

### Frontend Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Environment Variables

See `.env.example` files in `backend/` and `frontend/` directories for required environment variables.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database credentials

### Authentication Issues
- Ensure JWT_SECRET is set in backend/.env
- Check token expiration (default: 24 hours)
- Verify token is included in Authorization header

### Image Upload Issues
- Ensure /backend/src/uploads directory exists
- Check file size (max 5MB)
- Verify file type (JPG/JPEG/PNG only)

## License

ISC
