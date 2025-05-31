import React, { useRef, useState } from 'react';
import './home.css';
import { useAutoScrollSlider } from '../hooks/useAutoScrollSlider';

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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null); // ← 新增狀態控制放大圖

  const extendedImages = Array(DUPLICATE_COUNT)
    .fill(slidingImages)
    .flat();

  // 自動滑動 Hook
  useAutoScrollSlider(sliderRef, slidingImages, ITEM_WIDTH, animationRef);

  return (
    <>
      <div className="slogan-banner">
        捕捉光影的靈魂，記錄世界的詩意。
      </div>

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

      <hr style={{ margin: '40px auto', width: '80%', borderColor: '#ddd' }} />

      {/* 圖片格狀牆 */}
      <div className="grid-gallery">
        {slidingImages.map((img, idx) => (
          <div className="grid-item" key={`grid-${idx}`}>
            <img
              src={img}
              alt={`Grid ${idx + 1}`}
              onClick={() => setLightboxImage(img)} // 點擊放大
            />
          </div>
        ))}
      </div>

      {/* 放大圖層 Lightbox */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <img src={lightboxImage} className="lightbox-image" alt="預覽圖片" />
        </div>
      )}
    </>
  );
};

export default Home;
