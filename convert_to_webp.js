const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to convert images to WebP
async function convertToWebP() {
  const imagesDir = path.join(__dirname, 'assets', 'images');
  
  // Read all files in the images directory
  const files = fs.readdirSync(imagesDir);
  
  // Filter for image files
  const imageFiles = files.filter(file => 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.jpeg') || 
    file.toLowerCase().endsWith('.png')
  );
  
  console.log(`Found ${imageFiles.length} images to convert`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputFileName = path.parse(file).name + '.webp';
    const outputPath = path.join(imagesDir, outputFileName);
    
    // Check if WebP version already exists
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${file} - WebP version already exists`);
      continue;
    }
    
    try {
      console.log(`Converting ${file} to WebP...`);
      
      // Convert to WebP with 80% quality
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Successfully converted ${file} to ${outputFileName}`);
    } catch (error) {
      console.error(`Failed to convert ${file}:`, error.message);
    }
  }
  
  console.log('Image conversion complete!');
}

// Run the conversion
convertToWebP().catch(console.error);