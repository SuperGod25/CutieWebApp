// src/pages/admin/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      navigate('/dashboard');
    } else {
      setError('Email sau parolă incorectă.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-purple-700">Admin Login</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parolă"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
          Autentificare
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
