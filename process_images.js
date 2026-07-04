const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const files = [
  { in: 'bumdes-sirah-deyueh.vercel.app-BUMDES Sirah Dayeuh Menggerakkan Ekonomi Desa-cvscreenshot.png', out: 'bumdes.webp' },
  { in: 'kembang-sereh.vercel.app-Kembang Sereh - Segarkan Harimu Alami Rasanya-cvscreenshot.png', out: 'kembangsereh.webp' },
  { in: 'craftmit.cleoverly.online-Craftmit - Commit Message Generator-cvscreenshot.png', out: 'craftmit.webp' }
];

const outDir = path.join(__dirname, 'public', 'projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function convert() {
  for (const file of files) {
    try {
      await sharp(path.join(__dirname, file.in))
        .webp({ quality: 80 })
        .toFile(path.join(outDir, file.out));
      console.log('Converted', file.out);
      
      // Optionally delete the original file
      fs.unlinkSync(path.join(__dirname, file.in));
    } catch (err) {
      console.error('Failed to convert', file.in, err);
    }
  }
}

convert();
