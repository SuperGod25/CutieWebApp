import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
console.log("✅ ENV GMAIL_USER:", process.env.GMAIL_USER);

const app = express();
app.use(express.json());

// === EMAIL ROUTE ===
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

  const templates = {
    reservationConfirmation: {
      subject: (date) => `Confirmare rezervare ${date}`,
      body: (data) => `
Salut, ${data.name}!

Mulțumim și confirmăm rezervarea din data de ${data.reservation_date} la ora ${data.reservation_time} pentru ${data.party_size || '1'} ${data.party_size === '1' ? 'persoană' : 'persoane'} la noi la locație.

Detalii rezervare:
- Tip rezervare: ${getReservationTypeText(data.reservation_type)}
- Data: ${data.reservation_date}
- Ora: ${data.reservation_time}
${data.party_size ? `- Număr persoane: ${data.party_size}` : ''}
${data.special_requests ? `- Cerințe speciale: ${data.special_requests}` : ''}

Te așteptăm cu drag!

O zi minunată!

Echipa Cutie ❤️

---
cutie - florărie, cafenea și comunitate
Strada Comunității 123, Cluj-Napoca
Telefon: +40 264 123 456
Email: cutie.cafea@gmail.com
      `
    },
    eventRegistration: {
      subject: (title) => `Confirmare înregistrare - ${title}`,
      body: (data) => `
Salut, ${data.name}!

Mulțumim pentru înregistrarea la evenimentul "${data.eventTitle}"!

Te-ai înregistrat cu succes și îți rezervăm un loc. Vei primi mai multe detalii cu câteva zile înainte de eveniment.

Te așteptăm cu drag!

Echipa Cutie ❤️

---
cutie - florărie, cafenea și comunitate
Strada Comunității 123, Cluj-Napoca
Telefon: +40 264 123 456
Email: cutie.cafea@gmail.com
      `
    }
  };

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const isEvent = data.type === 'event';
    const subject = isEvent
      ? templates.eventRegistration.subject(data.eventTitle)
      : templates.reservationConfirmation.subject(data.reservation_date);

    const body = isEvent
      ? templates.eventRegistration.body(data)
      : templates.reservationConfirmation.body(data);

    const mailOptions = {
      from: `"Cutie" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject,
      text: body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email trimis:', info.response);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Eroare la trimitere email:', error.message, error.response || '');
    res.status(500).json({ success: false, error: error.message });
  }
});

// === STATIC FRONTEND ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';

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


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// === START SERVER ===
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
