import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


type ObjectType = 'products' | 'events' | 'services';

const ContentManager: React.FC = () => {
  const [type, setType] = useState<ObjectType>('products');
  const [data, setData] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<any>({});
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortKey, setSortKey] = useState<string>('created_at');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [loading, setLoading] = useState(false);

  const fields = {
    products: ['name', 'category', 'price', 'description'],
    events: ['title', 'event_date', 'event_time', 'price', 'category', 'description'],
    services: ['name', 'type', 'price', 'description']
  };

  const CATEGORY_OPTIONS = {
  products: ['coffee', 'flowers', 'bundle'],
  events: ['Workshop', 'Creative', 'Community', 'Arts', 'Networking'],
  services: ['photo', 'event-space', 'team-building'],
};


  const fetchData = async () => {
    setLoading(true);
    let query = supabase.from(type).select('*', { count: 'exact' });

    if (searchQuery) {
      const searchField = type === 'events' ? 'title' : 'name';
      query = query.ilike(searchField, `%${searchQuery}%`);
    }

    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }

    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    query = query.range(from, to);
    query = query.order(sortKey, { ascending: sortAsc });

    const { data: fetched, error, count } = await query;

    if (error) {
      toast.error('❌ Eroare la preluarea datelor.');
      console.error(error);
      setLoading(false);
      return;
    }

    setData(fetched || []);
    setTotalItems(count || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    setEditId(null);
    setEditData({});
    setEditImage(null);
    setEditPreviewUrl(null);
    setNewItem({});
    setNewImage(null);
    setPreviewUrl(null);
  }, [type, searchQuery, selectedCategory, currentPage, sortKey, sortAsc]);

  const handleDelete = async (id: string) => {
    if (!confirm('Ești sigur că vrei să ștergi acest obiect?')) return;
    const { error } = await supabase.from(type).delete().eq('id', id);
    if (error) {
      toast.error('❌ Eroare la ștergere.');
      console.error(error);
      return;
    }
    toast.success(' Șters cu succes!');
    fetchData();
  };

  const handleUpdate = async () => {
    if (!editId) return;

    let updated = { ...editData };

    if (editImage) {
      const filename = `${Date.now()}-${editImage.name}`;
      const { error: uploadErr } = await supabase.storage.from(type).upload(filename, editImage);
      if (uploadErr) {
        toast.error('❌ Eroare la încărcarea imaginii');
        return;
      }
      updated.image_url = supabase.storage.from(type).getPublicUrl(filename).data.publicUrl;
    }

    const cleaned = Object.fromEntries(Object.entries(updated).filter(([key]) => key !== 'id'));
    const { data, error } = await supabase.from(type).update(cleaned).eq('id', editId).select();

    if (error || !data || data.length === 0) {
      toast.error('❌ Eroare: Obiectul nu a fost actualizat.');
      console.error('Update failed:', error, data);
      return;
    }

    toast.success(' Actualizare reușită!');
    await fetchData();
    setEditId(null);
    setEditData({});
    setEditImage(null);
    setEditPreviewUrl(null);
  };

  const handleAdd = async () => {
    let image_url = '';
    if (newImage) {
      const filename = `${Date.now()}-${newImage.name}`;
      const { error: uploadErr } = await supabase.storage.from(type).upload(filename, newImage);
      if (uploadErr) return toast.error('Eroare la încărcare imagine');
      image_url = supabase.storage.from(type).getPublicUrl(filename).data.publicUrl;
    }

    const { error } = await supabase.from(type).insert([{ ...newItem, image_url }]);
    if (error) {
      toast.error('❌ Eroare la adăugare.');
      console.error(error);
      return;
    }

    toast.success(' Adăugat cu succes!');
    fetchData();
    setNewItem({});
    setNewImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Toaster position="top-right" richColors />
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Administrare Conținut</h1>

      <div className="flex gap-3 mb-6">
        {(['products', 'events', 'services'] as ObjectType[]).map((item) => (
          <button
            key={item}
            onClick={() => {
              setType(item);
              setSearchQuery('');
              setSelectedCategory('');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              type === item ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {item === 'products' ? 'Produse' : item === 'events' ? 'Evenimente' : 'Servicii'}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Caută după nume..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full md:w-1/3"
        />

        {type !== 'services' && (
          <select
            className="border p-2 rounded w-full md:w-1/4"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Toate categoriile</option>
            <option value="coffee">Cafea</option>
            <option value="flowers">Flori</option>
            <option value="bundle">Cadouri</option>
          </select>
        )}
      </div>

      {/* Add Section */}
      <div className="border rounded-xl p-4 mb-8 bg-white shadow">
        <h2 className="text-lg font-semibold mb-4">
          Adaugă {type === 'products' ? 'produs' : type === 'events' ? 'eveniment' : 'serviciu'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields[type].map((key) => {
  if (key === 'category' || key === 'type') {
    return (
      <select
        key={key}
        className="border p-2 rounded"
        value={newItem[key] || ''}
        onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })}
      >
        <option value="">Selectează {key}</option>
        {CATEGORY_OPTIONS[type]?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (key === 'event_date') {
    return (
      <DatePicker
        key={key}
        selected={newItem[key] ? new Date(newItem[key]) : null}
        onChange={(date) => setNewItem({ ...newItem, [key]: date })}
        className="border p-2 rounded w-full"
        dateFormat="yyyy-MM-dd"
        placeholderText="Selectează data"
      />
    );
  }

  if (key === 'event_time') {
    return (
      <DatePicker
        key={key}
        selected={newItem[key] ? new Date(`1970-01-01T${newItem[key]}`) : null}
        onChange={(time) =>
          setNewItem({
            ...newItem,
            [key]: time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          })
        }
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Ora"
        dateFormat="HH:mm"
        className="border p-2 rounded w-full"
        placeholderText="Selectează ora"
      />
    );
  }

  return (
    <input
      key={key}
      type="text"
      placeholder={key}
      className="border p-2 rounded"
      value={newItem[key] || ''}
      onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })}
    />
  );
})}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setNewImage(file);
              if (file) setPreviewUrl(URL.createObjectURL(file));
            }}
            className="border p-2 rounded text-sm"
          />
          {previewUrl && (
            <div className="col-span-2">
              <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded border" />
            </div>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Adaugă
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white shadow rounded-xl">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Se încarcă datele...</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Imagine</th>
                {fields[type].map((key) => (
                  <th
                    key={key}
                    className="p-3 text-left capitalize cursor-pointer hover:underline"
                    onClick={() => {
                      if (sortKey === key) setSortAsc(!sortAsc);
                      else {
                        setSortKey(key);
                        setSortAsc(true);
                      }
                    }}
                  >
                    {key}
                    {sortKey === key && (sortAsc ? ' ▲' : ' ▼')}
                  </th>
                ))}
                <th className="p-3 text-right">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t hover:bg-violet-50">
                  <td className="p-3">
                    <img src={item.image_url} alt="" className="w-14 h-14 object-cover rounded" />
                  </td>
                  {fields[type].map((key) => (
                    <td key={key} className="p-3">
                      {editId === item.id ? (
                        <input
                          type="text"
                          className="border p-1 rounded w-full"
                          value={editData[key] ?? ''}
                          onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                        />
                      ) : (
                        item[key]
                      )}
                    </td>
                  ))}
                  <td className="p-3 text-right space-x-2">
                    {editId === item.id ? (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setEditImage(file);
                            if (file) setEditPreviewUrl(URL.createObjectURL(file));
                          }}
                          className="text-xs mb-2"
                        />
                        {editPreviewUrl && (
                          <img
                            src={editPreviewUrl}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded border mb-2"
                          />
                        )}
                        <button
                          onClick={handleUpdate}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Salvează
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditId(item.id);
                            setEditData({ ...item });
                          }}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded disabled:opacity-50"
          >
            Înapoi
          </button>
          <span className="text-sm font-medium">Pagina {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded disabled:opacity-50"
          >
            Înainte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
 