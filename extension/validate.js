#!/usr/bin/env node

/**
 * Validate Chrome Extension Structure
 * This script checks if all required files exist and paths are correct
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Telepro Chrome Extension...\n');

const extensionDir = __dirname;
const manifestPath = path.join(extensionDir, 'manifest.json');

// Check if manifest exists
if (!fs.existsSync(manifestPath)) {
  console.error('❌ manifest.json not found!');
  process.exit(1);
}

console.log('✅ manifest.json exists');

// Read and validate manifest
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log('✅ manifest.json is valid JSON');
  
  // Check required fields
  const requiredFields = ['manifest_version', 'name', 'version', 'description'];
  for (const field of requiredFields) {
    if (!manifest[field]) {
      console.error(`❌ Missing required field: ${field}`);
    } else {
      console.log(`✅ ${field}: ${manifest[field]}`);
    }
  }
  
  // Check file paths
  const pathsToCheck = [
    { field: 'action.default_popup', path: manifest.action?.default_popup },
    { field: 'background.service_worker', path: manifest.background?.service_worker },
    { field: 'options_page', path: manifest.options_page }
  ];
  
  for (const { field, path: filePath } of pathsToCheck) {
    if (!filePath) {
      console.error(`❌ ${field} not specified in manifest`);
    } else if (!fs.existsSync(path.join(extensionDir, filePath))) {
      console.error(`❌ ${field}: ${filePath} not found`);
    } else {
      console.log(`✅ ${field}: ${filePath} exists`);
    }
  }
  
  // Check content scripts
  if (manifest.content_scripts && manifest.content_scripts.length > 0) {
    const cs = manifest.content_scripts[0];
    if (cs.js) {
      for (const jsFile of cs.js) {
        const jsPath = path.join(extensionDir, jsFile);
        if (!fs.existsSync(jsPath)) {
          console.error(`❌ Content script not found: ${jsFile}`);
        } else {
          console.log(`✅ Content script: ${jsFile} exists`);
        }
      }
    }
    if (cs.css) {
      for (const cssFile of cs.css) {
        const cssPath = path.join(extensionDir, cssFile);
        if (!fs.existsSync(cssPath)) {
          console.error(`❌ Content CSS not found: ${cssFile}`);
        } else {
          console.log(`✅ Content CSS: ${cssFile} exists`);
        }
      }
    }
  }
  
  console.log('\n📁 Checking directory structure...');
  
  // Check required directories
  const requiredDirs = [
    'src/background',
    'src/content', 
    'src/popup',
    'src/options',
    'public/icons'
  ];
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(extensionDir, dir);
    if (!fs.existsSync(dirPath)) {
      console.error(`❌ Directory missing: ${dir}`);
    } else {
      console.log(`✅ Directory exists: ${dir}`);
    }
  }
  
  console.log('\n🎯 Manifest Summary:');
  console.log(`   Name: ${manifest.name}`);
  console.log(`   Version: ${manifest.version}`);
  console.log(`   Description: ${manifest.description}`);
  console.log(`   Permissions: ${manifest.permissions?.join(', ') || 'none'}`);
  
  console.log('\n✅ Validation complete!');
  console.log('\n🚀 To load extension in Chrome:');
  console.log('   1. Open chrome://extensions/');
  console.log('   2. Enable "Developer mode"');
  console.log('   3. Click "Load unpacked"');
  console.log('   4. Select the "extension" folder');
  
} catch (error) {
  console.error('❌ Error reading manifest:', error.message);
  process.exit(1);
}