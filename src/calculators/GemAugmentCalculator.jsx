import React, { useState } from 'react';

export default function GemAugmentCalculator() {
  const [augmentType, setAugmentType] = useState('rough');
  const [statPercents, setStatPercents] = useState({ stat1: '', stat2: '', stat3: '' });
  const [boosts, setBoosts] = useState({ stat1: 0, stat2: 0, stat3: 0 });
  const [results, setResults] = useState(null);

  const handlePercentChange = (e) => {
    let val = parseFloat(e.target.value) || 0;
    val = Math.min(100, Math.max(0, val));
    setStatPercents({ ...statPercents, [e.target.name]: val });
  };

  const handleCircleClick = (statKey, clickedBoost) => {
    setBoosts({
      ...boosts,
      [statKey]: boosts[statKey] === clickedBoost ? clickedBoost - 1 : clickedBoost
    });
  };

  const calculateAugments = () => {
    const p1 = parseFloat(statPercents.stat1) || 0;
    const p2 = parseFloat(statPercents.stat2) || 0;
    const p3 = parseFloat(statPercents.stat3) || 0;

    const m1 = boosts.stat1 + 1;
    const m2 = boosts.stat2 + 1;
    const m3 = boosts.stat3 + 1;

    const totalCompletion = (p1 * m1) + (p2 * m2) + (p3 * m3);
    const totalMultiplier = m1 + m2 + m3;

    const maxCompletion = totalMultiplier * 100;
    const completionPercent = maxCompletion > 0 ? (totalCompletion / maxCompletion) * 100 : 0;

    const totalAugmentsMap = { rough: 240, precise: 120, superior: 48 };
    const totalAugments = totalAugmentsMap[augmentType];
    const remainingPercent = 100 - completionPercent;
    const neededAugments = Math.ceil(totalAugments * (Math.max(0, remainingPercent) / 100));

    setResults({ completion: completionPercent, needed: neededAugments });
  };

  const statLabels = { stat1: 'Stat 1', stat2: 'Stat 2', stat3: 'Stat 3' };

  const renderDots = (statKey) => (
    <div className="calc-boost-dots">
      {[1, 2, 3].map(num => (
        <div
          key={num}
          className={`calc-boost-dot ${num <= boosts[statKey] ? 'active' : ''}`}
          onClick={() => handleCircleClick(statKey, num)}
        />
      ))}
    </div>
  );

  return (
    <div className="react-calc-wrapper" style={{ '--calc-accent': '#00d2ff', '--calc-accent-rgb': '0,210,255' }}>
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9499c3', marginBottom: '8px' }}>
          Select Focus / Augment Focus Type:
        </label>
        <div className="calc-tabs">
          <div 
            className={`calc-tab ${augmentType === 'rough' ? 'active' : ''}`} 
            onClick={() => setAugmentType('rough')}
          >
            Rough Focus
          </div>
          <div 
            className={`calc-tab ${augmentType === 'precise' ? 'active' : ''}`} 
            onClick={() => setAugmentType('precise')}
          >
            Precise Focus
          </div>
          <div 
            className={`calc-tab ${augmentType === 'superior' ? 'active' : ''}`} 
            onClick={() => setAugmentType('superior')}
          >
            Superior Focus
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
        {['stat1', 'stat2', 'stat3'].map((statKey) => (
          <div key={statKey} className="calc-stat-card">
            <div className="calc-stat-card-header">
              <label>{statLabels[statKey]} Percentage</label>
              {renderDots(statKey)}
            </div>
            <input
              type="number"
              name={statKey}
              value={statPercents[statKey]}
              onChange={handlePercentChange}
              placeholder="0 – 100"
              className="calc-input"
            />
          </div>
        ))}
      </div>

      <button className="calc-submit-btn" onClick={calculateAugments}>Calculate</button>

      {results && (
        <div className="calc-result">
          <div className="calc-result-row">
            <span className="label">Total Gem Completion</span>
            <span className="value">{results.completion.toFixed(2)}%</span>
          </div>
          <div className="calc-result-hero" style={{ marginTop: '14px' }}>
            <span className="hero-label">Materials Needed</span>
            <div className="hero-value">≈ {results.needed}</div>
          </div>
        </div>
      )}
    </div>
  );
}