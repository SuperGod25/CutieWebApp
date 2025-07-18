// src/pages/AdminLogin.jsx

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error('❌ Login eșuat: Verifică emailul și parola');
    } else {
      toast.success('✅ Autentificat cu succes');
      navigate('/dashboard'); // or wherever your admin dashboard is
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleLogin} className="bg-white shadow rounded p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Admin</h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full rounded mb-4"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parola"
          className="border p-2 w-full rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {loading ? 'Se conectează...' : 'Conectează-te'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
