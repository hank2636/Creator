import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './home.css';
import { startAutoScrollSlider } from '../hooks/useAutoScrollSlider';

const slidingImages = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
  '/images/image7.jpg',
  '/images/image8.jpg',
  '/images/image9.jpg',
  '/images/image10.jpg',
];

const DUPLICATE_COUNT = 3;
const ITEM_WIDTH = 472 + 10;

const Home = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null); // cleanup function for animation
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const extendedImages = Array(DUPLICATE_COUNT).fill(slidingImages).flat();

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // 每次進入可視區域就重啟動畫
          if (cleanupRef.current) cleanupRef.current(); // 清除前一次的動畫
          cleanupRef.current = startAutoScrollSlider(container, slidingImages, ITEM_WIDTH, animationRef);
        }
      },
      { threshold: 0.8 } // 超過 80% 出現在畫面才觸發
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <>
      <div className="slogan-banner">
        <div className="slogan-content">
          <h1>捕捉光影的靈魂，記錄世界的詩意。</h1>
          <p>專業外拍、光影寫真、形象攝影</p>
          <button onClick={() => navigate('/booking')}>立即預約</button>
        </div>
      </div>

      {/* 輪播圖 */}
      <div
        className="mouse-slider"
        ref={sliderRef}
        style={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {extendedImages.map((img, idx) => (
          <div
            className="mouse-slide"
            key={idx}
            style={{ display: 'inline-block', width: 472, marginRight: 10 }}
          >
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {/* 各分類照片區塊 */}
      <div id="image" className="gallery-section">
        <h2 className="gallery-title">形象照</h2>
        <div className="grid-gallery">
          {slidingImages.slice(0, 3).map((img, idx) => (
            <div className="grid-item" key={`img-${idx}`}>
              <img src={img} onClick={() => setLightboxImage(img)} />
            </div>
          ))}
        </div>
      </div>

      <div id="photo" className="gallery-section">
        <h2 className="gallery-title">光影寫真</h2>
        <div className="grid-gallery">
          {slidingImages.slice(3, 6).map((img, idx) => (
            <div className="grid-item" key={`photo-${idx}`}>
              <img src={img} onClick={() => setLightboxImage(img)} />
            </div>
          ))}
        </div>
      </div>

      <div id="theme" className="gallery-section">
        <h2 className="gallery-title">主題寫真</h2>
        <div className="grid-gallery">
          {slidingImages.slice(6, 9).map((img, idx) => (
            <div className="grid-item" key={`theme-${idx}`}>
              <img src={img} onClick={() => setLightboxImage(img)} />
            </div>
          ))}
        </div>
      </div>

      <div id="outdoor" className="gallery-section">
        <h2 className="gallery-title">外拍作品</h2>
        <div className="grid-gallery">
          {slidingImages.slice(9).map((img, idx) => (
            <div className="grid-item" key={`outdoor-${idx}`}>
              <img src={img} onClick={() => setLightboxImage(img)} />
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <img src={lightboxImage} className="lightbox-image" />
        </div>
      )}
    </>
  );
};

export default Home;
