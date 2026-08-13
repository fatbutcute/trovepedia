import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { depthsSoulsCalcContent } from '../components/guides/content/depthsSoulsCalc.content.js';

export default function DepthsSoulsCalculator() {
  const [soulsMode, setSoulsMode] = useState('normal');
  const [desiredSouls, setDesiredSouls] = useState('');
  const [sparklingKeys, setSparklingKeys] = useState('');
  const [customDepth, setCustomDepth] = useState('');
  const [isMonday, setIsMonday] = useState(false);
  const [isPatron, setIsPatron] = useState(false);

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const { langCode } = useLanguage();
  const c = depthsSoulsCalcContent[langCode] || depthsSoulsCalcContent.en;

  const handleCalculate = () => {
    setError(null);
    setResults(null);

    const desired = parseInt(desiredSouls) || 0;
    const sparkling = parseInt(sparklingKeys) || 0;

    if (desired <= 0) {
      setError(c.errValue);
      return;
    }

    let chestsPerRun = 3;
    if (soulsMode === 'custom') {
      const depth = parseInt(customDepth);
      if (!depth || depth < 170) {
        setError(c.errDepth);
        return;
      }
      chestsPerRun = Math.floor((depth - 170) / 3);
      if (chestsPerRun < 1) {
        setError(c.errNoChests);
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
        <div className={`calc-tab ${soulsMode === 'normal' ? 'active' : ''}`} onClick={() => { setSoulsMode('normal'); setResults(null); }}>{c.tabNormal}</div>
        <div className={`calc-tab ${soulsMode === 'custom' ? 'active' : ''}`} onClick={() => { setSoulsMode('custom'); setResults(null); }}>{c.tabCustom}</div>
      </div>

      <div className="calc-options-panel">
        <label className="calc-checkbox">
          <input type="checkbox" checked={isMonday} onChange={(e) => { setIsMonday(e.target.checked); setResults(null); }} />
          {c.isMonday}
        </label>
        <label className="calc-checkbox">
          <input type="checkbox" checked={isPatron} onChange={(e) => { setIsPatron(e.target.checked); setResults(null); }} />
          {c.isPatron}
        </label>
      </div>

      <div className="calc-field">
        <label>{c.desiredSouls}</label>
        <input type="number" value={desiredSouls} onChange={(e) => setDesiredSouls(e.target.value)} placeholder="e.g. 1675" className="calc-input" />
      </div>

      <div className="calc-field">
        <label>{c.sparkKeys}</label>
        <input type="number" value={sparklingKeys} onChange={(e) => setSparklingKeys(e.target.value)} placeholder="e.g. 10" className="calc-input" />
      </div>

      {soulsMode === 'custom' && (
        <div className="calc-field">
          <label>{c.customDepthLabel}</label>
          <input type="number" value={customDepth} onChange={(e) => setCustomDepth(e.target.value)} placeholder="e.g. 179" className="calc-input" />
        </div>
      )}

      <button className="calc-submit-btn" onClick={handleCalculate} style={{ marginTop: '22px' }}>{c.calculate}</button>

      {error && <div className="calc-error">⚠ {error}</div>}

      {results && (
        <div className="calc-result">
          <div className="calc-result-row">
            <span className="label">{c.soulsKeys}</span>
            <span className="value">~{results.fromKeys.toFixed(1)}</span>
          </div>
          <div className="calc-result-row">
            <span className="label">{c.soulsChests}</span>
            <span className="value">{results.fromChests}</span>
          </div>
          <div className="calc-result-hero" style={{ marginTop: '14px' }}>
            <span className="hero-label">{c.runsNeeded}</span>
            <div className="hero-value">{results.runs}</div>
          </div>
        </div>
      )}
    </div>
  );
}