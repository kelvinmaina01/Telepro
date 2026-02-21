#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking extension paths...\n');

const extensionDir = __dirname;

// Current manifest
const manifest = {
  "manifest_version": 3,
  "name": "Telepro Teleprompter",
  "version": "1.0.0",
  "description": "Professional teleprompter for video recording and presentations",
  "permissions": ["storage", "activeTab", "scripting"],
  "host_permissions": ["<all_urls>"],
  "action": {
    "default_popup": "src/popup/index.html",
    "default_title": "Telepro Teleprompter"
  },
  "background": {
    "service_worker": "src/background/worker.js"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["src/content/teleprompter.js"],
    "css": ["src/content/teleprompter.css"],
    "run_at": "document_idle"
  }],
  "icons": {
    "16": "public/icons/icon16.png",
    "48": "public/icons/icon48.png",
    "128": "public/icons/icon128.png"
  }
};

// Check each path
console.log('📁 Checking manifest paths:');

// 1. Popup
const popupPath = path.join(extensionDir, manifest.action.default_popup);
console.log(`\n1. Popup (${manifest.action.default_popup}):`);
if (fs.existsSync(popupPath)) {
  console.log('   ✅ EXISTS');
} else {
  console.log('   ❌ MISSING');
  console.log('   Available files in src/popup/:');
  try {
    const files = fs.readdirSync(path.join(extensionDir, 'src/popup'));
    files.forEach(f => console.log(`     - ${f}`));
  } catch (e) {
    console.log('     No popup directory found');
  }
}

// 2. Background worker
const bgPath = path.join(extensionDir, manifest.background.service_worker);
console.log(`\n2. Background worker (${manifest.background.service_worker}):`);
if (fs.existsSync(bgPath)) {
  console.log('   ✅ EXISTS');
} else {
  console.log('   ❌ MISSING');
}

// 3. Content scripts
console.log('\n3. Content scripts:');
manifest.content_scripts[0].js.forEach(js => {
  const jsPath = path.join(extensionDir, js);
  console.log(`   JS (${js}): ${fs.existsSync(jsPath) ? '✅ EXISTS' : '❌ MISSING'}`);
});

manifest.content_scripts[0].css.forEach(css => {
  const cssPath = path.join(extensionDir, css);
  console.log(`   CSS (${css}): ${fs.existsSync(cssPath) ? '✅ EXISTS' : '❌ MISSING'}`);
});

// 4. Icons
console.log('\n4. Icons:');
Object.entries(manifest.icons).forEach(([size, iconPath]) => {
  const fullPath = path.join(extensionDir, iconPath);
  console.log(`   ${size}x${size} (${iconPath}): ${fs.existsSync(fullPath) ? '✅ EXISTS' : '❌ MISSING'}`);
});

// 5. Check for other important files that might be missing
console.log('\n5. Other important files:');
const otherFiles = [
  'src/options/index.html',
  'src/content/overlay.html',
  'src/content/overlay.js'
];

otherFiles.forEach(file => {
  const fullPath = path.join(extensionDir, file);
  console.log(`   ${file}: ${fs.existsSync(fullPath) ? '✅ EXISTS' : '❌ MISSING'}`);
});

// 6. Directory structure
console.log('\n6. Directory structure:');
const dirs = [
  'src',
  'src/background',
  'src/content',
  'src/popup',
  'src/options',
  'public',
  'public/icons'
];

dirs.forEach(dir => {
  const dirPath = path.join(extensionDir, dir);
  console.log(`   ${dir}/: ${fs.existsSync(dirPath) ? '✅ EXISTS' : '❌ MISSING'}`);
});

console.log('\n📋 Summary of issues:');
let hasIssues = false;

// Check icons (they're .txt files, not .png)
Object.entries(manifest.icons).forEach(([size, iconPath]) => {
  const fullPath = path.join(extensionDir, iconPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`   ❌ Icon ${iconPath} is missing (needs .png file)`);
    hasIssues = true;
  } else if (iconPath.endsWith('.txt')) {
    console.log(`   ⚠️  Icon ${iconPath} is a .txt file, should be .png`);
    hasIssues = true;
  }
});

if (!hasIssues) {
  console.log('   ✅ No major issues found!');
}

console.log('\n🚀 To fix:');
console.log('   1. Convert icon .txt files to .png (16x16, 48x48, 128x128)');
console.log('   2. Load extension in Chrome: chrome://extensions/');
console.log('   3. Enable Developer mode → Load unpacked → Select extension folder');