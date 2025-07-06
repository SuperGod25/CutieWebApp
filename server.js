import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();
console.log("✅ ENV GMAIL_USER:", process.env.GMAIL_USER);

const app = express();
app.use(express.json());

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
    body = `
Salut, ${data.name}!

Ne pare rău, dar rezervarea ta nu a putut fi acceptată.

Motivul:
${data.reason}

Te încurajăm să încerci din nou sau să ne contactezi pentru alte opțiuni.

Mulțumim pentru înțelegere!

Echipa Cutie ❤️
`;
  } else if (data.type === 'event') {
    subject = `Confirmare înregistrare - ${data.eventTitle}`;
    body = `
Salut, ${data.name}!

Mulțumim pentru înregistrarea la evenimentul "${data.eventTitle}"!

Te-ai înregistrat cu succes și îți rezervăm un loc. Vei primi mai multe detalii cu câteva zile înainte de eveniment.

Te așteptăm cu drag!

Echipa Cutie ❤️
`;
  } else if (data.type === 'reservation') {
    subject = `Confirmare rezervare ${data.reservation_date}`;
    body = `
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
`;
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
    console.error('❌ Eroare email:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


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

app.post('/api/send-newsletter', async (req, res) => {
  const { subject, message, recipients } = req.body;

  if (!subject || !message || !recipients?.length) {
    return res.status(400).json({ success: false, error: 'Date incomplete.' });
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

    for (const email of recipients) {
      await transporter.sendMail({
  from: `"Cutie" <${process.env.GMAIL_USER}>`,
  to: email,
  subject,
  html: message // changed from text → html
});
    }

    console.log(`✅ Newsletter trimis către ${recipients.length} abonați.`);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Eroare newsletter:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
