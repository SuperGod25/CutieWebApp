import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { SendHorizonal } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewsletterPanel: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSendNewsletter = async () => {
    setStatus('sending');
    setError('');

    try {
      const { data: subscribers, error } = await supabase
        .from('newsletter_subscriptions')
        .select('email');

      if (error || !subscribers || subscribers.length === 0) {
        throw new Error('Nu s-au găsit abonați.');
      }

      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          message,
          recipients: subscribers.map((s) => s.email)
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setSubject('');
        setMessage('');
      } else {
        throw new Error(result.error || 'Eroare necunoscută la trimitere.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white border shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">Newsletter</h1>
        <p className="text-muted-foreground text-sm">
          Scrie și trimite un newsletter către toți abonații din baza de date.
        </p>

        {status === 'success' && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded border border-green-300">
            ✅ Newsletter trimis cu succes către abonați!
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded border border-red-300">
            ❌ {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Subiect</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Subiectul newsletterului..."
            />
          </div>

         <div className="flex flex-col h-[400px]">
  <label className="block text-sm font-medium mb-1 text-gray-700">
    Conținut (HTML)
  </label>
  <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
    <ReactQuill
      theme="snow"
      value={message}
      onChange={setMessage}
      className="h-full flex flex-col"
      style={{ height: '100%', border: 'none' }}
    />
  </div>
</div>


        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSendNewsletter}
            disabled={status === 'sending'}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-violet-500 hover:bg-violet-600"
          >
            <SendHorizonal className="w-4 h-4" />
            <span>{status === 'sending' ? 'Se trimite...' : 'Trimite Newsletter'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPanel;
