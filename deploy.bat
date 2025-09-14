@echo off
echo Polban Landing Page - GitHub Deployment
echo ======================================
echo.
echo This will deploy the project to GitHub using the PowerShell script.
echo Make sure you have:
echo 1. A GitHub account
echo 2. Created a new repository on GitHub
echo.
pause
powershell -ExecutionPolicy Bypass -File deploy_to_github.ps1
pause