# Polban Landing Page

This is the landing page for Polban, a multilingual financial management application with RTL support.

## Folder Structure

```
.
├── assets/
│   └── images/          # All image assets
├── pages/               # All secondary HTML pages
│   ├── blog.html
│   ├── contact.html
│   ├── post1.html
│   ├── privacy.html
│   └── terms.html
├── src/
│   ├── css/             # Stylesheets
│   │   └── styles.css
│   └── js/              # JavaScript files
│       └── script.js
├── index.html           # Main landing page
├── package.json         # Project dependencies
└── README.md            # This file
```

## Project Overview

Polban is a powerful financial management application with full RTL support for Persian, Arabic, English, and Turkish. This landing page provides an introduction to the app's features and functionality.

## Key Features

- Responsive design that works on mobile and desktop
- Light/dark theme toggle with system preference detection
- Multilingual support with RTL layout for Persian and Arabic
- Typing animation in the hero section
- Gallery with app screenshots
- Contact form
- Blog section

## Development

To run the project locally, simply open `index.html` in a web browser.

For image optimization, run:
```bash
npm run convert
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome for icons
- Google Fonts (Vazirmatn, IRANSansX)

## Deployment

This is a static site that can be deployed to any web hosting service that supports static files.

### GitHub Deployment

To deploy to GitHub Pages:

1. Run the deployment script:
   ```powershell
   .\deploy_to_github.ps1
   ```
2. Follow the prompts to enter your GitHub username and desired repository name.
3. The script will automatically initialize the repository (if needed), set up the remote, and push the code.

Alternatively, you can manually deploy by:

1. Creating a new repository on GitHub
2. Adding the remote origin:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```
3. Pushing the code:
   ```bash
   git push -u origin main
   ```

### GitHub Pages Setup

After pushing to GitHub:

1. Go to your repository settings
2. Scroll down to the "Pages" section
3. Under "Source", select the "main" branch
4. Click "Save"
5. Your site will be available at `https://yourusername.github.io/your-repo-name/`