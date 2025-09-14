# PowerShell Script to deploy the Polban landing page to GitHub

Write-Host "=== Polban Landing Page GitHub Deployment Script ===" -ForegroundColor Green
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git is not installed. Please install Git and try again." -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
try {
    git rev-parse --git-dir > $null 2>&1
    Write-Host "Git repository already initialized." -ForegroundColor Green
} catch {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Polban landing page"
}

# Get repository details from user
Write-Host "Please provide your GitHub repository details:" -ForegroundColor Cyan
Write-Host ""
$github_username = Read-Host "GitHub username"
$repo_name = Read-Host "Repository name (e.g., polban-landing-page)"

# Set the remote origin
Write-Host ""
Write-Host "Setting up remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/$github_username/$repo_name.git

# Rename master branch to main if needed
$current_branch = git branch --show-current
if ($current_branch -eq "master") {
    Write-Host "Renaming branch from master to main..." -ForegroundColor Yellow
    git branch -m master main
}

# Push to GitHub
Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "=== Deployment Complete ===" -ForegroundColor Green
Write-Host "Your Polban landing page has been deployed to:" -ForegroundColor Green
Write-Host "https://github.com/$github_username/$repo_name" -ForegroundColor Green
Write-Host ""
Write-Host "You can now view your repository at the URL above." -ForegroundColor Green