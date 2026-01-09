# CueFlow

**Free Online Teleprompter with Camera Recording**

A professional web-based teleprompter application with real-time camera recording, adjustable scrolling speed, customizable text, and mirror mode. Built with Next.js 16, React 19, and TypeScript.

🌐 **Live Demo**: [cueflow.harda.dev](https://cueflow.harda.dev)

---

## ✨ Features

- 📝 **Adjustable Scrolling Speed** - Control text scroll speed in real-time
- 🔤 **Customizable Font Size** - Adjust text size for readability
- 🎨 **Text Color Selection** - Choose from preset colors or custom picker
- 🪞 **Mirror Mode** - Flip text horizontally for real teleprompter setups
- 🔄 **Reverse Scroll** - Scroll up or down
- 🎥 **Camera Recording** - Record video with audio directly in browser
- ⏱️ **Countdown Timer** - Configurable countdown before recording
- 📱 **Responsive Design** - Works on desktop and mobile
- 🌙 **Dark Theme** - Easy on the eyes

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hardaistee/cueflow.git

# Navigate to project directory
cd cueflow

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React Framework |
| React | 19.2.3 | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 3.4.19 | Styling |
| Geist Font | - | Typography |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout + SEO metadata
│   ├── page.tsx        # Main page
│   ├── sitemap.ts      # Dynamic sitemap
│   ├── robots.ts       # Robots.txt
│   └── globals.css     # Global styles
└── components/
    └── prompter/
        ├── PrompterContainer.tsx   # Main state management
        ├── ControlPanel.tsx        # UI controls
        ├── TextLayer.tsx           # Scrolling text display
        ├── CameraLayer.tsx         # Camera & recording
        ├── TextEditorModal.tsx     # Script editor
        ├── DeviceSettingsModal.tsx # Camera/mic selection
        └── CountdownOverlay.tsx    # Countdown display
```

---


## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👤 Author

**harda.dev**

- Website: [harda.dev](https://harda.dev)
- GitHub: [@hardaistee](https://github.com/hardaistee)

---

## ☕ Support

If you find this project useful, consider buying me a coffee!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/hardaistee)
