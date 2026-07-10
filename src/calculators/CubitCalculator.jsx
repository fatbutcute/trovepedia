import React, { useState } from 'react';

export default function CubitCalculator() {
  const [mode, setMode] = useState('daysToRewards');
  const [patron, setPatron] = useState(false);
  const [doubleStarWeek, setDoubleStarWeek] = useState(true);
  const [daysInput, setDaysInput] = useState('');
  const [desiredCubit, setDesiredCubit] = useState('');
  const [desiredDragonite, setDesiredDragonite] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const baseCubit = 900;
  const baseDragonite = 5;

  const handleCalculate = () => {
    setError(null);
    setResults(null);
    const patronMultiplier = patron ? 3 : 1;

    if (mode === 'daysToRewards') {
      const days = parseInt(daysInput);
      if (isNaN(days) || days < 1) {
        setError('Please enter a valid number of days.');
        return;
      }

      const doubleBlocks = Math.floor(days / 30);
      const doubleDays = doubleStarWeek ? doubleBlocks * 7 : 0;
      const normalDays = days - doubleDays;

      const totalCubit = (doubleDays * baseCubit * 2 + normalDays * baseCubit) * patronMultiplier;
      const totalDragonite = (doubleDays * baseDragonite * 2 + normalDays * baseDragonite) * patronMultiplier;

      setResults({ type: 'rewards', cubit: totalCubit, dragonite: totalDragonite });
    } else {
      const targetCubit = parseInt(desiredCubit) || 0;
      const targetDrag = parseInt(desiredDragonite) || 0;

      if (targetCubit <= 0 && targetDrag <= 0) {
        setError('Please enter a desired amount.');
        return;
      }

      let days = 0;
      let currentCubit = 0;
      let currentDrag = 0;

      while ((currentCubit < targetCubit || currentDrag < targetDrag) && days < 10000) {
        days++;
        const doubleBlocks = Math.floor(days / 30);
        const doubleDays = doubleStarWeek ? doubleBlocks * 7 : 0;
        const normalDays = days - doubleDays;

        currentCubit = (doubleDays * baseCubit * 2 + normalDays * baseCubit) * patronMultiplier;
        currentDrag = (doubleDays * baseDragonite * 2 + normalDays * baseDragonite) * patronMultiplier;
      }

      setResults({ type: 'days', daysNeeded: days });
    }
  };

  return (
    <div className="react-calc-wrapper" style={{ '--calc-accent': '#00d2ff', '--calc-accent-rgb': '0,210,255' }}>
      <div className="calc-tabs">
        <div className={`calc-tab ${mode === 'daysToRewards' ? 'active' : ''}`} onClick={() => { setMode('daysToRewards'); setResults(null); }}>Days → Rewards</div>
        <div className={`calc-tab ${mode === 'rewardsToDays' ? 'active' : ''}`} onClick={() => { setMode('rewardsToDays'); setResults(null); }}>Rewards → Days</div>
      </div>

      <div className="calc-options-panel">
        <label className="calc-checkbox">
          <input type="checkbox" checked={patron} onChange={(e) => setPatron(e.target.checked)} />
          Active Patron Status (3x)
        </label>
        {mode === 'daysToRewards' && (
          <label className="calc-checkbox">
            <input type="checkbox" checked={doubleStarWeek} onChange={(e) => setDoubleStarWeek(e.target.checked)} />
            Include Double Star Weeks
          </label>
        )}
      </div>

      {mode === 'daysToRewards' ? (
        <div className="calc-field">
          <label>Number of Days</label>
          <input type="number" value={daysInput} onChange={(e) => setDaysInput(e.target.value)} placeholder="e.g. 30" className="calc-input" />
        </div>
      ) : (
        <div className="calc-grid-2">
          <div className="calc-field">
            <label>Desired Cubits</label>
            <input type="number" value={desiredCubit} onChange={(e) => setDesiredCubit(e.target.value)} placeholder="e.g. 25000" className="calc-input" />
          </div>
          <div className="calc-field">
            <label>Desired Dragonite</label>
            <input type="number" value={desiredDragonite} onChange={(e) => setDesiredDragonite(e.target.value)} placeholder="e.g. 100" className="calc-input" />
          </div>
        </div>
      )}

      <button className="calc-submit-btn" onClick={handleCalculate} style={{ marginTop: '22px' }}>Calculate</button>

      {error && <div className="calc-error">⚠ {error}</div>}

      {results && (
        <div className="calc-result">
          {results.type === 'rewards' ? (
            <>
              <div className="calc-result-row">
                <span className="label">Total Cubits</span>
                <span className="value">{results.cubit.toLocaleString()}</span>
              </div>
              <div className="calc-result-hero" style={{ marginTop: '14px' }}>
                <span className="hero-label">Total Diamond Dragonite</span>
                <div className="hero-value">{results.dragonite.toLocaleString()}</div>
              </div>
            </>
          ) : (
            <div className="calc-result-hero">
              <span className="hero-label">Estimated Days Needed</span>
              <div className="hero-value">{results.daysNeeded}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}