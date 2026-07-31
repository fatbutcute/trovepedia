import { useEffect, useState } from 'react'
import GuidesList from '../components/GuidesList'
import { useReveal } from '../hooks/useReveal'
import { useNavigate } from "react-router-dom"

export default function GuidesPage() {
  const navigate = useNavigate();
  
  // ── ÚJ: Állapot a fokozatos betöltés animációhoz (mint a Hero-ban) ──
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Kis időzítéssel elsütjük a belépő animációt
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);
  
  useReveal();

  // A teljes képernyős háttérstílus, kiegészítve a Hero-féle áttűnéssel és elmosással
  const mainGuidesBgStyle = {
    background: 'rgba(7, 8, 15, 0.85)',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    
    // ── ÚJ: Hero ihlette animációs effektek ──
    transition: 'opacity 1.5s ease, filter 1.5s ease',
    opacity: loaded ? 1 : 0,
    filter: loaded ? 'brightness(1) contrast(1.1)' : 'brightness(0.2) blur(10px)'
  };

  // Külön animációs stílus a szöveges tartalomnak, hogy lágyan ússzon fel
  const contentAnimationStyle = {
    transition: 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1s ease',
    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
    opacity: loaded ? 1 : 0
  };

  return (
    <div className="page-wrapper guides" style={mainGuidesBgStyle}>
      <section 
        style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '40px 20px',
          ...contentAnimationStyle // Rádobjuk a finom felúszást a teljes tartalomra
        }}
      >
        <button
          className="btn btn-ghost"
          style={{ marginBottom: '20px' }}
          onClick={() => navigate('/')}
        >
          ← HOME
        </button>
        <p className="guide-label">Community Content</p>
        <h1 className="guides-title" style={{ opacity: 1 }}>Guides</h1>
        <p className="guide-desc" style={{ opacity: 1, textAlign: 'center' }}>
          Community-written, up-to-date guides for all important Trove mechanics.
        </p>
        <GuidesList />
      </section>
    </div>
  );
}