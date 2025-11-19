# 🔍 How to Check if Database is Running

## Quick Check Methods

### Method 1: Check Docker Containers (Easiest)

```bash
docker ps
```

**What to look for:**
- You should see a container named `postgres_db`
- Status should show "Up" and "healthy"
- Ports should show `0.0.0.0:5432->5432/tcp`

**Example output:**
```
CONTAINER ID   IMAGE         COMMAND                  STATUS
dba0be81f730   postgres:15   "docker-entrypoint.s…"   Up 5 minutes (healthy)
```

### Method 2: Check Specific Container

```bash
docker ps --filter "name=postgres_db"
```

### Method 3: Check Container Logs

```bash
docker logs postgres_db
```

This shows the PostgreSQL startup logs and any errors.

### Method 4: Test Database Connection

```bash
# Using psql (if installed)
psql -h localhost -p 5432 -U admin -d inventory

# Or test with Docker
docker exec -it postgres_db psql -U admin -d inventory
```

### Method 5: Check from Your Application

The easiest way is to try accessing your application:
- If the backend starts without errors, the database is connected
- If you see "Server is running on port 3001", database is likely connected

## 🚨 Troubleshooting

### Database Not Running?

**Start it:**
```bash
docker-compose up -d postgres
```

**Check if Docker Desktop is running:**
- Look for Docker icon in system tray
- Open Docker Desktop application
- Make sure it says "Docker Desktop is running"

### Database Container Stopped?

**Restart it:**
```bash
docker start postgres_db
```

**Or restart with docker-compose:**
```bash
docker-compose restart postgres
```

### Check Database Health

```bash
docker inspect postgres_db | grep -i health
```

### View All Containers (Including Stopped)

```bash
docker ps -a
```

This shows all containers, including stopped ones.

## ✅ Quick Status Check Script

I can create a simple script to check everything at once. Would you like me to create that?

## Common Issues

1. **Container not found**: Run `docker-compose up -d postgres`
2. **Port already in use**: Another PostgreSQL might be running on port 5432
3. **Connection refused**: Database might still be starting (wait 10-20 seconds)
4. **Docker not running**: Start Docker Desktop first

