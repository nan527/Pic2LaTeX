$Host.UI.RawUI.WindowTitle = "Pic2LaTeX Launcher"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host "          Pic2LaTeX - AI Image to LaTeX" -ForegroundColor Cyan
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVer = node -v 2>$null
    Write-Host "  [OK] Node.js: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "  [ERROR] Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies if needed
$serverModules = Join-Path $Root "server\node_modules"
$clientModules = Join-Path $Root "client\node_modules"

if (-not (Test-Path $serverModules)) {
    Write-Host "  [..] Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location (Join-Path $Root "server")
    npm install
    Pop-Location
}

if (-not (Test-Path $clientModules)) {
    Write-Host "  [..] Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location (Join-Path $Root "client")
    npm install
    Pop-Location
}

Write-Host "  [OK] Dependencies ready" -ForegroundColor Green
Write-Host ""
Write-Host "  Starting backend  (port 3002) ..." -ForegroundColor White
Write-Host "  Starting frontend (port 5173) ..." -ForegroundColor White
Write-Host ""

# Start backend in new window
$serverDir = Join-Path $Root "server"
Start-Process cmd -ArgumentList "/k", "cd /d `"$serverDir`" && npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start frontend in new window
$clientDir = Join-Path $Root "client"
Start-Process cmd -ArgumentList "/k", "cd /d `"$clientDir`" && npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3
Start-Process "http://localhost:5173"

Write-Host "  [OK] Browser opened: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "  Close this window anytime." -ForegroundColor Gray
Write-Host "  To stop services, close the Backend and Frontend windows." -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to exit"
