$Host.UI.RawUI.WindowTitle = "Pic2LaTeX Stop"

Write-Host ""
Write-Host "  Stopping Pic2LaTeX services..." -ForegroundColor Yellow
Write-Host ""

Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -match "vite|nodemon|app\.js"
} | Stop-Process -Force -ErrorAction SilentlyContinue

# Kill processes on ports 3002 and 5173
$ports = @(3002, 5173)
foreach ($port in $ports) {
    $conns = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    foreach ($conn in $conns) {
        Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "  [OK] Services stopped." -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
