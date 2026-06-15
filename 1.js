const sharp = require('sharp');   // Sharp library to handle image processing
const path = require('path');     // Path module to handle file paths and extensions

// Input image path (Replace with the actual path to your image)
const inputImagePath = '/Users/sameta/shubhshree-portfolio/assets/Aurko_s Museum Adventure/6 copy.jpg';

// Function to convert the image to PNG and save it with the same name, but with a .png extension
function convertToPNG(inputPath) {
    // Generate the output image path by replacing the original file extension with '.png'
    const outputImagePath = inputPath.replace(path.extname(inputPath), '.png');
    
    // Processing the image using sharp
    sharp(inputPath)
        .toFormat('png')  // Convert the image to PNG format (lossless)
        .resize({         // Optionally, resize to ensure it maintains sharpness
            width: 1920,   // Max width (you can adjust this based on your needs)
            height: 1080,  // Max height (you can adjust this based on your needs)
            fit: sharp.fit.inside,  // Ensures image maintains aspect ratio and doesn't stretch
            withoutEnlargement: true,  // Prevent enlargement of smaller images
        })
        .png({
            compressionLevel: 9,    // Maximum compression to retain clarity
            adaptiveFiltering: true,  // Uses adaptive filtering to optimize compression without losing quality
            quality: 100            // Ensures lossless quality
        })
        .toFile(outputImagePath, (err, info) => {  // Write the converted image to the output path
            if (err) {  // If an error occurs during conversion
                console.error('Error during image conversion:', err);
            } else {  // If conversion is successful
                console.log(`Image successfully converted and saved at: ${outputImagePath}`);
                console.log('Image details:', info); // Logs additional info like size, format, etc.
            }
        });
}

// Call the function with the input image path
convertToPNG(inputImagePath);
