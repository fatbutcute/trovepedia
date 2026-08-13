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

import { useLanguage } from '../context/LanguageContext';
import { calculatorsPageContent } from './guides/content/calculatorsPage.content.js';

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

const BASE_CALCULATORS = [
  { id: 'pr', icon: 'ri-vip-crown-line', color: 'gold', height: '830px', width: '860px' },
  { id: 'gem', icon: 'ri-vip-diamond-line', color: 'cyan', height: 'auto', width: '600px' },
  { id: 'dragon', icon: 'ri-fire-line', color: 'red', height: '650px', width: '600px' },
  { id: 'trunk', icon: 'ri-treasure-map-line', color: 'purple', height: '720px', width: '600px' },
  { id: 'venturine', icon: 'ri-coins-line', color: 'blue', height: '550px', width: '680px' },
  { id: 'depths-souls', icon: 'ri-ghost-line', color: 'green', height: '650px', width: '600px' },
  { id: 'depths-core', icon: 'ri-coreos-line', color: 'gold', height: 'auto', width: '600px' },
  { id: 'cubit', icon: 'ri-money-dollar-circle-line', color: 'cyan', height: 'auto', width: '600px' }
];

export default function CalculatorsPage() {
  const navigate = useNavigate();
  const [activeCalc, setActiveCalc] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const { langCode } = useLanguage();
  const c = calculatorsPageContent[langCode] || calculatorsPageContent.en;

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
      default: return null;
    }
  };

  return (
    <div className="page-wrapper calculators-page">
      <div className="calc-header-bg"></div>

      <section className="calc-container">
        <button className="btn btn-ghost" onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
          {c.homeBtn}
        </button>

        <h1 className="calc-title">{c.title}</h1>
        <p className="calc-desc">{c.desc}</p>

        <div className="calc-grid">
          {BASE_CALCULATORS.map((calc, index) => {
            const cardInfo = c.cards[calc.id] || calculatorsPageContent.en.cards[calc.id];

            return (
              <div
                key={calc.id}
                className={`calc-card card-accent-${calc.color}`}
                onClick={() => setActiveCalc(calc)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="calc-icon"><i className={calc.icon}></i></div>
                <h3>{cardInfo.title}</h3>
                <p>{cardInfo.desc}</p>
              </div>
            );
          })}
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
              <h2>
                {(c.cards[activeCalc.id] || calculatorsPageContent.en.cards[activeCalc.id]).title} {c.modalSuffix}
              </h2>
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