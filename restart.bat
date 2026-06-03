@echo off
chcp 936 >nul
title Pic2LaTeX Restart

echo.
echo  Restarting Pic2LaTeX...
echo.

call "%~dp0stop.bat" --no-pause
timeout /t 2 /nobreak >nul
call "%~dp0start.bat"
