import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

const AddEventForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('Free');
  const [category, setCategory] = useState('Workshop');
  const [capacity, setCapacity] = useState(20);
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('uploading');
    setError('');

    try {
      if (!title || !eventDate || !eventTime || !description || !image) {
        throw new Error('Toate câmpurile sunt obligatorii.');
      }

      const { data: imageUpload, error: imageError } = await supabase.storage
        .from('events')
        .upload(`images/${Date.now()}-${image.name}`, image);

      if (imageError || !imageUpload) throw imageError;

      const imageUrl = supabase.storage.from('events').getPublicUrl(imageUpload.path).data.publicUrl;

      const { error: insertError } = await supabase.from('events').insert([
        {
          title,
          description,
          event_date: eventDate,
          event_time: eventTime,
          capacity,
          price,
          category,
          image_url: imageUrl,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

      if (insertError) throw insertError;

      setStatus('success');
      setTitle('');
      setEventDate('');
      setEventTime('');
      setDescription('');
      setPrice('Free');
      setCategory('Workshop');
      setCapacity(20);
      setImage(null);
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-600">Adaugă un eveniment</h2>

      <input
        type="text"
        placeholder="Titlu eveniment"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="time"
        value={eventTime}
        onChange={(e) => setEventTime(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Descriere"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        rows={3}
      />

      <input
        type="number"
        placeholder="Capacitate (ex: 20)"
        value={capacity}
        onChange={(e) => setCapacity(parseInt(e.target.value))}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Preț (ex: Free, 30 RON)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="Workshop">Workshop</option>
        <option value="Performance">Performance</option>
        <option value="Talk">Talk</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full text-sm text-gray-700"
      />

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        disabled={status === 'uploading'}
      >
        {status === 'uploading' ? 'Se încarcă...' : 'Adaugă eveniment'}
      </button>

      {status === 'error' && <p className="text-red-600">❌ {error}</p>}
      {status === 'success' && <p className="text-green-600">✅ Eveniment adăugat cu succes!</p>}
    </form>
  );
};

export default AddEventForm;
