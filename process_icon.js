const sharp = require('sharp');
const path = require('path');

async function processIcon() {
  const inputPath = path.join(__dirname, 'icon-cv.png');
  const outputPath = path.join(__dirname, 'src', 'app', 'icon.png');
  const size = 512;
  const logoSize = 420; // Zoomed in to 420px out of 512px

  try {
    // Read the logo, resize it
    const logoBuffer = await sharp(inputPath)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    // Create a black circular background
    const circleSvg = `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="black" />
    </svg>`;

    // Composite logo over the black circle
    await sharp(Buffer.from(circleSvg))
      .composite([
        {
          input: logoBuffer,
          gravity: 'center'
        }
      ])
      .png()
      .toFile(outputPath);

    console.log('Icon successfully processed and saved to src/app/icon.png');
  } catch (err) {
    console.error('Error processing icon:', err);
  }
}

processIcon();
