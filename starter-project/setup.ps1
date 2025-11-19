# Setup Script for Starter Project
# Run this AFTER Docker Desktop is started

Write-Host "`n=== Starter Project Setup ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Docker
Write-Host "Step 1: Checking Docker..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✓ Docker is running!" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running. Please start Docker Desktop first!" -ForegroundColor Red
    exit 1
}

# Step 2: Start PostgreSQL
Write-Host "`nStep 2: Starting PostgreSQL database..." -ForegroundColor Yellow
Set-Location ..
docker-compose up -d postgres
Start-Sleep -Seconds 5
Write-Host "✓ PostgreSQL started!" -ForegroundColor Green

# Step 3: Set up database
Write-Host "`nStep 3: Setting up database tables..." -ForegroundColor Yellow
Set-Location starter-project
npm run prisma:dev
Write-Host "✓ Database tables created!" -ForegroundColor Green

Write-Host "`n=== Setup Complete! ===" -ForegroundColor Green
Write-Host "`nNow you can start the servers:" -ForegroundColor Cyan
Write-Host "`nBackend (Terminal 1):" -ForegroundColor Yellow
Write-Host "  cd starter-project/backend" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host "`nFrontend (Terminal 2):" -ForegroundColor Yellow
Write-Host "  cd starter-project/frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""

