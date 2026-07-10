import React, { useState } from 'react';

export default function PrCalculator() {
  const empoweredPRLevels = {15:2011,16:2053,17:2095,18:2137,19:2179,20:2284,21:2326,22:2368,23:2410,24:2452,25:2557,26:2599,27:2641,28:2683,29:2725,30:2830};
  const lesserPRLevels = {15:1731,16:1773,17:1815,18:1857,19:1899,20:2004,21:2046,22:2088,23:2130,24:2172,25:2277,26:2319,27:2361,28:2403,29:2445,30:2550};
  const gemLevels = [0, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  const [level30, setLevel30] = useState(true);
  const [subclass, setSubclass] = useState(true);
  const [emblems, setEmblems] = useState(true);

  const [inputs, setInputs] = useState({
    torch: '', ring: '', ally: '', mastery: '', geode: '', dragons: '', face: '', weapon: '', hat: ''
  });

  const [gemCache, setGemCache] = useState({
    water: { emp: 0, lesser1: 0, lesser2: 0 },
    air: { emp: 0, lesser1: 0, lesser2: 0 },
    fire: { emp: 0, lesser1: 0, lesser2: 0 },
    cosmic: { emp: 0, lesser1: 0, lesser2: 0 }
  });

  const [selectedDragons, setSelectedDragons] = useState([]);
  const [activeModalGem, setActiveModalGem] = useState(null);
  const [totalPR, setTotalPR] = useState(0);

  const inputLabels = { torch: 'Torch', ring: 'Ring', ally: 'Ally', mastery: 'Mastery', geode: 'Geode', dragons: 'Dragons', face: 'Face', weapon: 'Weapon', hat: 'Hat' };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const toggleDragon = (type) => {
    setSelectedDragons(selectedDragons.includes(type)
      ? selectedDragons.filter(t => t !== type)
      : [...selectedDragons, type]);
  };

  const calculateTotalPR = () => {
    let total = 0;
    const getVal = (val) => parseInt(val) || 0;

    if (level30) total += 450;
    if (subclass) total += 90;
    if (emblems) total += 150;

    total += getVal(inputs.torch) + getVal(inputs.ring) + getVal(inputs.ally);

    Object.keys(gemCache).forEach(type => {
      const { emp, lesser1, lesser2 } = gemCache[type];
      let basePR = (empoweredPRLevels[emp] || 0) + (lesserPRLevels[lesser1] || 0) + (lesserPRLevels[lesser2] || 0);
      if (selectedDragons.includes(type) && basePR > 0) {
        basePR += Math.min(Math.floor(basePR * 0.10), 793);
      }
      total += basePR;
    });

    const mastery = getVal(inputs.mastery);
    total += mastery <= 500 ? mastery * 4 : 2000 + (mastery - 500);
    total += Math.min(getVal(inputs.geode), 100) * 5;
    total += getVal(inputs.dragons) * 30;
    total += getVal(inputs.face) + getVal(inputs.weapon) + getVal(inputs.hat);

    setTotalPR(total);
  };

  return (
    <div className="react-calc-wrapper" style={{ '--calc-accent': '#e8b84b', '--calc-accent-rgb': '232,184,75' }}>
      <div className="calc-options-panel">
        <label className="calc-checkbox"><input type="checkbox" checked={level30} onChange={e => setLevel30(e.target.checked)} /> Level 30 (+450 PR)</label>
        <label className="calc-checkbox"><input type="checkbox" checked={subclass} onChange={e => setSubclass(e.target.checked)} /> Subclass (+90 PR)</label>
        <label className="calc-checkbox"><input type="checkbox" checked={emblems} onChange={e => setEmblems(e.target.checked)} /> Emblems (+150 PR)</label>
      </div>

      <p className="calc-section-label" style={{ color: '#9499c3', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Gem Levels Setup (tap to edit)
      </p>
      <div className="calc-toggle-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {Object.keys(gemCache).map(type => (
          <div key={type} className="calc-toggle-btn" onClick={() => setActiveModalGem(type)} style={{ textTransform: 'capitalize' }}>
            💎 {type}
          </div>
        ))}
      </div>

      <p className="calc-section-label" style={{ color: '#9499c3', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
        Primordial Dragons Unlocked (+10% Gem PR)
      </p>
      <div className="calc-toggle-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {['water', 'air', 'fire', 'cosmic'].map(type => (
          <div
            key={type}
            className={`calc-toggle-btn ${selectedDragons.includes(type) ? 'active' : ''}`}
            onClick={() => toggleDragon(type)}
            style={{ textTransform: 'capitalize' }}
          >
            🐲 {type}
          </div>
        ))}
      </div>

      <div className="calc-input-grid">
        {Object.keys(inputs).map(key => (
          <div key={key} className="calc-field" style={{ marginBottom: 0 }}>
            <label>{inputLabels[key]}</label>
            <input type="number" name={key} value={inputs[key]} onChange={handleInputChange} placeholder="0" className="calc-input" />
          </div>
        ))}
      </div>

      <button className="calc-submit-btn" onClick={calculateTotalPR}>Calculate Power Rank</button>

      <div className="calc-result">
        <div className="calc-result-hero">
          <span className="hero-label">Total Power Rank</span>
          <div className="hero-value">{totalPR.toLocaleString()}</div>
        </div>
      </div>

{/* ── BRUTÁLISAN MENŐ GEM SZERKESZTŐ SUB-MODAL ── */}
      {activeModalGem && (
        <div className="calc-submodal-overlay" onClick={() => setActiveModalGem(null)}>
          <div className="calc-submodal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>✨ {activeModalGem} Gem Settings</h3>
              <button 
                onClick={() => setActiveModalGem(null)} 
                style={{ background: 'none', border: 'none', color: '#9499c3', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            
            {['emp', 'lesser1', 'lesser2'].map(slot => (
              <div key={slot} className="calc-field" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: '#e8b84b', letterSpacing: '1px' }}>
                  {slot === 'emp' ? '👑 Empowered Gem' : slot === 'lesser1' ? '💎 Lesser Gem 1' : '💎 Lesser Gem 2'}:
                </label>
                
                {/* Custom Menő Rács a legördülő menü helyett */}
                <div className="calc-premium-matrix">
                  <button
                    type="button"
                    className={`matrix-item none-btn ${gemCache[activeModalGem][slot] === 0 ? 'active' : ''}`}
                    onClick={() => {
                      setGemCache({
                        ...gemCache,
                        [activeModalGem]: { ...gemCache[activeModalGem], [slot]: 0 }
                      });
                    }}
                  >
                    Unequipped
                  </button>
                  
                  {gemLevels.filter(lvl => lvl !== 0).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      className={`matrix-item ${gemCache[activeModalGem][slot] === lvl ? 'active' : ''}`}
                      onClick={() => {
                        setGemCache({
                          ...gemCache,
                          [activeModalGem]: { ...gemCache[activeModalGem], [slot]: lvl }
                        });
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <button className="calc-submit-btn" style={{ marginTop: '15px', marginBottom: 0 }} onClick={() => setActiveModalGem(null)}>
              Apply Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}