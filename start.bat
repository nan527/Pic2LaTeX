@echo off
chcp 936 >nul
title Pic2LaTeX Launcher

echo.
echo  ========================================
echo          Pic2LaTeX - AI Image to LaTeX
echo  ========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo  [OK] Node.js: %NODE_VER%

if not exist "%~dp0server\node_modules" (
    echo  [..] Installing backend dependencies...
    pushd "%~dp0server"
    call npm install
    popd
)

if not exist "%~dp0client\node_modules" (
    echo  [..] Installing frontend dependencies...
    pushd "%~dp0client"
    call npm install
    popd
)

echo  [OK] Dependencies ready
echo.
echo  Starting backend  (port 3002) ...
echo  Starting frontend (port 5173) ...
echo.

start "Pic2LaTeX-Backend" /D "%~dp0server" cmd /k npm run dev

timeout /t 2 /nobreak >nul

start "Pic2LaTeX-Frontend" /D "%~dp0client" cmd /k npm run dev

timeout /t 3 /nobreak >nul
start http://localhost:5173

echo  [OK] Browser opened: http://localhost:5173
echo.
echo  Close this window anytime.
echo  To stop services, close the Backend and Frontend windows.
echo.
pause
