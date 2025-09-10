import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import qr from 'qr-image';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to generate QR code
app.post('/api/generate-qr', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate QR code in different formats
    const formats = ['png', 'svg', 'eps', 'pdf'];
    const results = {};

    for (const format of formats) {
      try {
        const qrCode = qr.image(url, { type: format });
        const filename = `qr_code_${Date.now()}.${format}`;
        const filepath = path.join(__dirname, 'public', 'downloads', filename);
        
        // Ensure downloads directory exists
        const downloadsDir = path.join(__dirname, 'public', 'downloads');
        if (!fs.existsSync(downloadsDir)) {
          fs.mkdirSync(downloadsDir, { recursive: true });
        }

        // Save the file
        const writeStream = fs.createWriteStream(filepath);
        qrCode.pipe(writeStream);

        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        results[format] = {
          filename,
          downloadUrl: `/downloads/${filename}`,
          size: fs.statSync(filepath).size
        };
      } catch (error) {
        console.error(`Error generating ${format} format:`, error);
        results[format] = { error: `Failed to generate ${format} format` };
      }
    }

    // Generate base64 PNG for preview
    const previewQr = qr.image(url, { type: 'png' });
    const chunks = [];
    previewQr.on('data', chunk => chunks.push(chunk));
    
    const previewBase64 = await new Promise((resolve) => {
      previewQr.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString('base64'));
      });
    });

    res.json({
      success: true,
      url,
      preview: `data:image/png;base64,${previewBase64}`,
      downloads: results
    });

  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve download files
app.get('/downloads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'public', 'downloads', filename);
  
  if (fs.existsSync(filepath)) {
    res.download(filepath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Clean up old files (run every hour)
setInterval(() => {
  const downloadsDir = path.join(__dirname, 'public', 'downloads');
  if (fs.existsSync(downloadsDir)) {
    const files = fs.readdirSync(downloadsDir);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    files.forEach(file => {
      const filepath = path.join(downloadsDir, file);
      const stats = fs.statSync(filepath);
      if (now - stats.mtime.getTime() > oneHour) {
        fs.unlinkSync(filepath);
      }
    });
  }
}, 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`🚀 Noumanic QR Code Generator running on http://localhost:${PORT}`);
  console.log(`📱 Open your browser and start generating QR codes!`);
});
