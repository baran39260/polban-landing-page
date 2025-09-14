# GitHub Deployment Guide for Polban Landing Page

This guide will help you deploy the Polban landing page to GitHub and host it using GitHub Pages.

## Prerequisites

1. A GitHub account (create one at https://github.com/join if you don't have one)
2. Git installed on your computer (comes with GitHub Desktop or can be installed separately)

## Deployment Steps

### Option 1: Using the Automated Deployment Script (Recommended)

1. Double-click on `deploy.bat` in the project folder, or run it from PowerShell:
   ```powershell
   .\deploy.bat
   ```

2. Follow the prompts in the PowerShell window:
   - Enter your GitHub username
   - Enter the repository name you want to create (e.g., "polban-landing-page")

3. The script will automatically:
   - Set up the remote repository connection
   - Push all files to GitHub
   - Configure the main branch

### Option 2: Manual Deployment

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Enter a repository name (e.g., "polban-landing-page")
   - Choose Public or Private (your choice)
   - **Important**: Leave all initialization options unchecked (no README, no .gitignore, no license)
   - Click "Create repository"

2. Copy the repository URL (it will look like: `https://github.com/yourusername/your-repo-name.git`)

3. Open PowerShell or Command Prompt and navigate to the project folder:
   ```powershell
   cd d:\flutterflow\polban-rnezgj\landing
   ```

4. Add the remote origin:
   ```powershell
   git remote add origin YOUR_COPIED_REPOSITORY_URL
   ```

5. Rename the branch to main (if needed):
   ```powershell
   git branch -M main
   ```

6. Push the code to GitHub:
   ```powershell
   git push -u origin main
   ```

## Setting up GitHub Pages

After pushing your code to GitHub:

1. Go to your repository on GitHub
2. Click on the "Settings" tab
3. Scroll down to the "Pages" section
4. Under "Source", select "main" branch from the dropdown
5. Click "Save"
6. Wait a minute or two for GitHub to build your site
7. You'll see a message with your site URL (it will look like: `https://yourusername.github.io/your-repo-name/`)

## Updating Your Site

If you make changes to your site in the future:

1. Commit your changes:
   ```powershell
   git add .
   git commit -m "Describe your changes here"
   ```

2. Push to GitHub:
   ```powershell
   git push
   ```

Your GitHub Pages site will automatically update with your changes.

## Troubleshooting

If you encounter any issues:

1. Make sure you have internet connection
2. Verify your GitHub credentials if prompted
3. Check that you've correctly created an empty repository (without initialization files)
4. Ensure Git is properly installed on your system

If you continue to have problems, feel free to ask for help!