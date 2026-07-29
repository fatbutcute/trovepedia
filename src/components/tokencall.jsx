import { useState, useEffect } from 'react';

export default function TokenCall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/player`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch data.');
      }

      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Oldal betöltésekor automatikusan lekéri az adatokat
  useEffect(() => {
    fetchData();
  }, []);

  // Időbélyeg átalakítása olvasható visszaszámlálássá vagy órává
  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800 my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black tracking-wide text-amber-400">⚔️ Trove Live Dashboard</h2>
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? 'Frissítés...' : '🔄 Adatok frissítése'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      {loading && !data && (
        <div className="text-center py-12 text-slate-400 animate-pulse">
          Adatok betöltése a Trove szerverekről...
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Szerver Idő és Resetek Kártya */}
          <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 shadow-inner">
            <h3 className="text-lg font-bold text-sky-400 mb-3 flex items-center gap-2">
              ⏳ Szerver Státusz & Resetek
            </h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex justify-between border-b border-slate-700/50 pb-1">
                <span className="text-slate-400">Aktuális Trove Nap:</span> 
                <span className="font-semibold text-white">{data.serverTime?.trove_day || 'N/A'}</span>
              </p>
              <p className="flex justify-between border-b border-slate-700/50 pb-1">
                <span className="text-slate-400">Napi Reset:</span> 
                <span className="font-mono text-amber-300">{formatTime(data.serverTime?.daily_reset_at)}</span>
              </p>
              <p className="flex justify-between pb-1">
                <span className="text-slate-400">Heti Reset:</span> 
                <span className="font-mono text-amber-300">{formatTime(data.serverTime?.weekly_reset_at)}</span>
              </p>
            </div>
          </div>

          {/* Napi Buffok Kártya */}
          <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 shadow-inner">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              ✨ Napi Buffok & Rotáció
            </h3>
            <div className="text-sm text-slate-300">
              {data.dailyBuffs ? (
                <div className="space-y-2">
                  <p><span className="text-slate-400">Ma érvényes:</span> <span className="text-white font-medium">{JSON.stringify(data.dailyBuffs)}</span></p>
                </div>
              ) : (
                <p className="text-slate-500 italic">Nincs elérhető adat a buffokról.</p>
              )}
            </div>
          </div>

          {/* Heti Chaos Chest Kártya */}
          <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 shadow-inner md:col-span-2">
            <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
              🎁 Heti Chaos Chest Kiemelt Tárgy
            </h3>
            <div className="text-sm text-slate-300 font-mono bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <pre className="overflow-x-auto text-xs text-purple-200">
                {JSON.stringify(data.chaosChest, null, 2)}
              </pre>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}