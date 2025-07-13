// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dashboard/reservations" className="bg-white shadow-md p-6 rounded hover:bg-violet-50">
          <h2 className="text-xl font-semibold">Rezervări</h2>
          <p>Vezi și gestionează rezervările.</p>
        </Link>

        <Link to="/dashboard/newsletter" className="bg-white shadow-md p-6 rounded hover:bg-violet-50">
          <h2 className="text-xl font-semibold">Newsletter</h2>
          <p>Trimite actualizări abonaților.</p>
        </Link>

        <Link to="/dashboard/manage" className="bg-white shadow-md p-6 rounded hover:bg-violet-50">
          <h2 className="text-xl font-semibold">Produse & Evenimente</h2>
          <p>Adaugă produse și evenimente.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
