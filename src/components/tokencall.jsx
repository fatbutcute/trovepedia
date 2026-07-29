import { useState, useEffect } from 'react';

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
    <div style={styles.container}>
      {/* Fejléc */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>⚔️ Trove Live Dashboard</h1>
          <p style={styles.subtitle}>Hivatalos szerver adatok, rotációk és státuszok</p>
        </div>
        <button style={styles.button} onClick={fetchData} disabled={loading}>
          {loading ? 'Frissítés...' : '🔄 Adatok frissítése'}
        </button>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      {/* Fő elrendezés (két oszlop, mint a profi oldalakon) */}
      <div style={styles.layout}>
        
        {/* Bal oldali menü / Kategóriák */}
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Kategóriák</h3>
          <button 
            style={{ ...styles.sidebarBtn, ...(activeTab === 'server' ? styles.sidebarBtnActive : {}) }}
            onClick={() => setActiveTab('server')}
          >
            ⏳ Szerver & Resetek
          </button>
          <button 
            style={{ ...styles.sidebarBtn, ...(activeTab === 'buffs' ? styles.sidebarBtnActive : {}) }}
            onClick={() => setActiveTab('buffs')}
          >
            ✨ Napi & Heti Buffok
          </button>
          <button 
            style={{ ...styles.sidebarBtn, ...(activeTab === 'chaos' ? styles.sidebarBtnActive : {}) }}
            onClick={() => setActiveTab('chaos')}
          >
            🎁 Chaos Chest
          </button>
        </div>

        {/* Jobb oldali tartalommező */}
        <div style={styles.contentArea}>
          {loading && !data ? (
            <div style={styles.loadingText}>Adatok betöltése...</div>
          ) : data ? (
            <div>
              {activeTab === 'server' && (
                <div>
                  <h3 style={styles.sectionTitle}>Szerver Státusz</h3>
                  <div style={styles.card}>
                    <p style={styles.row}><span>Aktuális Trove Nap:</span> <strong>{data.serverTime?.trove_day || 'N/A'}</strong></p>
                    <p style={styles.row}><span>Napi Reset ID:</span> <span style={styles.mono}>{data.serverTime?.daily_reset_at || 'N/A'}</span></p>
                    <p style={styles.row}><span>Heti Reset ID:</span> <span style={styles.mono}>{data.serverTime?.weekly_reset_at || 'N/A'}</span></p>
                  </div>
                </div>
              )}

              {activeTab === 'buffs' && (
                <div>
                  <h3 style={styles.sectionTitle}>Napi Buffok részletei</h3>
                  <div style={styles.card}>
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
                      <pre style={styles.pre}>{JSON.stringify(data.dailyBuffs, null, 2)}</pre>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'chaos' && (
                <div>
                  <h3 style={styles.sectionTitle}>Heti Chaos Chest</h3>
                  <div style={styles.card}>
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
                      <pre style={styles.pre}>{JSON.stringify(data.chaosChest, null, 2)}</pre>
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

// Belső, tiszta CSS stílusok, amik garantáltan nem csúsznak szét
const styles = {
  container: { maxWidth: '1100px', margin: '40px auto', padding: '20px', background: '#090d16', color: '#f8fafc', borderRadius: '16px', border: '1px solid #1e293b', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '20px' },
  title: { fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', margin: 0 },
  subtitle: { fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' },
  button: { background: '#f59e0b', color: '#020617', border: 'none', padding: '10px 18px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' },
  errorBox: { background: '#450a0a', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' },
  layout: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' },
  sidebar: { background: '#020617', padding: '15px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '8px' },
  sidebarTitle: { fontSize: '12px', textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px', marginBottom: '5px' },
  sidebarBtn: { background: 'transparent', border: 'none', color: '#94a3b8', textAlign: 'left', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: '0.2s' },
  sidebarBtnActive: { background: '#1e293b', color: '#f8fafc', borderLeft: '4px solid #f59e0b' },
  contentArea: { background: '#020617', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', minHeight: '350px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '15px', marginTop: 0 },
  card: { background: '#090d16', padding: '15px', borderRadius: '8px', border: '1px solid #1e293b' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e293b', fontSize: '14px', color: '#cbd5e1' },
  mono: { fontFamily: 'monospace', color: '#f59e0b' },
  loadingText: { textAlign: 'center', color: '#64748b', padding: '40px' },
  pre: { fontSize: '11px', color: '#a78bfa', overflowX: 'auto', margin: 0 }
};