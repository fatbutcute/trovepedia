import { useState, useEffect } from 'react';
import './tokencall.css';

export default function TokenCall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('server');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/player`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Hiba történt.');
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

  return (
    <div className="trove-container">
      {/* Fejléc */}
      <div className="trove-header">
        <div>
          <h1 className="trove-title">⚔️ Trove Live Dashboard</h1>
          <p className="trove-subtitle">Hivatalos szerver adatok, rotációk és státuszok</p>
        </div>
        <button className="trove-button" onClick={fetchData} disabled={loading}>
          {loading ? 'Frissítés...' : '🔄 Adatok frissítése'}
        </button>
      </div>

      {error && <div className="trove-error">{error}</div>}

      {/* Fő elrendezés */}
      <div className="trove-layout">
        
        {/* Bal oldali menü */}
        <div className="trove-sidebar">
          <span className="trove-sidebar-title">Kategóriák</span>
          <button 
            className={`trove-sidebar-btn ${activeTab === 'server' ? 'active' : ''}`}
            onClick={() => setActiveTab('server')}
          >
            ⏳ Szerver & Resetek
          </button>
          <button 
            className={`trove-sidebar-btn ${activeTab === 'buffs' ? 'active' : ''}`}
            onClick={() => setActiveTab('buffs')}
          >
            ✨ Napi & Heti Buffok
          </button>
          <button 
            className={`trove-sidebar-btn ${activeTab === 'chaos' ? 'active' : ''}`}
            onClick={() => setActiveTab('chaos')}
          >
            🎁 Chaos Chest
          </button>
        </div>

        {/* Jobb oldali tartalommező */}
        <div className="trove-content">
          {loading && !data ? (
            <div className="trove-loading">Adatok betöltése...</div>
          ) : data ? (
            <div>
              {activeTab === 'server' && (
                <div>
                  <h3 className="trove-section-title">Szerver Státusz</h3>
                  <div className="trove-card">
                    <p className="trove-row"><span>Aktuális Trove Nap:</span> <strong>{data.serverTime?.trove_day || 'N/A'}</strong></p>
                    <p className="trove-row"><span>Napi Reset ID:</span> <span className="trove-mono">{data.serverTime?.daily_reset_at || 'N/A'}</span></p>
                    <p className="trove-row"><span>Heti Reset ID:</span> <span className="trove-mono">{data.serverTime?.weekly_reset_at || 'N/A'}</span></p>
                  </div>
                </div>
              )}

              {activeTab === 'buffs' && (
                <div>
                  <h3 className="trove-section-title">Napi Buffok részletei</h3>
                  <div className="trove-card">
                    {data.dailyBuffs?.current ? (
                      <div>
                        <h4 style={{ color: '#fbbf24', marginBottom: '10px' }}>{data.dailyBuffs.current.name}</h4>
                        <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>
                          <strong>Normál:</strong> {data.dailyBuffs.current.normal_buff?.join(', ')}
                        </p>
                        <p style={{ fontSize: '13px', color: '#e879f9' }}>
                          <strong>Prémium:</strong> {data.dailyBuffs.current.premium_buff?.join(', ')}
                        </p>
                      </div>
                    ) : (
                      <pre className="trove-pre">{JSON.stringify(data.dailyBuffs, null, 2)}</pre>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'chaos' && (
                <div>
                  <h3 className="trove-section-title">Heti Chaos Chest</h3>
                  <div className="trove-card">
                    {data.chaosChest?.item ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {data.chaosChest.item.image_url && (
                          <img src={data.chaosChest.item.image_url} alt="Item" style={{ width: '50px', height: '50px', background: '#020617', padding: '5px', borderRadius: '8px' }} />
                        )}
                        <div>
                          <h4 style={{ color: '#fbbf24' }}>{data.chaosChest.item.name || 'Ismeretlen tárgy'}</h4>
                          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Blueprint: {data.chaosChest.item.blueprint}</p>
                        </div>
                      </div>
                    ) : (
                      <pre className="trove-pre">{JSON.stringify(data.chaosChest, null, 2)}</pre>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}