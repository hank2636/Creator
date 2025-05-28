// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import './home.css';

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;
const fallbackImage = `${API_BACKEND_URL}/static/picture/gallery.png`;

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
      <div className="home-container">
        <div className="section-title">光影形象誌</div>

        {loading && <div>載入中...</div>}
        {error && <div className="error-text">錯誤：{error}</div>}

        <div className="gallery-grid">
          {displayedImages.map((src, index) => {
            const fullSrc = src.startsWith('http') ? src : `${API_BACKEND_URL}${src}`;
            return (
              <div className="gallery-item" key={index}>
                <img
                  src={fullSrc}
                  alt={`Gallery ${index + 1}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
