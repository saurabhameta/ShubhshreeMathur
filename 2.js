const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const targetDir = path.resolve(__dirname, "/Users/sameta/shubhshree-portfolio/assets/"); // Update this to your image folder

function convertToWebP(filePath) {
  const { dir, name } = path.parse(filePath);
  const outputFilePath = path.join(dir, `${name}.webp`);

  sharp(filePath)
    .webp({
      quality: 95,
      effort: 6,
      lossless: false
    })
    .toFile(outputFilePath)
    .then(() => {
      console.log(`✅ Converted: ${filePath} → ${outputFilePath}`);
    })
    .catch(err => {
      console.error(`❌ Error converting ${filePath}:`, err);
    });
}

function walkAndConvert(folderPath) {
  fs.readdir(folderPath, { withFileTypes: true }, (err, items) => {
    if (err) {
      console.error("Error reading folder:", folderPath, err);
      return;
    }

    items.forEach(item => {
      const fullPath = path.join(folderPath, item.name);

      if (item.isDirectory()) {
        walkAndConvert(fullPath); // Recursive call
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (ext === ".jpg" || ext === ".jpeg") {
          convertToWebP(fullPath);
        }
      }
    });
  });
}

// Start the conversion
walkAndConvert(targetDir);
