# Telepro Chrome Extension

Professional teleprompter Chrome extension that works on any website. This extension allows you to display and control a teleprompter overlay on any webpage.

## Features

- **Floating Teleprompter Overlay**: Display scrolling text overlay on any webpage
- **Customizable Settings**: Adjust scroll speed, font size, colors, and more
- **Keyboard Shortcuts**: Quick controls for pausing, speed adjustment, and toggling
- **Text Extraction**: Auto-extract text from webpages for teleprompter use
- **Cross-Platform**: Works on any website
- **Real-time Controls**: Pause, resume, and adjust speed on the fly

## Installation (Development)

1. Clone or download this extension
2. Open Chrome/Edge and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the `extension/` folder
5. The Telepro extension icon should appear in your browser toolbar

## Usage

1. Click the Telepro icon in your browser toolbar to open the popup
2. Enter your teleprompter text or extract text from the current page
3. Click "Enable Teleprompter" to start
4. Use the controls to adjust speed, pause, or close the teleprompter

## Keyboard Shortcuts

- **Ctrl+Shift+P**: Toggle teleprompter overlay
- **Ctrl+Shift+R**: Start/stop recording mode
- **Space**: Pause/resume scrolling
- **Escape**: Close teleprompter
- **Arrow Up/Down**: Adjust scroll speed

## Development

The extension consists of:

- `manifest.json` - Extension configuration
- `src/background/worker.js` - Background service worker
- `src/content/teleprompter.js` - Content script for overlay
- `src/popup/` - Popup UI and controls
- `src/options/` - Options page for settings

## Building

No build process required - this is a vanilla JavaScript Chrome extension.

## License

Proprietary - All rights reserved.