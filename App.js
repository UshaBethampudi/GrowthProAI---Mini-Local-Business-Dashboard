import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!name || !location) return;
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios.post('http://localhost:4000/business-data', { name, location });
        setBusiness(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const regenHeadline = async () => {
    if (!business) return;
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios.get('http://localhost:4000/regenerate-headline', {
          params: { name, location }
        });
        setBusiness(b => ({ ...b, headline: res.data.headline }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 flex items-center justify-center p-4 sm:p-8">
      <div className="backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl shadow-xl p-8 w-full max-w-xl transition transform hover:scale-[1.02] duration-300">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow">📊 Business Snapshot</h1>

        <div className="space-y-4 mb-6">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-blue-300 bg-white/70 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder:text-blue-800"
            placeholder="Business Name"
          />
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full border border-blue-300 bg-white/70 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder:text-blue-800"
            placeholder="Location"
          />
          <button
            onClick={fetchData}
            disabled={loading || !name || !location}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl py-2 shadow-md disabled:bg-gray-400"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'Fetch Business Data'
            )}
          </button>
        </div>

        {business && (
          <div className="mt-6 bg-white/70 border border-blue-200 rounded-xl p-6 shadow-inner animate-fade-in">
            <p className="text-xl font-semibold text-blue-900">⭐ Rating: {business.rating}</p>
            <p className="text-xl font-semibold text-blue-900">💬 Reviews: {business.reviews}</p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-blue-700">✨ AI-Generated SEO Headline:</p>
              <p className="italic text-blue-900 mt-1">“{business.headline}”</p>
            </div>
            <button
              onClick={regenHeadline}
              disabled={loading}
              className="mt-4 bg-green-600 hover:bg-green-700 transition text-white font-medium rounded-md px-4 py-2 shadow"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Regenerating...</span>
                </div>
              ) : (
                'Regenerate SEO Headline'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
