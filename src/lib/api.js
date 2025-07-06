import { supabase } from './supabase';

export const reservationAPI = {
  testDatabaseConnection: async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('count', { count: 'exact', head: true });

      if (error) throw error;
      return { success: true, message: 'Conexiune reușită' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  createReservation: async (formData) => {
    try {
      console.log('Crearea rezervării cu datele:', formData);

      const reservationData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || null,
        reservation_type: formData.reservationType,
        reservation_date: formData.date,
        reservation_time: formData.time,
        party_size: formData.partySize || null,
        special_requests: formData.specialRequests?.trim() || '',
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('reservations')
        .insert([reservationData])
        .select()
        .single();

      if (error) {
        console.error('Eroare la inserarea în baza de date:', error);
        throw error;
      }

      console.log('Rezervare salvată cu succes:', data);


      return {
  success: true,
  data: data,
  message: 'Mulțumim pentru rezervare!'
};

    } catch (error) {
      console.error('Eroare la crearea rezervării:', error);
      return {
        success: false,
        error: error.message || 'A apărut o eroare la procesarea rezervării'
      };
    }
  }
};

export const eventAPI = {
  registerForEvent: async (eventId, registrationData) => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: eventId,
          name: registrationData.name,
          email: registrationData.email,
          phone: registrationData.phone || null,
          special_requests: registrationData.specialRequests || ''
        }])
        .select()
        .single();

      if (error) throw error;

      const response = await fetch('/api/send-reservation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'event',
          eventTitle: registrationData.eventTitle,
          name: registrationData.name,
          email: registrationData.email
        })
      });

      const emailResult = await response.json();

      return {
        success: true,
        data: data,
        emailSent: emailResult.success
      };
    } catch (error) {
      console.error('Eroare la înregistrarea la eveniment:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export const newsletterAPI = {
  subscribe: async (email) => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.trim().toLowerCase() }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          return {
            success: false,
            error: 'Această adresă de email este deja abonată la newsletter.'
          };
        }
        throw error;
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Eroare la abonarea la newsletter:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};