const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Input image path (e.g., JPG, WebP, or other formats)
const inputImagePath = '/Users/sameta/shubhshree-portfolio/assets/Aurko_s Museum Adventure/6 copy.jpg';

// Function to convert the image to PNG and save it with the same name but .png extension
function convertToPNG(inputPath) {
    // Get the output file path by changing the extension to .png
    const outputImagePath = inputPath.replace(path.extname(inputPath), '.png');

    sharp(inputPath)
        .toFormat('png') // Convert to PNG format
        .removeAlpha()    // Remove any unwanted alpha channels
        .toFile(outputImagePath, (err, info) => {
            if (err) {
                console.error('Error during image conversion:', err);
            } else {
                console.log(`Image converted successfully: ${info}`);
            }
        });
}

// Run the function
convertToPNG(inputImagePath);
