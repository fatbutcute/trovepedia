import { useState, useEffect } from 'react';
import './TokenCall.css';

export default function TokenCall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('server');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/player');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load Trove data.');
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

  const formatTimestamp = (ts) => {
    if (!ts) return 'N/A';
    return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="trove-dashboard">
      {/* Header */}
      <div className="trove-header">
        <div>
          <h1 className="trove-title">⚔️ Trove Live Rotations</h1>
          <p className="trove-subtitle">Real-time status, events, and daily rotations</p>
        </div>
        <button className="trove-refresh-btn" onClick={fetchData} disabled={loading}>
          {loading ? 'Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>

      {error && <div className="trove-error">{error}</div>}

      {/* Main Grid Layout */}
      <div className="trove-grid">
        
        {/* Navigation Sidebar */}
        <div className="trove-sidebar">
          <button 
            className={`trove-nav-btn ${activeTab === 'server' ? 'active' : ''}`}
            onClick={() => setActiveTab('server')}
          >
            ⏳ Server & Resets
          </button>
          <button 
            className={`trove-nav-btn ${activeTab === 'buffs' ? 'active' : ''}`}
            onClick={() => setActiveTab('buffs')}
          >
            ✨ Daily Buffs
          </button>
          <button 
            className={`trove-nav-btn ${activeTab === 'chaos' ? 'active' : ''}`}
            onClick={() => setActiveTab('chaos')}
          >
            🎁 Chaos Chest
          </button>
          <button 
            className={`trove-nav-btn ${activeTab === 'biomes' ? 'active' : ''}`}
            onClick={() => setActiveTab('biomes')}
          >
            🌍 Biomes
          </button>
        </div>

        {/* Content Box */}
        <div className="trove-content-box">
          {loading && !data ? (
            <div className="trove-loading">Loading live rotation data...</div>
          ) : data ? (
            <div>

              {/* TAB 1: SERVER & RESETS */}
              {activeTab === 'server' && (
                <div>
                  <h3 className="trove-section-title">Server Time & Resets</h3>
                  <div className="trove-card">
                    <div className="trove-row">
                      <span className="text-muted">Current Trove Day:</span>
                      <strong style={{ color: '#f59e0b' }}>{data.serverTime?.trove_day || 'N/A'}</strong>
                    </div>
                    <div className="trove-row">
                      <span className="text-muted">Daily Reset At:</span>
                      <span className="trove-badge">{formatTimestamp(data.serverTime?.daily_reset_at)}</span>
                    </div>
                    <div className="trove-row">
                      <span className="text-muted">Weekly Reset At:</span>
                      <span className="trove-badge">{formatTimestamp(data.serverTime?.weekly_reset_at)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DAILY BUFFS */}
              {activeTab === 'buffs' && (
                <div>
                  <h3 className="trove-section-title">Active Daily Buffs</h3>
                  <div className="trove-card">
                    {data.dailyBuffs?.current ? (
                      <div>
                        <h4 style={{ color: '#f59e0b', margin: '0 0 10px 0' }}>
                          {data.dailyBuffs.current.emoji} {data.dailyBuffs.current.name}
                        </h4>
                        
                        <p style={{ margin: '8px 0 4px 0', fontSize: '0.9rem', fontWeight: 600 }}>Normal Buffs:</p>
                        <ul className="trove-buff-list">
                          {data.dailyBuffs.current.normal_buffs?.map((buff, idx) => (
                            <li key={idx}>{buff}</li>
                          ))}
                        </ul>

                        <p style={{ margin: '12px 0 4px 0', fontSize: '0.9rem', fontWeight: 600, color: '#e879f9' }}>Premium Buffs:</p>
                        <ul className="trove-buff-list">
                          {data.dailyBuffs.current.premium_buffs?.map((buff, idx) => (
                            <li key={idx} style={{ color: '#f472b6' }}>{buff}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p style={{ color: '#9ca3af' }}>No daily buff data available.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CHAOS CHEST */}
              {activeTab === 'chaos' && (
                <div>
                  <h3 className="trove-section-title">Weekly Chaos Chest Feature</h3>
                  <div className="trove-card">
                    {data.chaosChest?.item ? (
                      <div className="trove-item-preview">
                        {data.chaosChest.item.image_url && (
                          <img 
                            src={data.chaosChest.item.image_url} 
                            alt="Chaos Chest Item" 
                            className="trove-item-img"
                          />
                        )}
                        <div>
                          <h4 style={{ color: '#f59e0b', margin: '0 0 4px 0' }}>
                            {data.chaosChest.item.name || 'Featured Item'}
                          </h4>
                          <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0 }}>
                            Blueprint: <code style={{ color: '#38bdf8' }}>{data.chaosChest.item.blueprint}</code>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: '#9ca3af' }}>No Chaos Chest item active.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: BIOMES */}
              {activeTab === 'biomes' && (
                <div>
                  <h3 className="trove-section-title">3-Hour Biome Rotation</h3>
                  <div className="trove-card">
                    {data.biomes ? (
                      <div>
                        <div className="trove-row">
                          <span>Current Biome:</span>
                          <strong style={{ color: '#4ade80' }}>{data.biomes.current || 'Active'}</strong>
                        </div>
                        <div className="trove-row">
                          <span>Next Biome:</span>
                          <span style={{ color: '#9ca3af' }}>{data.biomes.next || 'Upcoming'}</span>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: '#9ca3af' }}>No biome rotation data found.</p>
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