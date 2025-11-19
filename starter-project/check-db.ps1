# Quick Database Status Check Script
Write-Host ""
Write-Host "=== Database Status Check ===" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker ps | Out-Null
    Write-Host "[OK] Docker is running" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Docker is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop first." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Checking PostgreSQL container..." -ForegroundColor Yellow

# Check for postgres container
$result = docker ps --filter "name=postgres_db" 2>&1

if ($result -match "postgres_db") {
    Write-Host "[OK] PostgreSQL Database is RUNNING" -ForegroundColor Green
    Write-Host "  Container: postgres_db" -ForegroundColor White
    Write-Host "  Port: localhost:5432" -ForegroundColor White
    Write-Host ""
    Write-Host "Database is ready to use!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] PostgreSQL Database is NOT running" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start it, run:" -ForegroundColor Yellow
    Write-Host "  docker-compose up -d postgres" -ForegroundColor White
}

Write-Host ""
