import React, { useState } from 'react';

export default function TrunkDropCalculator() {
  const [calcMode, setCalcMode] = useState('itemsExpected');
  const [inputValue, setInputValue] = useState('');
  const [confidenceVal, setConfidenceVal] = useState('95');
  const [selectedResources, setSelectedResources] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(null);

  const dropRates = { souls: 0.05, core: 0.0657, fishBone: 0.0569, runicEssence: 0.0932, depthsSand: 0.0593, zephyrEssence: 0.0853, pyricEssence: 0.0964, abyssalEssence: 0.1043, inkBladder: 0.0514 };
  const resourceNames = { souls: 'Depths Souls', core: 'Depths Core', fishBone: 'Fish Bone', runicEssence: 'Runic Essence', depthsSand: 'Depths Sand', zephyrEssence: 'Zephyr Essence', pyricEssence: 'Pyric Essence', abyssalEssence: 'Abyssal Essence', inkBladder: 'Ink Bladder' };

  function phiInv(p) {
    if (p <= 0 || p >= 1) return 0;
    const a1=-39.6968302866538,a2=220.946098424521,a3=-275.928510446969,a4=138.357751867269,a5=-30.6647980661472,a6=2.50662827745924;
    const b1=-54.4760987982241,b2=161.585836858041,b3=-155.698979859887,b4=66.8013118877197,b5=-13.2806815528857;
    const c1=-.00778489400243029,c2=-.322396458041136,c3=-2.40075827716184,c4=-2.54973253934373,c5=4.37466414146497,c6=2.93816398269878;
    const d1=.00778469570904146,d2=.32246712907004,d3=2.445134137143,d4=3.75440866190742;
    const p_low=.02425,p_high=1-p_low;
    let q,r,retVal;
    if(p<p_low){q=Math.sqrt(-2*Math.log(p));retVal=(((((c1*q+c2)*q+c3)*q+c4)*q+c5)*q+c6)/((((d1*q+d2)*q+d3)*q+d4)*q+1)}
    else if(p<=p_high){q=p-0.5;r=q*q;retVal=(((((a1*r+a2)*r+a3)*r+a4)*r+a5)*r+a6)*q/(((((b1*r+b2)*r+b3)*r+b4)*r+b5)*r+1)}
    else{q=Math.sqrt(-2*Math.log(1-p));retVal=-(((((c1*q+c2)*q+c3)*q+c4)*q+c5)*q+c6)/((((d1*q+d2)*q+d3)*q+d4)*q+1)}
    return retVal;
  }

  function calculateTrunksNeeded(amount, p, confidence) {
    const q=1-confidence,Z=phiInv(q),A=p,B=amount,C=1-p,D=Z*Z;
    const a=A*A,b=-(2*A*B+D*A*C),c=B*B;
    const discriminant=b*b-4*a*c;
    if(discriminant<0) return null;
    const n=Math.max((-b+Math.sqrt(discriminant))/(2*a),(-b-Math.sqrt(discriminant))/(2*a));
    return n>0?Math.ceil(n):null;
  }

  const toggleResource = (key) => {
    setSelectedResources(selectedResources.includes(key)
      ? selectedResources.filter(r => r !== key)
      : [...selectedResources, key]);
  };

  const handleCalculate = () => {
    setError(null);
    setOutputs([]);

    if (selectedResources.length === 0) {
      setError('Please select at least one resource.');
      return;
    }

    const inputVal = parseFloat(inputValue);
    if (isNaN(inputVal) || inputVal <= 0) {
      setError('Please enter a positive amount.');
      return;
    }

    let resultsArray = [];
    selectedResources.forEach(resKey => {
      const p = dropRates[resKey];
      const resName = resourceNames[resKey];

      if (calcMode === 'itemsExpected') {
        const expected = inputVal * p;
        resultsArray.push({ label: resName, value: `~${expected.toFixed(2)}` });
      } else {
        const confidence = parseFloat(confidenceVal) / 100;
        const trunksNeeded = calculateTrunksNeeded(inputVal, p, confidence);
        const resultText = (trunksNeeded === null) ? 'No solution found' : `${trunksNeeded.toLocaleString()} Trunks`;
        resultsArray.push({ label: resName, value: resultText });
      }
    });

    setOutputs(resultsArray);
  };

  return (
    <div className="react-calc-wrapper" style={{ '--calc-accent': '#7b42f5', '--calc-accent-rgb': '123,66,245' }}>
      <div className="calc-tabs">
        <div className={`calc-tab ${calcMode === 'itemsExpected' ? 'active' : ''}`} onClick={() => { setCalcMode('itemsExpected'); setOutputs([]); }}>Expected Items</div>
        <div className={`calc-tab ${calcMode === 'trunksNeeded' ? 'active' : ''}`} onClick={() => { setCalcMode('trunksNeeded'); setOutputs([]); }}>Trunks Needed</div>
      </div>

      <div className="calc-toggle-grid">
        {Object.keys(resourceNames).map(key => (
          <div
            key={key}
            className={`calc-toggle-btn ${selectedResources.includes(key) ? 'active' : ''}`}
            onClick={() => toggleResource(key)}
          >
            {resourceNames[key]}
          </div>
        ))}
      </div>

      <div className="calc-field">
        <label>{calcMode === 'itemsExpected' ? 'Number of Trunks' : 'Desired Amount'}</label>
        <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="e.g. 100" className="calc-input" />
      </div>

      {calcMode === 'trunksNeeded' && (
        <div className="calc-field">
          <label>Confidence Level (%)</label>
          <input type="number" value={confidenceVal} onChange={(e) => setConfidenceVal(e.target.value)} className="calc-input" />
        </div>
      )}

      <button className="calc-submit-btn" onClick={handleCalculate} style={{ marginTop: '22px' }}>Calculate</button>

      {error && <div className="calc-error">⚠ {error}</div>}

      {outputs.length > 0 && (
        <div className="calc-result">
          {outputs.map((out, idx) => (
            <div key={idx} className="calc-result-row">
              <span className="label">{out.label}</span>
              <span className="value">{out.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}