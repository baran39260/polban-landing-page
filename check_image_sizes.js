const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to get image dimensions
async function getImageDimensions() {
  const imagesDir = path.join(__dirname, 'images');
  
  // Gallery images
  const galleryImages = [
    'gallery-1.webp',
    'gallery-2.webp',
    'gallery-3.webp',
    'gallery-4.webp',
    'gallery-5.webp',
    'gallery-6.webp'
  ];
  
  console.log('Gallery Image Dimensions:');
  console.log('========================');
  
  for (const file of galleryImages) {
    const imagePath = path.join(imagesDir, file);
    
    try {
      const metadata = await sharp(imagePath).metadata();
      console.log(`${file}: ${metadata.width} x ${metadata.height} pixels`);
    } catch (error) {
      console.error(`Failed to get dimensions for ${file}:`, error.message);
    }
  }
}

// Run the function
getImageDimensions().catch(console.error);