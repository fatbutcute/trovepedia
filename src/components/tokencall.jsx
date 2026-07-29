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

  useEffect(() => {
    fetchData();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-950 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 my-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-amber-400 tracking-wide">⚔️ Trove Live Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">Valós idejű szerver adatok és rotációk</p>
        </div>
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 text-sm cursor-pointer"
        >
          {loading ? 'Frissítés...' : '🔄 Adatok frissítése'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-950/80 border border-red-500/50 text-red-200 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      {loading && !data && (
        <div className="text-center py-16 text-slate-400 animate-pulse text-lg">
          Adatok betöltése a Trove szerverekről...
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Szerver Státusz */}
          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 shadow-md">
            <h3 className="text-lg font-bold text-sky-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              ⏳ Szerver Státusz & Resetek
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Aktuális Trove Nap:</span> 
                <span className="font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-800/50">
                  {data.serverTime?.trove_day || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Napi Reset:</span> 
                <span className="font-mono text-amber-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  {formatTime(data.serverTime?.daily_reset_at)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Heti Reset:</span> 
                <span className="font-mono text-amber-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  {formatTime(data.serverTime?.weekly_reset_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Napi Buffok */}
          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 shadow-md">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              ✨ Napi Buffok
            </h3>
            <div className="text-sm space-y-2">
              {data.dailyBuffs?.name ? (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">{data.dailyBuffs.name}</p>
                  <p className="text-xs text-slate-300 mb-1"><span className="text-slate-400">Normál:</span> {data.dailyBuffs.normal_buff}</p>
                  <p className="text-xs text-purple-300"><span className="text-slate-400">Prémium:</span> {data.dailyBuffs.premium_buff}</p>
                </div>
              ) : (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-36">
                  <pre>{JSON.stringify(data.dailyBuffs, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Heti Chaos Chest */}
          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 shadow-md md:col-span-2">
            <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              🎁 Heti Chaos Chest Kiemelt Tárgy
            </h3>
            {data.chaosChest?.item ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                {data.chaosChest.item.image_url && (
                  <img 
                    src={data.chaosChest.item.image_url} 
                    alt="Chaos Item" 
                    className="w-16 h-16 object-contain bg-slate-900 p-2 rounded-lg border border-slate-800"
                  />
                )}
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-base font-bold text-amber-300">{data.chaosChest.item.name || 'Ismeretlen tárgy'}</h4>
                  <p className="text-xs text-slate-400 mt-1">Aktív állapot: <span className="text-emerald-400 font-semibold">Igen</span></p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-purple-200 overflow-x-auto">
                <pre>{JSON.stringify(data.chaosChest, null, 2)}</pre>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}