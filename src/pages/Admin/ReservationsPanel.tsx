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
  const [filtered, setFiltered] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  const [declineModal, setDeclineModal] = useState({
    open: false,
    id: null as string | null,
    email: '',
    name: ''
  });

  const [declineMessage, setDeclineMessage] = useState('');

  const loadReservations = async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setReservations(data || []);
      setFiltered(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    let results = reservations;

    if (searchName.trim()) {
      results = results.filter((r) =>
        r.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterDate.trim()) {
      results = results.filter((r) => r.reservation_date === filterDate);
    }

    if (statusFilter !== 'all') {
      results = results.filter((r) => r.status === statusFilter);
    }

    setFiltered(results);
  }, [searchName, filterDate, statusFilter, reservations]);

  const updateStatus = async (id: string, status: 'confirmed' | 'declined') => {
    const { data, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (!data || fetchError) return alert('❌ Nu s-a putut obține rezervarea.');

    if (status === 'confirmed') {
      const result = await sendConfirmationEmail({
        name: data.name,
        email: data.email,
        reservation_date: data.reservation_date,
        reservation_time: data.reservation_time,
        reservation_type: data.reservation_type,
        party_size: data.party_size,
        special_requests: data.special_requests,
        type: 'reservation'
      });
      if (!result.success) return alert('❌ Eroare email confirmare.');
    }

    if (status === 'declined') {
      const result = await sendDeclineEmail({
        email: data.email,
        name: data.name,
        reason: declineMessage || 'Rezervarea nu poate fi onorată.'
      });
      if (!result.success) return alert('❌ Eroare email refuz.');
    }

    const { error: updateError } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);

    if (updateError) return alert('❌ Eroare la actualizarea în baza de date.');

    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Rezervări</h1>
      <p className="text-sm text-muted-foreground mb-4">Filtrează sau gestionează rezervările clienților.</p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Caută după nume..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/4"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/4"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-1/4"
        >
          
          <option value="pending">În așteptare</option>
          <option value="confirmed">Confirmate</option>
          <option value="declined">Refuzate</option>
        </select>
        <button
          onClick={() => {
            setSearchName('');
            setFilterDate('');
            setStatusFilter('pending');
          }}
          className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300 w-full md:w-fit"
        >
          Resetează filtrele
        </button>
      </div>

      {loading ? (
        <p>Se încarcă rezervările...</p>
      ) : filtered.length === 0 ? (
        <p>Nu există rezervări care corespund filtrelor.</p>
      ) : (
        <table className="w-full border text-sm bg-white rounded shadow">
          <thead>
  <tr className="bg-violet-100 text-left">
    <th className="p-3">Nume</th>
    <th className="p-3">Email</th>
    <th className="p-3">Tip</th>
    <th className="p-3">Data</th>
    <th className="p-3">Ora</th>
    <th className="p-3">Nr. persoane</th>
    <th className="p-3">Status</th>
    <th className="p-3 text-center">Acțiuni</th>
  </tr>
</thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t hover:bg-violet-50">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.reservation_type}</td>
                <td className="p-3">{r.reservation_date}</td>
                <td className="p-3">{r.reservation_time}</td>
                <td className="p-3">{r.party_size || '—'}</td>
                <td className="p-3 capitalize">{r.status}</td>
                <td className="p-3 text-center space-x-2">
                  {r.status === 'pending' && (
                    <>  
                      <button
                        onClick={() => updateStatus(r.id, 'confirmed')}
                        className="bg-green-600 text-white font-semibold px-3 py-1 rounded hover:bg-green-700"
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
                        className="bg-red-600 text-white font-semibold px-3 py-1 rounded hover:bg-red-700"
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

      {/* Decline Modal */}
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
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setDeclineModal({ open: false, id: null, email: '', name: '' })}
              >
                Anulează
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={async () => {
                  if (!declineModal.id) return;
                  await updateStatus(declineModal.id, 'declined');
                  setDeclineModal({ open: false, id: null, email: '', name: '' });
                  setDeclineMessage('');
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
