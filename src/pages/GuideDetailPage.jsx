import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react'; // <-- Hozzáadva: useMemo
import { motion, AnimatePresence } from 'framer-motion';
import { GUIDES_DATA } from '../components/GuidesList';
import Parallax from '../components/Parallax';
import { fadeUp, EASE, defaultViewport } from '../lib/motionVariants';
import './GuideDetail.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// A revealProps szigorúan megkapja a once: true-t
const revealProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.15 },
  variants: fadeUp,
};

export default function GuideDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const guide = GUIDES_DATA.find((g) => g.slug === slug);
  const [activeModalImg, setActiveModalImg] = useState(null);

  // Jump to top on load / when navigating between guides.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Lock background scroll while the lightbox is open.
  useEffect(() => {
    document.body.style.overflow = activeModalImg ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalImg]);

  // JAVÍTÁS: Memorizáljuk a Markdown komponens-térképet a useMemo használatával!
  // Így a React nem hozza újra létre a komponenseket a Lightbox nyitásakor/bezárásakor.
  const markdownComponents = useMemo(() => ({
    h1: (props) => <motion.h1 {...revealProps} {...props} />,
    h2: (props) => <motion.h2 {...revealProps} {...props} />,
    h3: (props) => <motion.h3 {...revealProps} {...props} />,
    h4: (props) => <motion.h4 {...revealProps} {...props} />,
    p: (props) => <motion.p {...revealProps} {...props} />,
    ul: (props) => <motion.ul {...revealProps} {...props} />,
    ol: (props) => <motion.ol {...revealProps} {...props} />,
    div: ({ node, className, children, ...props }) => {
      if (className === 'gd-image-container' || className === 'gd-image-container2') {
        const imgChild = node.children?.find((c) => c.tagName === 'img');
        const imgSrc = imgChild?.properties?.src;

        return (
          <motion.div
            {...revealProps}
            className={className}
            onClick={() => imgSrc && setActiveModalImg(imgSrc)}
            style={{ cursor: 'pointer' }}
            title="Click to enlarge image"
            whileHover={{ scale: 1.02 }}
            {...props}
          >
            {children}
          </motion.div>
        );
      }

        if (className === 'gd-info-box' || className === 'gd-flex-row' || className === 'gd-images-grid') {
          return (
            <motion.div {...revealProps} className={className} {...props}>
              {children}
            </motion.div>
          );
        }

      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    },
  }), []); // Üres függőségi tömb: csak egyszer jön létre a komponens élettartama során

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
    <div className="page-wrapper guides-detail-page" style={{ background: 'rgba(7, 8, 15, 1)', minHeight: '100vh' }}>
      {guide.bgImage && (
        <div className="gd-hero-bg-wrap" aria-hidden="true">
          <Parallax speed={90} className="gd-hero-bg-parallax">
            <div
              className="gd-hero-bg-image"
              style={{
                backgroundImage: `url(${guide.bgImage})`,
                backgroundPosition: guide.bgPosition || 'center center',
              }}
            />
          </Parallax>
          <div className="gd-hero-bg-fade" />
        </div>
      )}

      <button className="gd-back-btn" onClick={() => navigate('/guides')} title="Back to Guides">
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
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
        <motion.header
          className="gd-header"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="gd-tag-wrapper">
            <i className={`${guide.icon} gd-icon`}></i>
            <span className="gd-tag">{guide.tag}</span>
          </div>
          <h1 className="gd-title">{guide.title}</h1>
          <p className="gd-meta">
            By <strong>{guide.author || 'Community'}</strong> <span>•</span> {guide.date || 'Recently updated'}
          </p>
        </motion.header>

        <div className="gd-content-box">
          <div className="gd-body">
            {guide.content ? (
              <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {guide.content}
              </ReactMarkdown>
            ) : (
              'Content is being written... Check back later!'
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / image viewer */}
      <AnimatePresence>
        {activeModalImg && (
          <motion.div
            className="gd-lightbox-overlay"
            onClick={() => setActiveModalImg(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <motion.div
              className="gd-lightbox-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <button className="gd-lightbox-close" onClick={() => setActiveModalImg(null)}>×</button>
              <img src={activeModalImg} alt="Enlarged guide view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}