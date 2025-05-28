// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import './home.css';

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;
const fallbackImage = `${API_BACKEND_URL}/static/picture/gallery.png`;
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
];


const Home = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_BACKEND_URL}/api/picture/list`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('API 回傳格式錯誤');
        }

        setImages(data);
      } catch (err: any) {
        console.error('載入圖片清單失敗:', err);
        setError(err.message || '無法載入圖片');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const displayedImages = images.length > 0 ? images : [fallbackImage];

  return (
    <>
      <div className="slogan-banner">
        捕捉光影的靈魂，記錄世界的詩意。
      </div>

      <div className="banner-slider">
        <div className="slider-track">
          {slidingImages.map((img, idx) => (
            <div className="slide" key={idx}>
              <img src={img} alt={`Banner Slide ${idx + 1}`} />
            </div>
          ))}
          {/* 為了無限循環，複製一遍圖片 */}
          {slidingImages.map((img, idx) => (
            <div className="slide" key={`clone-${idx}`}>
              <img src={img} alt={`Banner Slide Clone ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="home-container">
        {/* 你的內容 */}
      </div>
    </>
  );
};

export default Home;
