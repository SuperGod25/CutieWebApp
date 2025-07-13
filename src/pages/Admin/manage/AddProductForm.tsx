import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

const AddProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('coffee');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('uploading');
    setError('');

    try {
      if (!name || !price || !description || !image) {
        throw new Error('Toate câmpurile sunt obligatorii.');
      }

      const { data: imageUpload, error: imageError } = await supabase.storage
        .from('products')
        .upload(`images/${Date.now()}-${image.name}`, image);

      if (imageError || !imageUpload) throw imageError;

      const imageUrl = supabase.storage.from('products').getPublicUrl(imageUpload.path).data.publicUrl;

      const { error: insertError } = await supabase.from('products').insert([
        {
          name,
          category,
          price: parseFloat(price),
          description,
          image_url: imageUrl
        }
      ]);

      if (insertError) throw insertError;

      setStatus('success');
      setName('');
      setCategory('coffee');
      setPrice('');
      setDescription('');
      setImage(null);
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-600">Adaugă un produs</h2>
      <input
        type="text"
        placeholder="Nume produs"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="coffee">Cafea</option>
        <option value="flowers">Flori</option>
        <option value="bundle">Pachet cadou</option>
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
        {status === 'uploading' ? 'Se încarcă...' : 'Adaugă produs'}
      </button>

      {status === 'error' && <p className="text-red-600">❌ {error}</p>}
      {status === 'success' && <p className="text-green-600">✅ Produs adăugat cu succes!</p>}
    </form>
  );
};

export default AddProductForm;