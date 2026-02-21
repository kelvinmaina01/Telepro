# TelePro

**The world's most elegant teleprompter designed for creators, executives, and professional speakers.**

TelePro is a premium, web-based teleprompter application featuring real-time video recording, pixel-perfect scrolling controls, customizable script themes, and a minimalist black-and-white aesthetic. Built with Next.js 16, React 19, and TypeScript for maximum performance and reliability.

🌐 **Live Demo**: [telepro.harda.dev](https://telepro.harda.dev)

---

## ✨ Features

### 🎥 Professional Recording Studio
- **Studio-quality capture** - Record video with audio directly in your browser
- **Smart review system** - Zero-latency review step to preview recordings before downloading
- **Multi-source feed** - Support for standard webcams, DSLRs, and virtual cameras like OBS
- **Unlimited recording** - No time limits for free users (up to 30 minutes per recording)

### 📝 Precision Script Control
- **Pixel-perfect scrolling** - Fine-tune scroll speed and font size with absolute accuracy
- **Mirror & reverse modes** - Full support for hardware prompter mirrors and bidirectional scrolling
- **Countdown timer** - Adjustable countdown and frame guides for perfect takes
- **Real-time text editing** - Edit scripts on the fly while recording

### 🎨 Premium User Experience
- **Minimalist design** - Clean, lowercase aesthetic that gets out of your way
- **No account needed** - Start presenting instantly; your scripts stay private in your browser
- **Responsive & fast** - Optimized for performance on desktop and mobile devices
- **Dark mode optimized** - Easy on the eyes during long recording sessions

### 🔧 Advanced Features
- **Camera & audio device selection** - Choose from multiple input sources
- **Text color customization** - Adjust text color for better visibility
- **Recording timer** - Track recording duration in real-time
- **Auto-scroll controls** - Play, pause, and stop with keyboard shortcuts

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser with camera/microphone access

### Installation

```bash
# Clone the repository
git clone https://github.com/hardaistee/telepro.git

# Navigate to project directory
cd telepro

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the marketing site. The prompter app is available at `/prompter`.

### Build for Production

```bash
npm run build
npm start
```

### Development Commands

```bash
# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with Turbopack | 16.1.1 |
| **React** | Modern UI library | 19.0.0 |
| **TypeScript** | Industrial-grade type safety | 5.0.0 |
| **Tailwind CSS** | Utility-first styling | 3.4.0 |
| **Firebase** | Authentication & database | 10.11.0 |
| **Stripe** | Payment processing | 14.20.0 |
| **Poppins** | Primary branding typography | Google Fonts |

---

## 📁 Project Structure

```
telepro/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx         # Root layout + SEO & favicon
│   │   ├── page.tsx           # Marketing landing page
│   │   ├── prompter/          # Dedicated prompter application
│   │   ├── auth/              # Authentication page
│   │   ├── extension/         # Browser extension info
│   │   └── legal/             # Privacy & terms content
│   ├── components/            # React components
│   │   ├── landing/          # Marketing site components
│   │   ├── prompter/         # Logic-heavy prompter layers
│   │   ├── admin/            # Admin dashboard components
│   │   └── context/          # React context providers
│   ├── lib/                  # Utility libraries
│   │   ├── firebase.ts       # Firebase configuration
│   │   ├── firestore.ts      # Firestore database helpers
│   │   └── stripe.ts         # Stripe payment integration
│   └── scripts/              # Utility scripts
├── extension/                # Browser extension
│   ├── src/                 # Extension source code
│   ├── manifest.json        # Extension manifest
│   └── build.js            # Extension build script
├── public/                  # Static assets
└── package.json            # Project dependencies
```

---

## 🔌 Browser Extension

TelePro includes a browser extension that adds teleprompter functionality to any webpage:

### Features
- **Overlay mode** - Add teleprompter overlay to any website
- **Text extraction** - Automatically extract text from web pages
- **Custom styling** - Adjust font size, color, and scrolling speed
- **Cross-browser** - Works on Chrome, Firefox, and Edge

### Installation
1. Navigate to `/extension` in the project
2. Run `npm run build` to build the extension
3. Load the extension in your browser's developer mode

---

## 💰 Pricing & Support

### Free Tier
- **Unlimited recordings** - No limits on recording sessions
- **30-minute recordings** - Download videos up to 30 minutes
- **Basic features** - All core teleprompter functionality
- **No watermarks** - Clean exports without branding

### Pro Tier ($4.99/month or $2.99/month annually)
- **Unlimited recording length** - No time limits on downloads
- **Advanced camera support** - DroidCam and professional camera integration
- **Priority support** - Faster response times
- **Early access** - New features before everyone else

### 🎯 Support the Project
Love TelePro? Help keep it free and support ongoing development!

<div align="center">

[![Support on Ko-fi](https://img.shields.io/badge/Support%20Me%20on-Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white&labelColor=FF5E5B)](https://ko-fi.com/kelvinmaina01)

</div>

**Your support helps:**
- 🚀 Cover server costs and hosting
- ⚡ Fund new features and improvements  
- 🛠️ Support ongoing development and maintenance
- 🆓 Keep TelePro free for everyone

**Why support?**
- ❤️ Directly supports the developer
- 🔄 Faster bug fixes and updates
- 📱 Priority feature requests
- 🎁 Exclusive early access to new features

<div align="center">

### ✨ Animated Support Button Preview ✨

```html
<!-- Floating animated Ko-fi button in the app -->
<div class="floating-kofi-button">
  <a href="https://ko-fi.com/kelvinmaina01" target="_blank">
    <div class="kofi-icon">☕</div>
    <div class="kofi-tooltip">
      <span class="support-text">Support Me on Ko-fi</span>
      <span class="help-text">Help keep TelePro free!</span>
    </div>
  </a>
</div>
```

**Features of our animated button:**
- 🎈 **Floating animation** - Gently moves up and down
- 💫 **Pulse effect** - Subtle attention-grabbing glow
- 🎯 **Always visible tooltip** - Clear "Support Me" message
- 🎨 **Beautiful gradient** - Orange to pink gradient background
- 🔄 **Hover effects** - Scale, rotate, and shadow on hover

</div>

---

## 🔐 Authentication & Security

- **Firebase Authentication** - Secure Google sign-in
- **Browser storage** - Scripts stored locally in your browser
- **No data mining** - We don't sell or share your data
- **GDPR compliant** - Privacy-first design

---

## 📄 API Endpoints

### Webhooks
- `POST /api/webhooks/stripe` - Handle Stripe payment events
- `POST /api/webhooks/retry` - Retry failed webhook deliveries

### Checkout
- `POST /api/checkout` - Create Stripe checkout sessions

---

## 🐛 Troubleshooting

### Common Issues

1. **Camera not working**
   - Ensure camera permissions are granted
   - Try a different browser (Chrome recommended)
   - Check if another app is using the camera

2. **Audio not recording**
   - Check microphone permissions
   - Ensure correct audio device is selected
   - Try headphones with built-in mic

3. **Slow performance**
   - Close other tabs/applications
   - Use hardware acceleration if available
   - Update browser to latest version

### Getting Help
- **Email**: reportaproblem.telepro@gmail.com
- **GitHub Issues**: Create an issue in the repository
- **Community**: Join our Discord (coming soon)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

Copyright (c) 2024 TelePro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Firebase** for authentication and database
- **Stripe** for payment processing
- **Tailwind CSS** for the utility-first approach
- **All contributors** who helped make TelePro better

---

## 📞 Contact

- **Website**: [telepro.harda.dev](https://telepro.harda.dev)
- **Email**: reportaproblem.telepro@gmail.com
- **Support**: [Ko-fi](https://ko-fi.com/kelvinmaina01)
- **GitHub**: [@hardaistee](https://github.com/hardaistee)

---

**TelePro** - The professional's choice for browser-based teleprompting. Record, refine, and deliver perfect presentations every time.

### 🎨 Animated Button CSS Example

Here's the CSS that powers our beautiful animated Ko-fi button:

```css
/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Slow pulse animation */
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

/* Ko-fi button styles */
.floating-kofi-button {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
  animation: float 3s ease-in-out infinite;
}

.kofi-button {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF5E5B 0%, #FF8E8C 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(255, 94, 91, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.kofi-button:hover {
  transform: scale(1.1) rotate(12deg);
  box-shadow: 0 8px 30px rgba(255, 94, 91, 0.5);
  animation: pulse-slow 1s ease-in-out infinite;
}

.kofi-icon {
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
}

.kofi-tooltip {
  position: absolute;
  left: calc(100% + 0.75rem);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  opacity: 1;
  animation: pulse-slow 2s ease-in-out infinite;
}

.support-text {
  color: #FFD166;
  font-weight: bold;
  font-size: 0.875rem;
}

.help-text {
  color: #A0A0A0;
  font-size: 0.75rem;
  display: block;
  margin-top: 0.25rem;
}
```

### 🎬 Live Demo Preview

<div align="center">

| Feature | Preview | Description |
|---------|---------|-------------|
| **Floating Animation** | `↑↓` | Gentle up/down movement |
| **Hover Effects** | `↻✨` | Rotate, scale, and glow |
| **Tooltip** | `💬` | Always visible support message |
| **Gradient** | `🎨` | Beautiful orange-pink gradient |
| **Pulse Effect** | `💓` | Subtle attention-grabbing pulse |

</div>

### 🤝 How Your Support Helps

<div align="center">

| Support Level | What You Get | Impact |
|--------------|--------------|---------|
| **☕ One Coffee** | Our eternal gratitude | Helps cover server costs for a day |
| **🎁 Monthly Supporter** | Priority support + shoutout | Funds ongoing development |
| **🚀 Feature Sponsor** | Name featured in app + early access | Directly funds new features |

</div>

**Ready to support?** Click the button below:

<div align="center">

[![Animated Ko-fi Button](https://img.shields.io/badge/☕_Support_Me_on_Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white&labelColor=FF5E5B&animation=float&label=Click+to+Support)](https://ko-fi.com/kelvinmaina01)

</div>

**Every contribution matters!** Whether it's the price of a coffee or a monthly subscription, your support directly impacts TelePro's future. Thank you for considering supporting this project! ❤️