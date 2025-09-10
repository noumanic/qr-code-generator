# QR Code Generator

A simple Node.js command-line tool that generates QR codes from URLs in multiple formats.

## Features

- 📱 Generate QR codes from any URL
- 🎨 Multiple output formats: PNG, SVG, EPS, and PDF
- 💾 Saves the original URL in a text file
- ⚡ Fast and lightweight
- 🖥️ Interactive command-line interface

## Installation

1. Clone this repository:
```bash
git clone https://github.com/noumanic/qrcode-generator.git
cd qrcode-generator
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the application:
```bash
node index.js
```

Enter the URL when prompted, and the tool will generate:
- `qr_code.png` - PNG format QR code
- `qr_code.svg` - SVG format QR code  
- `qr_code.eps` - EPS format QR code
- `qr_code.pdf` - PDF format QR code
- `url.txt` - Text file containing the original URL

## Example

```bash
$ node index.js
? Enter the URL to generate its QR Code:  https://github.com/neuralnouman
QR Code saved in PNG, SVG, EPS, and PDF formats.
URL saved to url.txt
```

## Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer) - Interactive command line prompts
- [qr-image](https://www.npmjs.com/package/qr-image) - QR code generation library

## Requirements

- Node.js (version 12 or higher)
- npm

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Nouman** - [@noumanic](https://github.com/neuralnouman)

---

⭐ If you found this project helpful, please give it a star!