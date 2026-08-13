import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { dragonCoinCalcContent } from '../components/guides/content/dragonCoinCalc.content.js';

export default function DragonCoinCalculator() {
  const [calcMode, setCalcMode] = useState('hoursToCoins');
  const [isManual, setIsManual] = useState(false);
  const [averageHours, setAverageHours] = useState('');
  const [tome1, setTome1] = useState(false);
  const [tome2, setTome2] = useState(false);
  const [bench, setBench] = useState(false);
  const [patron, setPatron] = useState(false);
  const [desiredCoins, setDesiredCoins] = useState('');

  const { langCode } = useLanguage();
  const c = dragonCoinCalcContent[langCode] || dragonCoinCalcContent.en;

  const [manualHours, setManualHours] = useState({
    monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleManualChange = (e) => {
    setManualHours({ ...manualHours, [e.target.name]: e.target.value });
  };

  const calculateH2C = () => {
    setError(null);
    let hoursPerDay = [];
    if (!isManual) {
      hoursPerDay = Array(7).fill(parseFloat(averageHours) || 0);
    } else {
      hoursPerDay = Object.keys(manualHours).map(day => parseFloat(manualHours[day]) || 0);
    }

    const t1Bonus = tome1 ? 15 : 0;
    const t2Bonus = tome2 ? 25 : 0;
    const benchBonus = bench ? 15 : 0;

    let totalCoins = 0, totalCaches = 0;
    hoursPerDay.forEach((hours, index) => {
      if (hours <= 0) return;
      const challenges = Math.floor(hours);
      let dailyBonus = challenges * 2;
      let cacheCount = challenges * 2;
      let firstBonus = 5;

      if (index === 4) {
        const multiplier = patron ? 3 : 2;
        dailyBonus *= multiplier;
        cacheCount *= multiplier;
        firstBonus *= multiplier;
      }
      totalCoins += dailyBonus + firstBonus;
      totalCaches += cacheCount;
    });

    const cacheBonus = totalCaches;
    const karmaBonus = Math.floor(totalCaches / 35) * 25;
    totalCoins += cacheBonus + t1Bonus + t2Bonus + benchBonus + karmaBonus;

    setResults({
      type: 'h2c',
      estimatedCoins: Math.floor(totalCoins),
      details: `Base: ${Math.floor(totalCoins - t1Bonus - t2Bonus - benchBonus - karmaBonus - cacheBonus)} · Caches: +${cacheBonus} · Tomes & Bench: +${t1Bonus + t2Bonus + benchBonus} · Karma: +${karmaBonus}`
    });
  };

  const calculateC2H = () => {
    setError(null);
    const desired = parseFloat(desiredCoins) || 0;
    if (desired <= 0) {
      setError(c.errCoins);
      return;
    }

    const bonus = (tome1 ? 15 : 0) + (tome2 ? 25 : 0) + (bench ? 15 : 0);
    let remaining = desired - bonus;

    if (remaining <= 0) {
      setResults({ type: 'c2h', hours: 0, details: c.goalCovered });
      return;
    }

    const avgMultiplier = (6 * 1 + (patron ? 3 : 2)) / 7;
    const coinsPerHour = (2 * avgMultiplier) + (2 * avgMultiplier) + ((5 / 24) * avgMultiplier);
    let hours = remaining / coinsPerHour;
    let caches = hours * (2 * avgMultiplier);
    let karma = Math.floor(caches / 35) * 25;
    remaining -= karma;
    hours = remaining / coinsPerHour;

    setResults({
      type: 'c2h',
      hours: Math.ceil(hours),
      details: `Target: ${desired} · Bonuses: -${bonus} · Karma: -${karma}`
    });
  };

  return (
    <div className="react-calc-wrapper" style={{ '--calc-accent': '#ff4444', '--calc-accent-rgb': '255,68,68' }}>
      <div className="calc-tabs">
        <div className={`calc-tab ${calcMode === 'hoursToCoins' ? 'active' : ''}`} onClick={() => { setCalcMode('hoursToCoins'); setResults(null); }}>{c.tabH2C}</div>
        <div className={`calc-tab ${calcMode === 'coinsToHours' ? 'active' : ''}`} onClick={() => { setCalcMode('coinsToHours'); setResults(null); }}>{c.tabC2H}</div>
      </div>

      <div className="calc-options-panel">
        <label className="calc-checkbox"><input type="checkbox" checked={tome1} onChange={(e) => setTome1(e.target.checked)} /> {c.tome1}</label>
        <label className="calc-checkbox"><input type="checkbox" checked={tome2} onChange={(e) => setTome2(e.target.checked)} /> {c.tome2}</label>
        <label className="calc-checkbox"><input type="checkbox" checked={bench} onChange={(e) => setBench(e.target.checked)} /> {c.bench}</label>
        <label className="calc-checkbox"><input type="checkbox" checked={patron} onChange={(e) => setPatron(e.target.checked)} /> {c.patron}</label>
      </div>

      {calcMode === 'hoursToCoins' ? (
        <>
          <button type="button" className="calc-link-btn" onClick={() => setIsManual(!isManual)}>
            {isManual ? c.switchAverage : c.switchManual}
          </button>

          {!isManual ? (
            <div className="calc-field">
              <label>{c.avgPlaytime}</label>
              <input type="number" value={averageHours} onChange={(e) => setAverageHours(e.target.value)} placeholder="e.g. 3" className="calc-input" />
            </div>
          ) : (
            <div className="calc-day-grid" style={{ marginBottom: '22px' }}>
              {Object.keys(manualHours).map(day => (
                <div className="calc-field" key={day} style={{ marginBottom: 0 }}>
                  <label>{c.days[day] || day}</label>
                  <input type="number" name={day} value={manualHours[day]} onChange={handleManualChange} placeholder="0" className="calc-input" />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="calc-field">
          <label>{c.desiredCoins}</label>
          <input type="number" value={desiredCoins} onChange={(e) => setDesiredCoins(e.target.value)} placeholder="e.g. 300" className="calc-input" />
        </div>
      )}

      <button className="calc-submit-btn" onClick={calcMode === 'hoursToCoins' ? calculateH2C : calculateC2H} style={{ marginTop: '22px' }}>{c.calculate}</button>

      {error && <div className="calc-error">⚠ {error}</div>}

      {results && (
        <div className="calc-result">
          <div className="calc-result-hero">
            <span className="hero-label">{results.type === 'h2c' ? c.estimatedCoins : c.estimatedHours}</span>
            <div className="hero-value">{results.type === 'h2c' ? results.estimatedCoins.toLocaleString() : results.hours}</div>
          </div>
          <p className="calc-result-note">{results.details}</p>
        </div>
      )}
    </div>
  );
}