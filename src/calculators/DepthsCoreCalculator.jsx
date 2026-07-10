import React, { useState } from 'react';

export default function DepthsCoreCalculator() {
  const [desiredCores, setDesiredCores] = useState('');
  const [sparkKeys, setSparkKeys] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setError(null);
    setResults(null);

    const cores = parseInt(desiredCores) || 0;
    let keys = parseInt(sparkKeys) || 0;
    if (keys < 0) keys = 0;

    if (cores <= 0) {
      setError('Please enter a valid number of cores.');
      return;
    }

    const maxKeysUsed = Math.min(keys, Math.floor(cores / 3));
    const coresFromKeys = maxKeysUsed * 3;
    const remainingCores = Math.max(0, cores - coresFromKeys);
    const normalRuns = remainingCores;
    const totalRuns = maxKeysUsed + normalRuns;

    setResults({
      keysUsed: maxKeysUsed,
      coresFromKeys: coresFromKeys,
      totalDungeons: Math.ceil(totalRuns)
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCalculate();
  };

  return (
    <div className="react-calc-wrapper" style={{ '--calc-accent': '#e8b84b', '--calc-accent-rgb': '232,184,75' }}>
      <div className="calc-field">
        <label>Desired Depths Cores</label>
        <input
          type="number"
          value={desiredCores}
          onChange={(e) => setDesiredCores(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 6500"
          className="calc-input"
        />
      </div>

      <div className="calc-field">
        <label>Sparkling Keys Available</label>
        <input
          type="number"
          value={sparkKeys}
          onChange={(e) => setSparkKeys(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 50"
          className="calc-input"
        />
      </div>

      <button className="calc-submit-btn" onClick={handleCalculate} style={{ marginTop: '22px' }}>Calculate</button>

      {error && <div className="calc-error">⚠ {error}</div>}

      {results && (
        <div className="calc-result">
          <div className="calc-result-row">
            <span className="label">Sparkling Keys Used</span>
            <span className="value">{results.keysUsed}</span>
          </div>
          <div className="calc-result-row">
            <span className="label">Cores from Keys</span>
            <span className="value">{results.coresFromKeys}</span>
          </div>
          <div className="calc-result-hero" style={{ marginTop: '14px' }}>
            <span className="hero-label">Total Dungeons Needed</span>
            <div className="hero-value">{results.totalDungeons}</div>
          </div>
        </div>
      )}
    </div>
  );
}