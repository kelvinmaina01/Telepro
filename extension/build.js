#!/usr/bin/env node

/**
 * Simple build script for Telepro Chrome Extension
 * Creates a zip file for Chrome Web Store submission
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Check if archiver is available
try {
  require('archiver');
} catch (e) {
  console.error('Please install archiver: npm install archiver');
  process.exit(1);
}

const extensionDir = __dirname;
const outputFile = path.join(extensionDir, 'telepro-extension.zip');

// Files to exclude from the zip
const excludePatterns = [
  /\.git/,
  /node_modules/,
  /\.DS_Store/,
  /Thumbs\.db/,
  /\.zip$/,
  /build\.js$/,
  /package-lock\.json$/
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => pattern.test(filePath));
}

function createZip() {
  console.log('Creating extension zip file...');
  
  const output = fs.createWriteStream(outputFile);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  output.on('close', () => {
    console.log(`✅ Extension packaged: ${outputFile}`);
    console.log(`📦 Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
    console.log('\nTo install in Chrome:');
    console.log('1. Go to chrome://extensions/');
    console.log('2. Enable "Developer mode"');
    console.log('3. Click "Load unpacked"');
    console.log('4. Select the "extension" folder');
  });

  archive.on('error', (err) => {
    console.error('❌ Error creating zip:', err);
    process.exit(1);
  });

  archive.pipe(output);

  // Add all files from extension directory
  function addDirectory(dir, baseDir = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const relativePath = path.join(baseDir, file);
      
      if (shouldExclude(relativePath)) {
        return;
      }
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        addDirectory(fullPath, relativePath);
      } else {
        console.log(`  Adding: ${relativePath}`);
        archive.file(fullPath, { name: relativePath });
      }
    });
  }

  addDirectory(extensionDir);
  
  archive.finalize();
}

// Run the build
createZip();