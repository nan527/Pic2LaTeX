@echo off
chcp 936 >nul
title Pic2LaTeX Stop

echo.
echo  Stopping Pic2LaTeX services...
echo.

taskkill /FI "WINDOWTITLE eq Pic2LaTeX-Backend*" /F >nul 2>nul
taskkill /FI "WINDOWTITLE eq Pic2LaTeX-Frontend*" /F >nul 2>nul

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3002 ^| findstr LISTENING') do taskkill /PID %%a /F >nul 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do taskkill /PID %%a /F >nul 2>nul

echo  [OK] Services stopped.
echo.

if "%1"=="--no-pause" goto :eof
pause
