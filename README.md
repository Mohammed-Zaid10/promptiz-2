# PROMPTIZ — Senior AI Prompt Engineering Suite

An architectural prompt engineering web application that transforms ideas into senior-grade AI directives formatted with authoritative role personas, deep technical specifications, non-negotiable qualities, disclaimers, and actionable invocations.

![PROMPTIZ Logo](public/favicon.svg)

---

## Features

- **Architectural Prompt Generator**: Uses Gemini to engineer structured, senior-level prompts for vision, code, copy, strategy, and video.
- **Monochrome & Curated Themes**: 11 luxury themes (including Warm Alabaster, Chalk Minimal, Nordic Frost, Obsidian Black, Graphite Slate, and more).
- **Custom Handwriting Typography**: Toggle between Editorial, Signature, Handwritten, and Cursive calligraphy styles.
- **Roaming Perimeter Animations**: Interactive perimeter laser beams with dynamic speed acceleration.
- **Server-Side API**: Full-stack Node/Express proxy ensuring reliable API execution both locally and post-deployment.

---

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/promptiz.git
cd promptiz
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Deployment

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

---

## License
MIT
