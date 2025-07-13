import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

const AddServiceForm: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('photo');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('uploading');
    setError('');

    try {
      if (!name || !type || !price || !description) {
        throw new Error('Toate câmpurile sunt obligatorii.');
      }

      const { error: insertError } = await supabase.from('services').insert([
        {
          name,
          type,
          price: parseFloat(price),
          description
        }
      ]);

      if (insertError) throw insertError;

      setStatus('success');
      setName('');
      setType('photo');
      setPrice('');
      setDescription('');
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-600">Adaugă un serviciu</h2>

      <input
        type="text"
        placeholder="Nume serviciu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="photo">Sesiune foto</option>
        <option value="event-space">Eveniment/Închiriere spațiu</option>
        <option value="team-building">Team Building</option>
      </select>

      <input
        type="number"
        step="0.01"
        placeholder="Preț (RON)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Descriere"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        rows={3}
      />

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        disabled={status === 'uploading'}
      >
        {status === 'uploading' ? 'Se încarcă...' : 'Adaugă serviciu'}
      </button>

      {status === 'error' && <p className="text-red-600">❌ {error}</p>}
      {status === 'success' && <p className="text-green-600">✅ Serviciu adăugat cu succes!</p>}
    </form>
  );
};

export default AddServiceForm;
