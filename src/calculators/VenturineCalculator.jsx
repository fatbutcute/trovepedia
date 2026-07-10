import React, { useState } from 'react';

export default function VenturineCalculator() {
  const [mode, setMode] = useState('v2s');
  const [inputs, setInputs] = useState({
    v: '', s: '', current: '', desired: '', cost: '', desiredFromCost: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    setError(null);
    setResult(null);

    try {
      let message = "";
      if (mode === "v2s") {
        const v = parseInt(inputs.v);
        if (isNaN(v) || v < 0) throw new Error("Enter a valid amount of Venturine.");
        let cost = 0, i = 0;
        while (cost <= v) {
          cost += 7 + Math.floor(i / 4);
          if (cost > v) break;
          i++;
        }
        message = `You can craft <strong>${i}</strong> Signets with <strong>${v.toLocaleString()}</strong> Venturine.`;
      } 
      else if (mode === "s2v") {
        const s = parseInt(inputs.s);
        if (isNaN(s) || s < 0) throw new Error("Enter a valid number of Signets.");
        let total = 0;
        for (let i = 0; i < s; i++) total += 7 + Math.floor(i / 4);
        message = `You need <strong>${total.toLocaleString()}</strong> Venturine to craft <strong>${s}</strong> Signets.`;
      } 
      else if (mode === "continue") {
        const current = parseInt(inputs.current);
        const desired = parseInt(inputs.desired);
        if (isNaN(current) || current < 0 || isNaN(desired) || desired < 1) throw new Error("Please enter valid values.");
        let total = 0;
        for (let i = current; i < current + desired; i++) total += 7 + Math.floor(i / 4);
        message = `You'll need <strong>${total.toLocaleString()}</strong> Venturine to craft <strong>${desired}</strong> more Signets.`;
      } 
      else if (mode === "fromCost") {
        const cost = parseInt(inputs.cost);
        const desired = parseInt(inputs.desiredFromCost);
        if (isNaN(cost) || cost < 7 || isNaN(desired) || desired < 1) throw new Error("Please enter valid values.");
        const tier = cost - 7;
        let currentCraft = tier * 4, needed = 0;
        for (let i = 0; i < desired; i++) needed += 7 + Math.floor((currentCraft + i) / 4);
        message = `To craft <strong>${desired}</strong> Signets you'll need: <strong>≈${needed.toLocaleString()}</strong> Venturine`;
      }
      setResult(message);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="react-calc-wrapper">
      
      {/* 1. MÓDVÁLASZTÓ TABOK (Claude-féle dögös dizájnnal) */}
      <div className="calc-tabs">
        <div className={`calc-tab ${mode === 'v2s' ? 'active' : ''}`} onClick={() => { setMode('v2s'); setResult(null); setError(null); }}>Venturine to Signets</div>
        <div className={`calc-tab ${mode === 's2v' ? 'active' : ''}`} onClick={() => { setMode('s2v'); setResult(null); setError(null); }}>Signets to Venturine</div>
        <div className={`calc-tab ${mode === 'continue' ? 'active' : ''}`} onClick={() => { setMode('continue'); setResult(null); setError(null); }}>Continue Crafting</div>
        <div className={`calc-tab ${mode === 'fromCost' ? 'active' : ''}`} onClick={() => { setMode('fromCost'); setResult(null); setError(null); }}>From Cost</div>
      </div>

      {/* 2. KÉTPANELES ELRENDEZÉS (PC-n egymás mellett, mobilon egymás alatt) */}
      <div className="calc-desktop-layout">
        
        {/* BAL PANEL: BEVITELI MEZŐK */}
        <div className="calc-form-pane">
          <div className="calc-inputs" style={{ marginBottom: '20px' }}>
            
            {mode === 'v2s' && (
              <div className="calc-field">
                <label>Amount of Venturine:</label>
                <input type="number" name="v" value={inputs.v} onChange={handleInputChange} placeholder="e.g. 500" className="calc-input" />
              </div>
            )}

            {mode === 's2v' && (
              <div className="calc-field">
                <label>Desired Signets:</label>
                <input type="number" name="s" value={inputs.s} onChange={handleInputChange} placeholder="e.g. 10" className="calc-input" />
              </div>
            )}

            {mode === 'continue' && (
              <div className="calc-grid-2">
                <div className="calc-field">
                  <label>Current Crafted:</label>
                  <input type="number" name="current" value={inputs.current} onChange={handleInputChange} placeholder="0" className="calc-input" />
                </div>
                <div className="calc-field">
                  <label>Desired Additional:</label>
                  <input type="number" name="desired" value={inputs.desired} onChange={handleInputChange} placeholder="5" className="calc-input" />
                </div>
              </div>
            )}

            {mode === 'fromCost' && (
              <div className="calc-grid-2">
                <div className="calc-field">
                  <label>Current Cost (Venturine):</label>
                  <input type="number" name="cost" value={inputs.cost} onChange={handleInputChange} placeholder="e.g. 7" className="calc-input" />
                </div>
                <div className="calc-field">
                  <label>Desired Signets:</label>
                  <input type="number" name="desiredFromCost" value={inputs.desiredFromCost} onChange={handleInputChange} placeholder="10" className="calc-input" />
                </div>
              </div>
            )}

          </div>

          <button className="calc-submit-btn" onClick={calculate}>Calculate</button>
        </div>

        {/* JOBB PANEL: EREDMÉNYEK */}
        <div className="calc-result-pane">
          {error && <div className="calc-error">⚠️ {error}</div>}

          {/* Dinamikus placeholder szöveg, ha még nem számolt semmit */}
          {!result && !error && (
            <div className="calc-result-row" style={{ justifyContent: 'center', border: 'none', padding: '40px 0', opacity: 0.5 }}>
              <span className="label" style={{ textAlign: 'center' }}>Enter values and hit Calculate to see results.</span>
            </div>
          )}

          {/* Ha van eredmény, az új .calc-result-hero dobozba töltjük be */}
          {result && (
            <div className="calc-result">
              <div className="calc-result-hero">
                <span className="hero-label">Materials Needed</span>
                <div className="hero-value" dangerouslySetInnerHTML={{ __html: result }} />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}