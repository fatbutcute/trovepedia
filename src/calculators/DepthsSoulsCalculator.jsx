import React, { useState } from 'react';

export default function DepthsSoulsCalculator() {
  const [soulsMode, setSoulsMode] = useState('normal');
  const [desiredSouls, setDesiredSouls] = useState('');
  const [sparklingKeys, setSparklingKeys] = useState('');
  const [customDepth, setCustomDepth] = useState('');
  const [isMonday, setIsMonday] = useState(false);
  const [isPatron, setIsPatron] = useState(false);

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResults(null);

    const desired = parseInt(desiredSouls) || 0;
    const sparkling = parseInt(sparklingKeys) || 0;

    if (desired <= 0) {
      setError('Please enter a valid desired value.');
      return;
    }

    let chestsPerRun = 3;
    if (soulsMode === 'custom') {
      const depth = parseInt(customDepth);
      if (!depth || depth < 170) {
        setError('Please enter a valid depth (170+).');
        return;
      }
      chestsPerRun = Math.floor((depth - 170) / 3);
      if (chestsPerRun < 1) {
        setError('No chests available at that depth.');
        return;
      }
    }

    const sparkleAvg = isMonday ? (isPatron ? 5 : 3.33) : 2.5;
    const regularAvg = isMonday ? (isPatron ? 3 : 2) : 1;
    const soulsFromSparkle = sparkling * sparkleAvg;
    const remainingSouls = desired - soulsFromSparkle;
    const chestsNeededRegular = remainingSouls > 0 ? remainingSouls / regularAvg : 0;
    const totalChests = sparkling + Math.ceil(chestsNeededRegular);
    const estimatedRuns = Math.ceil(totalChests / chestsPerRun);

    setResults({
      fromKeys: Math.max(0, soulsFromSparkle),
      fromChests: Math.max(0, Math.ceil(remainingSouls)),
      runs: estimatedRuns
    });
  };

  return (
    <div className="react-calc-wrapper" style={{ '--calc-accent': '#2ecc71', '--calc-accent-rgb': '46,204,113' }}>
      <div className="calc-tabs">
        <div className={`calc-tab ${soulsMode === 'normal' ? 'active' : ''}`} onClick={() => { setSoulsMode('normal'); setResults(null); }}>Normal (3 Chests/Run)</div>
        <div className={`calc-tab ${soulsMode === 'custom' ? 'active' : ''}`} onClick={() => { setSoulsMode('custom'); setResults(null); }}>Custom Depth</div>
      </div>

      <div className="calc-options-panel">
        <label className="calc-checkbox">
          <input type="checkbox" checked={isMonday} onChange={(e) => { setIsMonday(e.target.checked); setResults(null); }} />
          Is Monday? (Bonus Drops)
        </label>
        <label className="calc-checkbox">
          <input type="checkbox" checked={isPatron} onChange={(e) => { setIsPatron(e.target.checked); setResults(null); }} />
          Active Patron Status
        </label>
      </div>

      <div className="calc-field">
        <label>Desired Soul of the Depths</label>
        <input type="number" value={desiredSouls} onChange={(e) => setDesiredSouls(e.target.value)} placeholder="e.g. 1675" className="calc-input" />
      </div>

      <div className="calc-field">
        <label>Sparkling Keys Available</label>
        <input type="number" value={sparklingKeys} onChange={(e) => setSparklingKeys(e.target.value)} placeholder="e.g. 10" className="calc-input" />
      </div>

      {soulsMode === 'custom' && (
        <div className="calc-field">
          <label>Starting Delve Depth (170+)</label>
          <input type="number" value={customDepth} onChange={(e) => setCustomDepth(e.target.value)} placeholder="e.g. 179" className="calc-input" />
        </div>
      )}

      <button className="calc-submit-btn" onClick={handleCalculate} style={{ marginTop: '22px' }}>Calculate</button>

      {error && <div className="calc-error">⚠ {error}</div>}

      {results && (
        <div className="calc-result">
          <div className="calc-result-row">
            <span className="label">Souls from Keys</span>
            <span className="value">~{results.fromKeys.toFixed(1)}</span>
          </div>
          <div className="calc-result-row">
            <span className="label">Souls Needed from Chests</span>
            <span className="value">{results.fromChests}</span>
          </div>
          <div className="calc-result-hero" style={{ marginTop: '14px' }}>
            <span className="hero-label">Estimated Runs Needed</span>
            <div className="hero-value">{results.runs}</div>
          </div>
        </div>
      )}
    </div>
  );
}