import { useEffect, useState } from 'react';
import './TroveNews.css';

export default function TroveNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('https://mystic-cave.com/api/v1/news')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        // A kapott infó alapján a json.data tartalmazza a hírek tömbjét!
        if (!cancelled && json && json.data) {
          setNews(json.data);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="page-wrapper news-page">
      <header className="news-header">
        <h1>Trove <span className="highlight">News</span></h1>
        <p>The latest updates, patch notes, and community events directly from Mystic Cave.</p>
      </header>

      {loading ? (
        <div className="news-loader">
          <div className="spinner"></div>
          <p>Connecting to Database...</p>
        </div>
      ) : error ? (
        <div className="fish-no-results">
          <p style={{ color: '#ff4444' }}>Couldn't load news: {error}</p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((item, index) => {
            // A leírás alapján pontosan ezeket a kulcsokat használjuk:
            const title = item.title || "Trove Update";
            const excerpt = item.excerpt || "";
            const link = item.url || "https://mystic-cave.com/";
            const imageUrl = item.image || '/guideimages/default-news.webp';
            
            // Szép dátum formázás
            const pubDate = item.date ? new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }) : 'Recently Updated';

            return (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="news-card" 
                key={item.id || index}
                style={{ animationDelay: `${(index % 10) * 0.05}s` }}
              >
                <div className="news-card-image">
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    loading="lazy"
                    onError={(e) => { e.target.src = '/guideimages/default-news.webp'; }} 
                  />
                  <div className="news-card-overlay">
                    <span>Read Article ↗</span>
                  </div>
                </div>
                <div className="news-card-content">
                  <span className="news-date">{pubDate}</span>
                  <h3>{title}</h3>
                  <p>{excerpt}</p>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Ha üres a válasz */}
      {!loading && news.length === 0 && !error && (
        <div className="fish-no-results">No recent articles found.</div>
      )}
    </div>
  );
}