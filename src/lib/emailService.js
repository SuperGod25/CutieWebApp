import nodemailer from 'nodemailer';

const getReservationTypeText = (type) => {
  switch (type) {
    case 'table': return 'Rezervare masă';
    case 'flowers': return 'Rezervare flori';
    case 'space': return 'Rezervare spațiu';
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
    subject: (eventTitle) => `Confirmare înregistrare - ${eventTitle}`,
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
Email: salut@cutie.ro
    `
  }
};

// Email sending logic using Gmail SMTP and Nodemailer
export const sendConfirmationEmail = async (reservationData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cutie.cafea@gmail.com',
      pass: import.meta.env.VITE_GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: '"Cutie" <cutie.cafea@gmail.com>',
    to: reservationData.email,
    subject: templates.reservationConfirmation.subject(reservationData.reservation_date),
    text: templates.reservationConfirmation.body(reservationData)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email trimis:', info.response);
    return { success: true, message: 'Email trimis cu succes' };
  } catch (error) {
    console.error('Eroare email:', error);
    return { success: false, error: 'Eroare la trimiterea emailului' };
  }
};
