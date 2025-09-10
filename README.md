# Noumanic QR Code Generator

A modern, user-friendly web application that generates QR codes from URLs in multiple formats. Built with love by **Noumanic** - your trusted tech brand for open-source solutions.

## ✨ Features

### 🌐 **Modern Web Interface**
- 🎨 **Beautiful, Responsive Design** - Works perfectly on all devices
- ⚡ **Interactive Frontend** - Real-time URL validation and instant feedback
- 👀 **Live Preview** - See your QR code before downloading
- 📊 **File Size Info** - Know the size of each format before downloading
- 📱 **Mobile Friendly** - Perfect experience on phones and tablets
- ⌨️ **Keyboard Shortcuts** - Ctrl/Cmd + Enter to generate, Escape to reset
- 📋 **Copy to Clipboard** - One-click URL copying functionality

### 🖥️ **Command Line Interface**
- ⚡ **Quick Generation** - Generate QR codes directly from terminal
- 🎯 **Simple Usage** - Just run `node index.js` and follow prompts
- 📁 **Multiple Formats** - Generate PNG, SVG, EPS, and PDF formats
- 🔧 **Developer Friendly** - Perfect for scripts and automation

### 🎨 **QR Code Generation**
- 📱 **Instant Generation** - Generate QR codes from any URL in seconds
- 🎨 **Multiple Formats** - Download in PNG, SVG, EPS, and PDF formats
- ⚡ **Fast & Lightweight** - Optimized for speed and performance
- 🔒 **Secure** - No data stored, all processing happens locally

## 🚀 Quick Start

### Option 1: Web Interface (Recommended)

1. **Clone and Install:**
```bash
git clone https://github.com/noumanic/qrcode-generator.git
cd qrcode-generator
npm install
```

2. **Start the Server:**
```bash
npm start
```

3. **Open Your Browser:**
Navigate to `http://localhost:3000` and start generating QR codes!

### Option 2: Command Line Interface

For command-line usage and automation:
```bash
node index.js
```

**Command Line Features:**
- Interactive prompts for URL input
- Automatic QR code generation in all formats
- Files saved to current directory
- Perfect for scripts and automation

## 🎯 How to Use

### 🌐 **Web Interface (Recommended)**
1. **Enter URL** - Type or paste any valid URL in the input field
2. **Generate** - Click "Generate QR Code" or press Ctrl/Cmd + Enter
3. **Preview** - See your QR code instantly in the preview section
4. **Download** - Choose your preferred format and download
5. **Share** - Use your QR code anywhere you need it!

### 🖥️ **Command Line Interface**
1. **Run Command** - Execute `node index.js` in your terminal
2. **Enter URL** - Follow the interactive prompts to enter your URL
3. **Generate** - The system automatically generates QR codes in all formats
4. **Find Files** - Check your current directory for the generated files
5. **Use** - All QR code files are ready to use!

## 📁 Supported Formats

| Format | Description | Best For |
|--------|-------------|----------|
| **PNG** | High-quality raster image | Web use, social media, general purpose |
| **SVG** | Scalable vector graphics | Print at any size, web graphics |
| **PDF** | Print-ready document | Professional printing, documents |
| **EPS** | Encapsulated PostScript | Professional printing, design work |

## 🛠️ Technical Details

- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **Backend**: Node.js with Express.js
- **QR Generation**: qr-image library
- **Styling**: Modern CSS with gradients and animations
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)

## 🔧 API Endpoints

### POST `/api/generate-qr`
Generate QR code from URL

**Request:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://example.com",
  "preview": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "downloads": {
    "png": {
      "filename": "qr_code_1234567890.png",
      "downloadUrl": "/downloads/qr_code_1234567890.png",
      "size": 1024
    },
    "svg": { ... },
    "pdf": { ... },
    "eps": { ... }
  }
}
```

## 🌟 Noumanic Brand

This project is proudly developed by **Noumanic** - a tech brand focused on creating open-source solutions that make technology accessible to everyone.

- 🏢 **Company**: Noumanic
- 👨‍💻 **Developer**: Nouman Hafeez
- 🐙 **GitHub**: [@noumanic](https://github.com/noumanic)
- 📧 **Contact**: Available through GitHub

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Thanks to all contributors who help make this project better
- Special thanks to the open-source community for the amazing tools we use
- Built with ❤️ by the Noumanic team

---

⭐ **If you found this project helpful, please give it a star!**

🔗 **Visit our GitHub**: [github.com/noumanic](https://github.com/noumanic)