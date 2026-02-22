# TelePro - Free Professional Teleprompter & Autocue

**TelePro is a professional teleprompter (autocue) that transforms how you create video content - completely free!**

<div align="center">

## 🎬 Watch TelePro in Action

[![TelePro Demo Video](https://img.youtube.com/vi/7vDr85eVEdI/0.jpg)](https://youtu.be/7vDr85eVEdI)

*Click the image above to watch the demo video*

</div>

## What is TelePro?

**TelePro is a form of a teleprompter and or I would call it an autocue.** An autocue is basically a display device that allows speakers to display or to read script. We explore the TelePro application, focusing on its setup for effective teleprompter practice. This video shows how to prepare a script and adjust text settings, essential for any video script app. It's a great demonstration of how to use a teleprompter for quick build checks and ensuring everything functions as expected.

🌐 **Live Demo**: [[telepro.harda.dev](https://telepro.harda.dev](https://telerepo.netlify.app/prompter))

---

## ✨ Why Choose TelePro?

### 🎯 **Perfect for Everyone**
- **Content Creators** - Record YouTube videos, tutorials, and social media content
- **Educators** - Create lesson videos and online courses
- **Professionals** - Record presentations, pitches, and training materials
- **Public Speakers** - Practice and record speeches with perfect delivery
- **Podcasters** - Add video versions to your audio content

### 🚀 **Key Features**
- **🎥 Camera Integration** - Record directly in your browser with teleprompter overlay
- **📝 Real-time Script Editing** - Edit your script while recording
- **⚡ Smart Controls** - Adjust speed, font size, mirroring, and colors instantly
- **📱 Responsive Design** - Works perfectly on any screen size
- **🔧 No Installation** - Works directly in your browser
- **🎨 Customizable** - Change text colors, fonts, and layouts

### 💰 **Completely Free**
- **No subscriptions** - Use all features without paying
- **No watermarks** - Clean recordings without branding
- **No account needed** - Start using immediately
- **Unlimited recordings** - Record as much as you want

---

## 🎬 How TelePro Works

1. **Paste Your Script** - Copy and paste your script into the editor
2. **Adjust Settings** - Set scroll speed, font size, and text color
3. **Enable Camera** - Turn on your camera (permission required)
4. **Start Recording** - Click play and read your script naturally
5. **Download Video** - Save your recording directly to your device

---

## 🛠️ Quick Start

### Using the Web App
1. Visit [telepro.harda.dev](https://telepro.harda.dev)
2. Click "Try TelePro Now"
3. Allow camera/microphone permissions
4. Start creating!

### Local Development
```bash
# Clone the repository
git clone https://github.com/hardaistee/telepro.git

# Install dependencies
cd telepro
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and navigate to `/prompter` for the teleprompter app.

---

## 🔌 Browser Extension

TelePro also comes as a browser extension that adds teleprompter functionality to any webpage:

### Extension Features
- **Overlay Mode** - Add teleprompter overlay to any website
- **Text Extraction** - Automatically extract text from web pages
- **Custom Styling** - Adjust font size, color, and scrolling speed
- **Cross-Browser** - Works on Chrome, Firefox, and Edge

### Install Extension
1. Navigate to `/extension` in the project
2. Run `npm run build` to build the extension
3. Load the extension in your browser's developer mode

---

## 🎯 Support the Project

Love TelePro? Help keep it free and support ongoing development!

<div align="center">

[![Support on Ko-fi](https://img.shields.io/badge/Support_Me_on_Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white&labelColor=FF5E5B)](https://ko-fi.com/kelvinmaina01)

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

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with Turbopack | 16.1.1 |
| **React** | Modern UI library | 19.0.0 |
| **TypeScript** | Industrial-grade type safety | 5.0.0 |
| **Tailwind CSS** | Utility-first styling | 3.4.0 |
| **Firebase** | Authentication & database | 10.11.0 |

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
│   │   └── context/          # React context providers
│   ├── lib/                  # Utility libraries
│   │   ├── firebase.ts       # Firebase configuration
│   │   ├── firestore.ts      # Firestore database helpers
│   └── scripts/              # Utility scripts
├── extension/                # Browser extension
│   ├── src/                 # Extension source code
│   ├── manifest.json        # Extension manifest
│   └── build.js            # Extension build script
├── public/                  # Static assets
└── package.json            # Project dependencies
```

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
- Update documentation as needed

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

Copyright (c) 2024 TelePro

---

## 🙏 Acknowledgments

- **Next.js team** for the amazing framework
- **Firebase** for authentication and database
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

<div align="center">

### 🎬 Watch the Demo Again

[![TelePro Demo Video](https://img.youtube.com/vi/7vDr85eVEdI/0.jpg)](https://youtu.be/7vDr85eVEdI)

*TelePro in action - See how easy it is to create professional videos!*

</div>
