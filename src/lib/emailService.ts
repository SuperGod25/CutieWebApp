// src/lib/emailService.ts
import axios from 'axios';

export const sendConfirmationEmail = async (reservationData: {
  name: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  reservation_type: string;
  party_size?: string;
  special_requests?: string;
  type?: string;
}) => {
  try {
    const res = await axios.post('/api/send-reservation-email', {
      ...reservationData,
      type: 'reservation' // explicitly mark type
    });
    return res.data;
  } catch (err) {
    console.error('❌ Eroare la trimiterea emailului de confirmare:', err);
    return { success: false };
  }
};

export const sendDeclineEmail = async (data: { email: string; name: string; reason: string }) => {
  try {
    const res = await axios.post('/api/send-reservation-email', {
      ...data,
      type: 'decline'
    });
    return res.data;
  } catch (err) {
    console.error('❌ Eroare la email de refuz:', err);
    return { success: false };
  }
};
