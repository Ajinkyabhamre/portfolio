/**
 * Favicon Generator Script
 *
 * Generates PNG and ICO favicon files from app/icon.svg
 *
 * Prerequisites:
 *   npm install sharp
 *
 * Usage:
 *   node generate-favicon.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, 'app', 'icon.svg');
const APP_DIR = path.join(__dirname, 'app');

async function generateFavicons() {
  console.log('🎨 Generating favicons from app/icon.svg...\n');

  try {
    // Check if SVG exists
    if (!fs.existsSync(SVG_PATH)) {
      console.error('❌ Error: app/icon.svg not found!');
      process.exit(1);
    }

    const svgBuffer = fs.readFileSync(SVG_PATH);

    // Generate icon.png (512x512) - Main favicon for Next.js
    console.log('📦 Generating app/icon.png (512x512)...');
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(APP_DIR, 'icon.png'));
    console.log('✅ Created app/icon.png\n');

    // Generate apple-icon.png (180x180) - iOS home screen
    console.log('📱 Generating app/apple-icon.png (180x180)...');
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(APP_DIR, 'apple-icon.png'));
    console.log('✅ Created app/apple-icon.png\n');

    // Generate temporary PNGs for ICO conversion
    console.log('🔨 Generating app/favicon.ico (multi-resolution)...');

    const favicon32Buffer = await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toBuffer();

    const favicon16Buffer = await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toBuffer();

    // Write individual favicon sizes
    fs.writeFileSync(path.join(APP_DIR, 'favicon-32x32.png'), favicon32Buffer);
    fs.writeFileSync(path.join(APP_DIR, 'favicon-16x16.png'), favicon16Buffer);

    console.log('✅ Created temporary PNG files for ICO conversion\n');
    console.log('⚠️  Note: ICO file conversion requires additional tools.');
    console.log('    Use ImageMagick or an online converter to create favicon.ico from:');
    console.log('    - app/favicon-32x32.png');
    console.log('    - app/favicon-16x16.png\n');
    console.log('    Command: convert app/favicon-32x32.png app/favicon-16x16.png app/favicon.ico\n');

    console.log('✨ Favicon generation complete!');
    console.log('\nGenerated files:');
    console.log('  ✓ app/icon.png (512x512)');
    console.log('  ✓ app/apple-icon.png (180x180)');
    console.log('  ✓ app/favicon-32x32.png (temporary)');
    console.log('  ✓ app/favicon-16x16.png (temporary)');
    console.log('\nNext.js will automatically detect these files in the app/ directory.');
    console.log('Run: npm run dev to test!\n');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

// Run the generator
generateFavicons();
