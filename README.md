# telepro

**the world's most elegant teleprompter designed for creators, executives, and professional speakers.**

telepro is a premium, web-based teleprompter application featuring real-time video recording, pixel-perfect scrolling controls, customizable script themes, and a minimalist black-and-white aesthetic. built with next.js 16, react 19, and typescript for maximum performance and reliability.

🌐 **live demo**: [telepro.harda.dev](https://telepro.harda.dev)

---

## ✨ features

### 🎥 professional recording
- **studio-quality capture** - record video with audio directly in your browser.
- **smart review** - zero-latency review step to preview recordings before downloading.
- **multi-source feed** - support for standard webcams, dslrs, and virtual cameras like obs.

### 📝 precise scripting
- **pixel-perfect scrolling** - fine-tune scroll speed and font size with absolute accuracy.
- **mirror & reverse** - full support for hardware prompter mirrors and bidirectional scrolling.
- **countdown timer** - adjustable countdown and frame guides for perfect takes.

### 🎨 premium experience
- **minimalist design** - a clean, lowercase aesthetic that gets out of your way.
- **no account needed** - start presenting instantly; your scripts stay private in your browser.
- **responsive & fast** - optimized for performance on desktop and mobile devices.

---

## 🚀 getting started

### prerequisites
- node.js 18+
- npm or yarn

### installation

```bash
# clone the repository
git clone https://github.com/hardaistee/cueflow.git

# navigate to project directory
cd telepro

# install dependencies
npm install

# run development server
npm run dev
```

open [http://localhost:3000](http://localhost:3000) to view the marketing site. the prompter app is available at `/prompter`.

### build for production

```bash
npm run build
npm start
```

---

## 🛠️ tech stack

| technology | purpose |
|------------|---------|
| **next.js 16** | react framework with turbopack |
| **react 19** | modern ui library |
| **typescript** | industrial-grade type safety |
| **tailwind css** | utility-first styling |
| **poppins** | primary branding typography |

---

## 📁 project structure

```
src/
├── app/
│   ├── layout.tsx      # root layout + seo & favicon
│   ├── page.tsx        # marketing landing page
│   ├── prompter/       # dedicated prompter application
│   └── legal/          # privacy & terms content
└── components/
    ├── landing/        # marketing site components
    └── prompter/       # logic-heavy prompter layers
```

---

## 📄 legal & support

- **privacy & terms**: available on the [legal page](https://telepro.harda.dev/legal).
- **support**: report any issues to [reportaproblem.telepro@gmail.com](mailto:reportaproblem.telepro@gmail.com).

---

## 📄 license

mit license - feel free to use this project for personal or commercial purposes.
