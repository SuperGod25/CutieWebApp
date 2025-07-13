import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { SendHorizonal, Eye, Mail, Trash2 } from 'lucide-react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// Register font whitelist
const Font = Quill.import('formats/font') as any;
Font.whitelist = [
  'arial',
  'times-new-roman',
  'courier-new',
  'georgia',
  'roboto',
  'raleway',
  'raleway-heavy'
];
Quill.register(Font, true);

const fontOptions = Font.whitelist;

const modules = {
  toolbar: [
    [{ font: fontOptions }],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  history: { delay: 500, maxStack: 100, userOnly: true }
};

const TEST_EMAIL = 'filipovicisebastian69@gmail.com';

const NewsletterPanel: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const labelMap: Record<string, string> = {
      'arial': 'Arial',
      'times-new-roman': 'Times New Roman',
      'courier-new': 'Courier New',
      'georgia': 'Georgia',
      'roboto': 'Roboto',
      'raleway': 'Raleway',
      'raleway-heavy': 'Raleway Heavy'
    };

    const patchLabels = () => {
      const items = document.querySelectorAll('.ql-picker.ql-font .ql-picker-item');
      items.forEach((item) => {
        const value = item.getAttribute('data-value') || '';
        const label = labelMap[value];
        if (label) {
          (item as HTMLElement).innerText = label;
          (item as HTMLElement).style.fontFamily = label;
        }
      });

      const label = document.querySelector('.ql-picker.ql-font .ql-picker-label') as HTMLElement;
      const selected = label?.getAttribute('data-value') || '';
      if (label && labelMap[selected]) {
        label.innerText = labelMap[selected];
        label.style.fontFamily = labelMap[selected];
      }
    };

    const quill = quillRef.current?.getEditor();
    quill?.format('font', 'raleway');

    setTimeout(patchLabels, 400);
    quill?.on('selection-change', patchLabels);
    quill?.on('text-change', patchLabels);

    return () => {
      quill?.off('selection-change', patchLabels);
      quill?.off('text-change', patchLabels);
    };
  }, []);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendNewsletter = async () => {
    setStatus('sending');
    setError('');

    try {
      const cleanedSubject = subject.trim();
      const cleanedMessage = message.trim().replace(/^<p><br><\/p>$/i, '');

      if (!cleanedSubject || cleanedMessage.length < 10) {
        throw new Error('Subiectul sau conținutul este prea scurt.');
      }

      const { data: subscribers, error: supabaseError } = await supabase
        .from('newsletter_subscriptions')
        .select('email');

      if (supabaseError || !subscribers?.length) {
        throw new Error('Nu există abonați în baza de date.');
      }

      const recipients = subscribers.map((s) => s.email).filter(Boolean);
      const formData = new FormData();
      formData.append('subject', cleanedSubject);
      formData.append('message', cleanedMessage);
      formData.append('recipients', JSON.stringify(recipients));
      files.forEach((file) => formData.append('attachments', file));

      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        body: formData
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error('Răspuns invalid de la server:\n' + text);
      }

      if (!result.success) throw new Error(result.error || 'Eroare necunoscută.');

      setStatus('success');
      setSubject('');
      setMessage('');
      setFiles([]);
    } catch (err: any) {
      console.error('❌ Eroare:', err);
      setStatus('error');
      setError(err.message);
    }
  };

  const handleSendTest = async () => {
    setIsSendingTest(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('subject', '[TEST] ' + subject);
      formData.append('message', message);
      formData.append('recipients', JSON.stringify([TEST_EMAIL]));
      files.forEach((file) => formData.append('attachments', file));

      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        body: formData
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (!result.success) throw new Error(result.error || 'Eroare necunoscută.');
      alert('✅ Test trimis către ' + TEST_EMAIL);
    } catch (err: any) {
      console.error(err);
      alert('❌ Eroare test: ' + err.message);
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white border shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">Newsletter</h1>

        <input
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          onChange={handleFilesChange}
          className="mb-3 block text-sm text-gray-600"
        />

        {files.length > 0 && (
          <ul className="space-y-1 text-sm text-gray-700">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span>{file.name}</span>
                <button onClick={() => removeFile(idx)} className="text-red-500">
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subiectul newsletterului..."
          className="w-full border border-gray-300 p-3 rounded-md text-sm mb-4"
        />

        <div className="h-[500px] border border-gray-300 rounded-md overflow-hidden">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={message}
            onChange={setMessage}
            modules={modules}
            className="h-full flex flex-col"
            style={{ height: '100%' }}
          />
        </div>

        <div className="flex flex-wrap justify-between pt-4 gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(true)}
              className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              <Eye className="inline w-4 h-4 mr-1" /> Previzualizează
            </button>

            <button
              onClick={handleSendTest}
              disabled={isSendingTest}
              className="text-sm px-4 py-2 rounded border border-blue-400 text-blue-700 hover:bg-blue-100"
            >
              <Mail className="inline w-4 h-4 mr-1" />
              {isSendingTest ? 'Se trimite...' : 'Trimite test'}
            </button>
          </div>

          <button
            onClick={handleSendNewsletter}
            disabled={status === 'sending'}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            <SendHorizonal className="w-4 h-4" />
            {status === 'sending' ? 'Se trimite...' : 'Trimite Newsletter'}
          </button>
        </div>

        {status === 'error' && <p className="text-red-600 mt-2">❌ {error}</p>}
        {status === 'success' && <p className="text-green-600 mt-2">✅ Trimite reușită</p>}
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4">Previzualizare Newsletter</h2>
            <div
              className="prose max-w-none border border-gray-200 p-4 rounded overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: message }}
              style={{ maxHeight: '60vh' }}
            />
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterPanel;
