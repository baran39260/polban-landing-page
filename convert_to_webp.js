const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to convert images to WebP
async function convertToWebP() {
  const imagesDir = path.join(__dirname, 'assets', 'images');
  
  // Check if the images directory exists
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory ${imagesDir} does not exist. Please create it and add images.`);
    return;
  }
  
  // Read all files in the images directory
  const files = fs.readdirSync(imagesDir);
  
  // Filter for image files
  const imageFiles = files.filter(file => 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.jpeg') || 
    file.toLowerCase().endsWith('.png')
  );
  
  // Check if any images were found
  if (imageFiles.length === 0) {
    console.log(`No images found in ${imagesDir}. Please export images from PSD first.`);
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to convert`);
  
  let totalInputSize = 0;
  let totalOutputSize = 0;
  let totalOutputs = 0;
  
  for (const file of imageFiles) {
    const basename = path.parse(file).name;
    const inputPath = path.join(imagesDir, file);
    
    // Get metadata for dimensions and input size
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;
    const inputSize = fs.statSync(inputPath).size;
    totalInputSize += inputSize;
    
    console.log(`Converting ${file} to WebP...`);
    
    const outputFileName = basename + '.webp';
    const outputPath = path.join(imagesDir, outputFileName);
    
    let outputSize;
    if (fs.existsSync(outputPath)) {
      outputSize = fs.statSync(outputPath).size;
      console.log(`Skipping ${file} - WebP version already exists (${(outputSize / 1024).toFixed(0)} KB)`);
    } else {
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        outputSize = fs.statSync(outputPath).size;
        const percent = ((1 - outputSize / inputSize) * 100).toFixed(0);
        console.log(`  ✓ ${outputFileName} (${width}×${height}) - ${(inputSize / 1024).toFixed(0)} KB → ${(outputSize / 1024).toFixed(0)} KB (${percent}% smaller)`);
      } catch (error) {
        console.error(`Failed to convert ${file}:`, error.message);
        continue;
      }
    }
    totalOutputSize += outputSize;
    totalOutputs++;
    
    // Generate responsive variants for gallery images
    if (file.startsWith('gallery-')) {
      // Medium variant (720x1560)
      const mediumPath = path.join(imagesDir, basename + '_medium.webp');
      if (!fs.existsSync(mediumPath)) {
        try {
          await sharp(inputPath)
            .resize(720, 1560, { fit: 'contain' })
            .webp({ quality: 80 })
            .toFile(mediumPath);
          const size = fs.statSync(mediumPath).size;
          totalOutputSize += size;
          totalOutputs++;
          console.log(`  ✓ ${basename}_medium.webp (720×1560) - ${(size / 1024).toFixed(0)} KB`);
        } catch (error) {
          console.error(`Failed to create medium variant for ${file}:`, error.message);
        }
      }
      
      // Thumb WebP variant (360x780)
      const thumbPath = path.join(imagesDir, basename + '_thumb.webp');
      if (!fs.existsSync(thumbPath)) {
        try {
          await sharp(inputPath)
            .resize(360, 780, { fit: 'contain' })
            .webp({ quality: 80 })
            .toFile(thumbPath);
          const size = fs.statSync(thumbPath).size;
          totalOutputSize += size;
          totalOutputs++;
          console.log(`  ✓ ${basename}_thumb.webp (360×780) - ${(size / 1024).toFixed(0)} KB`);
        } catch (error) {
          console.error(`Failed to create thumb WebP variant for ${file}:`, error.message);
        }
      }
      
      // Thumb JPG fallback (360x780)
      const thumbJPGPath = path.join(imagesDir, basename + '_thumb.jpg');
      if (!fs.existsSync(thumbJPGPath)) {
        try {
          await sharp(inputPath)
            .resize(360, 780, { fit: 'contain' })
            .jpeg({ quality: 80 })
            .toFile(thumbJPGPath);
          const size = fs.statSync(thumbJPGPath).size;
          totalOutputSize += size;
          totalOutputs++;
          console.log(`  ✓ ${basename}_thumb.jpg (360×780) - ${(size / 1024).toFixed(0)} KB`);
        } catch (error) {
          console.error(`Failed to create thumb JPG fallback for ${file}:`, error.message);
        }
      }
    }
  }
  
  console.log('Image conversion complete!');
  console.log(`Total: ${imageFiles.length} source images → ${totalOutputs} output files`);
  const totalReductionPercent = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(0);
  console.log(`Total size reduction: ${(totalInputSize / 1024 / 1024).toFixed(1)} MB → ${(totalOutputSize / 1024 / 1024).toFixed(1)} MB (${totalReductionPercent}% smaller)`);
}

// Run the conversion
convertToWebP().catch(console.error);
