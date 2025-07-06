import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { sendConfirmationEmail, sendDeclineEmail } from '../../lib/emailService';

type Reservation = {
  id: string;
  name: string;
  email: string;
  reservation_type: string;
  reservation_date: string;
  reservation_time: string;
  party_size?: string;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'declined';
};

const ReservationsPanel: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [declineModal, setDeclineModal] = useState<{ open: boolean; id: string | null; email: string; name: string }>({
    open: false,
    id: null,
    email: '',
    name: ''
  });
  const [declineMessage, setDeclineMessage] = useState('');

  const loadReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('status', 'pending') // ✅ Only show unhandled
    .order('created_at', { ascending: false }); // ✅ Sort oldest first

  if (!error) setReservations(data || []);
  setLoading(false);
};


  const updateStatus = async (id: string, status: 'confirmed') => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single();

  if (!data || error) {
    console.error('❌ Eroare la obținerea rezervării pentru email:', error);
    return;
  }

  if (status === 'confirmed') {
    const emailResult = await sendConfirmationEmail({
      name: data.name,
      email: data.email,
      reservation_date: data.reservation_date,
      reservation_time: data.reservation_time,
      reservation_type: data.reservation_type,
      party_size: data.party_size,
      special_requests: data.special_requests,
      type: 'reservation'
    });

    if (!emailResult.success) {
      alert('❌ Eroare la trimiterea emailului de confirmare.');
      return;
    }
  }

  await supabase.from('reservations').update({ status }).eq('id', id);
  await loadReservations();
};


  useEffect(() => {
    loadReservations();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Rezervări</h1>
      <p className="text-sm text-muted-foreground mb-2">
  Rezervările afișate mai jos sunt în așteptare și necesită aprobare.
</p>

      {loading ? (
        <p>Se încarcă rezervările...</p>
      ) : reservations.length === 0 ? (
        <p>Nu există rezervări.</p>
      ) : (
        
        <table className="w-full border text-sm bg-white rounded shadow">
          <thead>
            <tr className="bg-violet-100 text-left">
              <th className="p-3">Nume</th>
              <th className="p-3">Email</th>
              <th className="p-3">Tip</th>
              <th className="p-3">Data</th>
              <th className="p-3">Ora</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-t hover:bg-violet-50">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.reservation_type}</td>
                <td className="p-3">{r.reservation_date}</td>
                <td className="p-3">{r.reservation_time}</td>
                <td className="p-3 capitalize">{r.status}</td>
                <td className="p-3 text-center space-x-2">
                  {r.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(r.id, 'confirmed')}
                        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 active:bg-green-800 transition duration-150"

                      >
                        Confirmă
                      </button>
                      <button
                        onClick={() =>
                          setDeclineModal({
                            open: true,
                            id: r.id,
                            email: r.email,
                            name: r.name
                          })
                        }
                        className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150"

                      >
                        Refuză
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {declineModal.open && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-6 shadow-2xl border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Trimite motivul refuzului către <span className="font-bold">{declineModal.name}</span>
      </h2>

      <textarea
        className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-red-400 resize-none shadow-sm"
        rows={5}
        value={declineMessage}
        onChange={(e) => setDeclineMessage(e.target.value)}
        placeholder="Ne pare rău, dar nu putem onora rezervarea din cauza..."
      />

      <div className="flex justify-between pt-2">
        <button
          className="bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded hover:bg-gray-300 active:bg-gray-400 transition"
          onClick={() =>
            setDeclineModal({ open: false, id: null, email: '', name: '' })
          }
        >
          Anulează
        </button>
        <button
          className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 active:bg-red-800 shadow-md transition"
          onClick={async () => {
            if (!declineModal.id) return;
            await supabase
              .from('reservations')
              .update({ status: 'declined' })
              .eq('id', declineModal.id);
            await sendDeclineEmail({
              email: declineModal.email,
              name: declineModal.name,
              reason: declineMessage
            });
            setDeclineModal({ open: false, id: null, email: '', name: '' });
            setDeclineMessage('');
            await loadReservations();
          }}
        >
          Trimite Refuzul
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ReservationsPanel;
