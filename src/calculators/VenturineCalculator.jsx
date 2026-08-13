import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { venturineCalcContent } from '../components/guides/content/venturineCalc.content.js';

export default function VenturineCalculator() {
  const [mode, setMode] = useState('v2s');
  const [inputs, setInputs] = useState({
    v: '', s: '', current: '', desired: '', cost: '', desiredFromCost: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const { langCode } = useLanguage();
  const c = venturineCalcContent[langCode] || venturineCalcContent.en;

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
        if (isNaN(v) || v < 0) throw new Error(c.errVenturine);
        let cost = 0, i = 0;
        while (cost <= v) {
          cost += 7 + Math.floor(i / 4);
          if (cost > v) break;
          i++;
        }
        message = c.msgV2S(i, v.toLocaleString());
      } 
      else if (mode === "s2v") {
        const s = parseInt(inputs.s);
        if (isNaN(s) || s < 0) throw new Error(c.errSignets);
        let total = 0;
        for (let i = 0; i < s; i++) total += 7 + Math.floor(i / 4);
        message = c.msgS2V(total.toLocaleString(), s);
      } 
      else if (mode === "continue") {
        const current = parseInt(inputs.current);
        const desired = parseInt(inputs.desired);
        if (isNaN(current) || current < 0 || isNaN(desired) || desired < 1) throw new Error(c.errValid);
        let total = 0;
        for (let i = current; i < current + desired; i++) total += 7 + Math.floor(i / 4);
        message = c.msgContinue(total.toLocaleString(), desired);
      } 
      else if (mode === "fromCost") {
        const cost = parseInt(inputs.cost);
        const desired = parseInt(inputs.desiredFromCost);
        if (isNaN(cost) || cost < 7 || isNaN(desired) || desired < 1) throw new Error(c.errValid);
        const tier = cost - 7;
        let currentCraft = tier * 4, needed = 0;
        for (let i = 0; i < desired; i++) needed += 7 + Math.floor((currentCraft + i) / 4);
        message = c.msgFromCost(desired, needed.toLocaleString());
      }
      setResult(message);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="react-calc-wrapper">
      
      <div className="calc-tabs">
        <div className={`calc-tab ${mode === 'v2s' ? 'active' : ''}`} onClick={() => { setMode('v2s'); setResult(null); setError(null); }}>{c.tabV2S}</div>
        <div className={`calc-tab ${mode === 's2v' ? 'active' : ''}`} onClick={() => { setMode('s2v'); setResult(null); setError(null); }}>{c.tabS2V}</div>
        <div className={`calc-tab ${mode === 'continue' ? 'active' : ''}`} onClick={() => { setMode('continue'); setResult(null); setError(null); }}>{c.tabContinue}</div>
        <div className={`calc-tab ${mode === 'fromCost' ? 'active' : ''}`} onClick={() => { setMode('fromCost'); setResult(null); setError(null); }}>{c.tabFromCost}</div>
      </div>

      <div className="calc-desktop-layout">
        
        <div className="calc-form-pane">
          <div className="calc-inputs" style={{ marginBottom: '20px' }}>
            
            {mode === 'v2s' && (
              <div className="calc-field">
                <label>{c.labelVenturine}</label>
                <input type="number" name="v" value={inputs.v} onChange={handleInputChange} placeholder="e.g. 500" className="calc-input" />
              </div>
            )}

            {mode === 's2v' && (
              <div className="calc-field">
                <label>{c.labelDesiredSignets}</label>
                <input type="number" name="s" value={inputs.s} onChange={handleInputChange} placeholder="e.g. 10" className="calc-input" />
              </div>
            )}

            {mode === 'continue' && (
              <div className="calc-grid-2">
                <div className="calc-field">
                  <label>{c.labelCurrentCrafted}</label>
                  <input type="number" name="current" value={inputs.current} onChange={handleInputChange} placeholder="0" className="calc-input" />
                </div>
                <div className="calc-field">
                  <label>{c.labelDesiredAdditional}</label>
                  <input type="number" name="desired" value={inputs.desired} onChange={handleInputChange} placeholder="5" className="calc-input" />
                </div>
              </div>
            )}

            {mode === 'fromCost' && (
              <div className="calc-grid-2">
                <div className="calc-field">
                  <label>{c.labelCurrentCost}</label>
                  <input type="number" name="cost" value={inputs.cost} onChange={handleInputChange} placeholder="e.g. 7" className="calc-input" />
                </div>
                <div className="calc-field">
                  <label>{c.labelDesiredSignets}</label>
                  <input type="number" name="desiredFromCost" value={inputs.desiredFromCost} onChange={handleInputChange} placeholder="10" className="calc-input" />
                </div>
              </div>
            )}

          </div>

          <button className="calc-submit-btn" onClick={calculate}>{c.calculate}</button>
        </div>

        <div className="calc-result-pane">
          {error && <div className="calc-error">⚠️ {error}</div>}

          {!result && !error && (
            <div className="calc-result-row" style={{ justifyContent: 'center', border: 'none', padding: '40px 0', opacity: 0.5 }}>
              <span className="label" style={{ textAlign: 'center' }}>{c.placeholderResult}</span>
            </div>
          )}

          {result && (
            <div className="calc-result">
              <div className="calc-result-hero">
                <span className="hero-label">{c.materialsNeeded}</span>
                <div className="hero-value" dangerouslySetInnerHTML={{ __html: result }} />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}