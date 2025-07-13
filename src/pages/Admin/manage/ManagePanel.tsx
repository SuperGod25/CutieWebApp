import React, { useState } from 'react';
import AddProductForm from './AddProductForm';
import AddEventForm from './AddEventForm';
import AddServiceForm from './AddServiceForm';


const ManagePanel: React.FC = () => {
  const [tab, setTab] = useState<'products' | 'events' | 'services'>('products');

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Administrare Conținut</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setTab('products')}
          className={`px-4 py-2 rounded ${tab === 'products' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          Adaugă Produs
        </button>
        <button
          onClick={() => setTab('events')}
          className={`px-4 py-2 rounded ${tab === 'events' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          Adaugă Eveniment
        </button>
        <button
          onClick={() => setTab('services')}
          className={`px-4 py-2 rounded ${tab === 'services' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          Adaugă Serviciu
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl">
        {tab === 'products' && <AddProductForm />}
        {tab === 'events' && <AddEventForm />}
        {tab === 'services' && <AddServiceForm />}
      </div>
    </div>
  );
};

export default ManagePanel;
