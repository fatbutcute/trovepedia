import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GUIDES_DATA } from '../components/GuidesList'; 
import './GuideDetail.css'; 
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function GuideDetailPage() {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  const guide = GUIDES_DATA.find((g) => g.slug === slug);
  
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const handleCloseLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveModalImg(null);
      setIsClosing(false);
    }, 250);
  };

  if (!guide) {
    return (
      <div className="page-wrapper placeholder-page">
        <h2>Guide Not Found</h2>
        <p>The guide you are looking for does not exist or has been moved.</p>
        <button className="btn btn-ghost" onClick={() => navigate('/guides')}>← Back to Guides</button>
      </div>
    );
  }

  return (
    <div className="page-wrapper guides-detail-page">
    <button className="gd-back-btn" onClick={() => navigate('/guides')}>
        <svg 
          viewBox="0 0 24 24" 
          width="30" 
          height="30" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div className="gd-container">
        


        <header className="gd-header">
          <div className="gd-tag-wrapper">
            <i className={`${guide.icon} gd-icon`}></i>
            <span className="gd-tag">{guide.tag}</span>
          </div>
          <h1 className="gd-title">{guide.title}</h1>
          <p className="gd-meta">
            Author: <strong>{guide.author || 'Community'}</strong> • {guide.date || 'Recently updated'}
          </p>
        </header>

        <div className="gd-content-box">
          <div className="gd-body">
            {guide.content ? (
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={{
                  div: ({ node, className, children, ...props }) => {
                    if (className === 'gd-image-container') {
                      const imgChild = node.children?.find(c => c.tagName === 'img');
                      const imgSrc = imgChild?.properties?.src;

                      return (
                        <div 
                          className={className} 
                          onClick={() => imgSrc && setActiveModalImg(imgSrc)}
                          style={{ cursor: 'pointer' }}
                          title="Click to enlarge image"
                          {...props}
                        >
                          {children}
                        </div>
                      );
                    }
                    return <div className={className} {...props}>{children}</div>;
                  }
                }}
              >
                {guide.content}
              </ReactMarkdown>
            ) : (
              'Content is being written... Check back later!'
            )}
          </div>
        </div>

      </div>

      {activeModalImg && (
        <div 
          className={`gd-lightbox-overlay ${isClosing ? 'closing' : ''}`} 
          onClick={handleCloseLightbox}
        >
          <div className="gd-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="gd-lightbox-close" onClick={handleCloseLightbox}>×</button>
            <img src={activeModalImg} alt="Enlarged guide view" />
          </div>
        </div>
      )}

    </div>
  );
}