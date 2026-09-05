import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { featuresContent } from './guides/content/features.content.js';

const BASE_FEATURES = [
  { id: 'guides', icon: '/icons/bookmark.png', accent: 'gold', path: '/guides' },
  { id: 'classes', icon: '/icons/sword.png', accent: 'green', path: '/classes' },
  { id: 'starchart', icon: '/icons/web.png', accent: 'cyan', path: '/starchart' },
  { id: 'hub', icon: '/icons/smart.png', accent: 'purple', path: '/hub' },
  { id: 'events', icon: '/icons/calendar.png', accent: 'red', path: '/event' },
  { id: 'calculators', icon: '/icons/calculator.png', accent: 'blue', path: '/calculators' },
];

export default function Features() {
  const navigate = useNavigate();
  const { langCode } = useLanguage();
  
  const c = featuresContent[langCode] || featuresContent.en;

  return (
    <section className='guides-landing'>
      <p className="section-label">{c.sectionLabel}</p>
      <h2 className="section-title">{c.sectionTitle}</h2>
      <p className="section-desc">{c.sectionDesc}</p>

      <div className="cards">
        {BASE_FEATURES.map(({ id, icon, accent, path }) => {
          const cardData = c.cards[id] || featuresContent.en.cards[id];

          return (
            <div
              key={id}
              className="card reveal"
              data-accent={accent}
              onClick={() => navigate(path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(path)}
            >
              <div className="card-icon">
                <img 
                  src={icon} 
                  alt={cardData.title} 
                  style={{ width: '35px', height: '35px', objectFit: 'contain' }} 
                />
              </div>
              
              <div className="card-title">{cardData.title}</div>
              <div className="card-desc">{cardData.desc}</div>
              <div className="card-arrow">{c.viewButton}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}