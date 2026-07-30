import { useState, useEffect } from 'react';
import './TokenCall.css';

export default function TokenCall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/player');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to fetch Trove data.');
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
    <div className="btt-dashboard">
      
      {/* Top Bar with Search */}
      <div className="btt-topbar">
        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>⚔️ Trove Dashboard</h2>
        <div className="btt-search-box">
          <input 
            type="text" 
            placeholder="Look up a player or item..." 
            className="btt-search-input"
          />
          <button className="btt-search-btn">Search</button>
        </div>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</div>}

      {/* Main Grid */}
      <div className="btt-grid">
        
        {/* Left Sidebar */}
        <div className="btt-sidebar">
          
          {/* Server Timer Card */}
          <div className="btt-timer-card">
            <div className="btt-timer-title">Trove Server Time</div>
            <div className="btt-timer-clock">
              {data?.serverTime?.trove_day || 'LIVE'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>
              Daily reset active
            </div>
          </div>

          {/* Navigation Items */}
          <div className="btt-nav-list">
            <button 
              className={`btt-nav-btn ${activeTab === 'today' ? 'active' : ''}`}
              onClick={() => setActiveTab('today')}
            >
              🔄 Today in Trove
            </button>
            <button 
              className={`btt-nav-btn ${activeTab === 'rotations' ? 'active' : ''}`}
              onClick={() => setActiveTab('rotations')}
            >
              🌍 Biomes & World
            </button>
            <button 
              className={`btt-nav-btn ${activeTab === 'chaos' ? 'active' : ''}`}
              onClick={() => setActiveTab('chaos')}
            >
              🎁 Chaos Chest
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="btt-content">
          
          {/* Server Status Header */}
          <div className="btt-status-row">
            <div className="btt-status-card">
              <div className="btt-dot-online"></div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Server Status</div>
                <div style={{ fontWeight: 700 }}>Online</div>
              </div>
            </div>
          </div>

          {loading && !data ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading dashboard data...</div>
          ) : (
            <div className="btt-cards-grid">
              
              {/* Card 1: Today's Bonus */}
              <div className="btt-module-card">
                <div>
                  <div className="btt-card-header">
                    <h4 className="btt-card-title">
                      <span>🔮</span> {data?.dailyBuffs?.current?.name || 'Daily Buff'}
                    </h4>
                    <span className="btt-badge-tag btt-badge-green">Active</span>
                  </div>
                  
                  {data?.dailyBuffs?.current?.normal_buffs?.map((buff, idx) => (
                    <div className="btt-buff-item" key={idx}>
                      <span>+</span> {buff}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Chaos Chest */}
              <div className="btt-module-card">
                <div>
                  <div className="btt-card-header">
                    <h4 className="btt-card-title">
                      <span>🎁</span> Chaos Chest
                    </h4>
                    <span className="btt-badge-tag btt-badge-gold">Weekly</span>
                  </div>

                  {data?.chaosChest?.item ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                      {data.chaosChest.item.image_url && (
                        <img 
                          src={data.chaosChest.item.image_url} 
                          alt="Chaos Item" 
                          style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 700, color: '#fbbf24' }}>
                          {data.chaosChest.item.name || 'Featured Item'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          Live Rotation
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No item active</div>
                  )}
                </div>
              </div>

              {/* Card 3: Biomes */}
              <div className="btt-module-card">
                <div>
                  <div className="btt-card-header">
                    <h4 className="btt-card-title">
                      <span>🌲</span> Biome Rotation
                    </h4>
                    <span className="btt-badge-tag btt-badge-green">3-Hour</span>
                  </div>

                  <div style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                    <span style={{ color: '#94a3b8' }}>Current: </span>
                    <strong style={{ color: '#38bdf8' }}>{data?.biomes?.current || 'Adventure World'}</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}