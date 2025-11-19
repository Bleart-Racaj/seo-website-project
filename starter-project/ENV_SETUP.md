# Environment Setup

## Create .env file

Create a file named `.env` in the `starter-project` folder with the following content:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/inventory?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## Important Notes

- The `DATABASE_URL` matches the Docker Compose PostgreSQL configuration
- Change `JWT_SECRET` to a secure random string in production
- The database name is `inventory` (as configured in docker-compose.yml)

