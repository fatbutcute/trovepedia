import React, { useState, useEffect } from 'react';
import './TroveNews.css';

export default function TroveNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchTroveNews = async () => {
      const targetUrl = "https://mystic-cave.com/api/v1/news";
      
      const proxies = [
        `https://api.codetabs.com/v1/proxy?quest=${targetUrl}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
      ];

      setLoading(true);
      let success = false;

      for (const proxy of proxies) {
        try {
          console.log(`Próbálkozás a következő proxy-val: ${proxy}`);
          
          const response = await fetch(proxy, { 
            headers: { "Accept": "application/json" } 
          });
          
          console.log(`Proxy válasz státusz: ${response.status}`);
          if (!response.ok) throw new Error(`Proxy hiba! Státusz: ${response.status}`);
          
          // Megpróbáljuk szövegként beolvasni először, hogy lássuk, ha nem JSON jön vissza
          const rawText = await response.text();
          console.log("Nyers szöveges válasz a proxytól (első 200 karakter):", rawText.substring(0, 200));
          
          const data = JSON.parse(rawText);
          console.log("Sikeresen parzolt JSON objektum:", data);
          
          if (data) {
            // Megnézzük, hogy tömb-e vagy objektum
            const newsArray = Array.isArray(data) ? data : (data.data || data.items || []);
            console.log("Feldolgozott hírek tömb hossza:", newsArray.length);
            
            setNews(newsArray);
            success = true;
            break; 
          }
        } catch (err) {
          console.warn("Ez a proxy kísérlet elhasalt. Hiba oka:", err.message);
        }
      }

      if (!success) {
        console.error("Sajnos az összes proxy elvérzett!");
        // Ha minden kötél szakad, tegyünk be egy kamu üres tömböt, hogy legalább a töltés leálljon
        setNews([]);
      }
      
      // Ez a lényeg! Bármi történik, a végén LE KELL ÁLLÍTANI a karikázást
      setLoading(false);
    };

    fetchTroveNews();
  }, []);

  return (
    <div className="page-wrapper news-page">
      <header className="news-header">
        <h1>Trove <span className="highlight">News</span></h1>
        <p>Latest updates, patch notes and community events translated by Mystic Cave.</p>
      </header>

      {loading ? (
        <div className="news-loader">
          <div className="spinner"></div>
          <p>Connecting to Database...</p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((item, index) => {
            // Dinamikusan kezeljük a kulcsneveket, ha nála kicsit másként szerepelnének
            const title = item.title || item.news_title || "Trove Update";
            const description = item.description || item.content || item.text || "";
            const link = item.link || item.url || `https://mystic-cave.com/news`;
            
            // Megpróbálunk képet lőni (ha nincs, egy szép sötét gyári hátteret adunk neki)
            const imageUrl = item.thumbnail || item.image || item.img || '/guideimages/default-news.webp';
            
            // Szép formázott dátum, ha van megadva pubDate vagy date
            const rawDate = item.pubDate || item.date || item.created_at;
            const pubDate = rawDate ? new Date(rawDate).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            }) : 'Recently Updated';

            return (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="news-card" 
                key={item.id || index}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="news-card-image">
                  <img src={imageUrl} alt={title} onError={(e) => { e.target.src = '/guideimages/default-news.webp'; }} />
                  <div className="news-card-overlay">
                    <span>Read Article ↗</span>
                  </div>
                </div>
                <div className="news-card-content">
                  <span className="news-date">{pubDate}</span>
                  <h3>{title}</h3>
                  {/* HTML mentesítés és szöveg rövidítés */}
                  <p>{description.replace(/<[^>]+>/g, '').substring(0, 130)}...</p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}