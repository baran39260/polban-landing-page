#!/bin/bash

# Script to deploy the Polban landing page to GitHub

echo "=== Polban Landing Page GitHub Deployment Script ==="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo "Git is not installed. Please install Git and try again."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1
then
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Polban landing page"
fi

# Get repository details from user
echo "Please provide your GitHub repository details:"
echo ""
read -p "GitHub username: " github_username
read -p "Repository name (e.g., polban-landing-page): " repo_name

# Set the remote origin
echo ""
echo "Setting up remote repository..."
git remote add origin https://github.com/$github_username/$repo_name.git

# Rename master branch to main if needed
current_branch=$(git branch --show-current)
if [ "$current_branch" = "master" ]; then
    echo "Renaming branch from master to main..."
    git branch -m master main
fi

# Push to GitHub
echo "Pushing code to GitHub..."
git push -u origin main

echo ""
echo "=== Deployment Complete ==="
echo "Your Polban landing page has been deployed to:"
echo "https://github.com/$github_username/$repo_name"
echo ""
echo "You can now view your repository at the URL above."