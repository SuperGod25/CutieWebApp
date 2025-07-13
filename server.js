import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import multer from 'multer';

dotenv.config();
console.log("✅ ENV GMAIL_USER:", process.env.GMAIL_USER);

const app = express();
app.use(cors()); // ✅ Allow cross-origin in dev
app.use(express.json({ limit: '200mb' })); // or '5mb', depending on your needs
 // ✅ Parse JSON bodies

// === Reservation Confirmation Email ===
app.post('/api/send-reservation-email', async (req, res) => {
  const data = req.body;

  const getReservationTypeText = (type) => {
    switch (type) {
      case 'table': return 'Rezervare masă';
      case 'flowers': return 'Rezervare flori';
      case 'space': return 'Rezervare spațiu';
      case 'community-event': return 'Pachet eveniment comunitar';
      case 'corporate-event': return 'Pachet team building corporativ';
      case 'photo-session': return 'Sesiune foto instant';
      default: return 'Rezervare';
    }
  };

  let subject = '';
  let body = '';

  if (data.type === 'decline') {
    subject = 'Rezervarea ta nu a fost acceptată';
    body = `Salut, ${data.name}!\n\nNe pare rău, dar rezervarea ta nu a putut fi acceptată.\n\nMotivul:\n${data.reason}\n\nTe încurajăm să încerci din nou.\n\nEchipa Cutie ❤️`;
  } else if (data.type === 'event') {
    subject = `Confirmare înregistrare - ${data.eventTitle}`;
    body = `Salut, ${data.name}!\n\nMulțumim pentru înregistrarea la evenimentul "${data.eventTitle}"!\n\nEchipa Cutie ❤️`;
  } else if (data.type === 'reservation') {
    subject = `Confirmare rezervare ${data.reservation_date}`;
    body = `Salut, ${data.name}!\n\nRezervarea ta pentru ${data.reservation_date} ora ${data.reservation_time} a fost confirmată.\n\nEchipa Cutie ❤️`;
  } else {
    return res.status(400).json({ success: false, error: 'Invalid email type' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Cutie" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject,
      text: body
    });

    console.log('✅ Confirmare trimisă către', data.email);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Eroare trimitere:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// === Newsletter Sending ===
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,     // max file size (20MB)
    fieldSize: 5 * 1024 * 1024      // max field size for HTML/message (5MB)
  }
});


app.post('/api/send-newsletter', upload.array('attachments'), async (req, res) => {
  try {
    const { subject, message, recipients } = req.body;
    let html = message;

    if (!subject || !message || !recipients) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    let parsedRecipients;
    try {
      parsedRecipients = JSON.parse(recipients);
    } catch (e) {
      return res.status(400).json({ success: false, error: 'Invalid recipients format' });
    }

    const files = req.files || [];

    // Extract base64 images from <img> tags
    const cidAttachments = [];
    const imgRegex = /<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g;
    let match;
    let imgIndex = 0;

    while ((match = imgRegex.exec(html)) !== null) {
      const base64 = match[1];
      const mimeMatch = base64.match(/^data:(image\/[^;]+);base64,/);
      if (!mimeMatch) continue;

      const mimeType = mimeMatch[1];
      const ext = mimeType.split('/')[1];
      const content = Buffer.from(base64.split(',')[1], 'base64');
      const cid = `inline-img-${imgIndex++}@cutie.dev`;

      html = html.replace(base64, `cid:${cid}`);

      cidAttachments.push({
        filename: `image-${imgIndex}.${ext}`,
        content,
        contentType: mimeType,
        cid
      });
    }

    // File attachments
    const uploadedFiles = files.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype
    }));

    // Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    for (const email of parsedRecipients) {
      await transporter.sendMail({
        from: `"Cutie" <${process.env.GMAIL_USER}>`,
        to: email,
        subject,
        html,
        attachments: [...cidAttachments, ...uploadedFiles]
      });
    }

    console.log(`✅ Newsletter sent to ${parsedRecipients.length} recipients`);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


// === Serve Frontend ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  console.log("✅ Serving static files from:", distPath);
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.warn("⚠️  Skipping static file serving: 'dist/' folder not found.");
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
