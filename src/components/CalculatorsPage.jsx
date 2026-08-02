import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calculators.css';

import VenturineCalculator from '../calculators/VenturineCalculator';
import PrCalculator from '../calculators/PrCalculator';
import GemAugmentCalculator from '../calculators/GemAugmentCalculator';
import DragonCoinCalculator from '../calculators/DragonCoinCalculator';
import TrunkDropCalculator from '../calculators/TrunkDropCalculator';
import DepthsSoulsCalculator from '../calculators/DepthsSoulsCalculator';
import DepthsCoreCalculator from '../calculators/DepthsCoreCalculator';
import CubitCalculator from '../calculators/CubitCalculator';

const ACCENT_HEX = {
  gold: '#e8b84b',
  cyan: '#00d2ff',
  red: '#ff4444',
  purple: '#7b42f5',
  blue: '#0072ff',
  green: '#2ecc71'
};

const ACCENT_RGB = {
  gold: '232,184,75',
  cyan: '0,210,255',
  red: '255,68,68',
  purple: '123,66,245',
  blue: '0,114,255',
  green: '46,204,113'
};

const CALCULATORS = [
  { id: 'pr', title: 'Power Rank', desc: 'Calculate your maximum potential Power Rank.', icon: 'ri-vip-crown-line', color: 'gold', height: '830px', width: '860px' },
  { id: 'gem', title: 'Gem Augment', desc: 'Find out how many augments you need for 100%.', icon: 'ri-vip-diamond-line', color: 'cyan', height: 'auto', width: '600px' },
  { id: 'dragon', title: 'Dragon Coin', desc: 'Convert hours to coins or coins to hours.', icon: 'ri-fire-line', color: 'red', height: '650px', width: '600px' },
  { id: 'trunk', title: 'Trunk Drop', desc: 'Calculate expected drops from opening Trunks.', icon: 'ri-treasure-map-line', color: 'purple', height: '720px', width: '600px' },
  { id: 'venturine', title: 'Venturine', desc: 'Convert Venturine to Signets and vice versa.', icon: 'ri-coins-line', color: 'blue', height: '550px', width: '680px' },
  { id: 'depths-souls', title: 'Depths Souls', desc: 'Plan your Soul of the Depths farming.', icon: 'ri-ghost-line', color: 'green', height: '650px', width: '600px' },
  { id: 'depths-core', title: 'Depths Core', desc: 'Calculate required runs for Depths Cores.', icon: 'ri-coreos-line', color: 'gold', height: 'auto', width: '600px' },
  { id: 'cubit', title: 'Cubit & Dragonite', desc: 'Track your daily Cubits and Diamond Dragonite.', icon: 'ri-money-dollar-circle-line', color: 'cyan', height: 'auto', width: '600px' }
];

export default function CalculatorsPage() {
  const navigate = useNavigate();
  const [activeCalc, setActiveCalc] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveCalc(null);
      setIsClosing(false);
    }, 250);
  };

  const renderCalculator = () => {
    if (!activeCalc) return null;

    switch (activeCalc.id) {
      case 'venturine': return <VenturineCalculator />;
      case 'pr': return <PrCalculator />;
      case 'gem': return <GemAugmentCalculator />;
      case 'dragon': return <DragonCoinCalculator />;
      case 'trunk': return <TrunkDropCalculator />;
      case 'depths-souls': return <DepthsSoulsCalculator />;
      case 'depths-core': return <DepthsCoreCalculator />;
      case 'cubit': return <CubitCalculator />;
      default:
        return (
          <div className="calc-placeholder-text">
            <p>This calculator ({activeCalc.title}) is currently being converted to React.</p>
          </div>
        );
    }
  };

  return (
    <div className="page-wrapper calculators-page">
      <div className="calc-header-bg"></div>

      <section className="calc-container">
        <button className="btn btn-ghost" onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
          ← HOME
        </button>

        <h1 className="calc-title">Calculators</h1>
        <p className="calc-desc">
          Optimize your gameplay. From Power Rank to daily Cubits, calculate exactly what you need.
        </p>

        <div className="calc-grid">
          {CALCULATORS.map((calc, index) => (
            <div
              key={calc.id}
              className={`calc-card card-accent-${calc.color}`}
              onClick={() => setActiveCalc(calc)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="calc-icon"><i className={calc.icon}></i></div>
              <h3>{calc.title}</h3>
              <p>{calc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {activeCalc && (
        <div className={`calc-modal-overlay ${isClosing ? 'is-closing' : ''}`} onClick={handleCloseModal}>
          <div
            className="calc-modal-content calc-modal-wide"
            onClick={e => e.stopPropagation()}
            style={{
              '--calc-accent': ACCENT_HEX[activeCalc.color],
              '--calc-accent-rgb': ACCENT_RGB[activeCalc.color],
              '--calc-min-height': activeCalc.height || 'auto',
              '--calc-max-width': activeCalc.width || '600px', 
              margin: 'auto'
            }}
          >
            <button className="calc-modal-close" onClick={handleCloseModal}>×</button>

            <div className="calc-modal-header">
              <i className={activeCalc.icon}></i>
              <h2>{activeCalc.title} Calculator</h2>
            </div>

            <div className="calc-modal-body">
              {renderCalculator()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}