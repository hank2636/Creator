// src/pages/Home.tsx
import React, { useEffect, useRef } from 'react';
import './home.css';

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

const DUPLICATE_COUNT = 3; // 複製 3 次

const Home = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(0);

  // 複製三倍陣列
  const extendedImages = [...slidingImages, ...slidingImages, ...slidingImages];

  // 每張圖片寬度與 margin 合計
  const ITEM_WIDTH = 472 + 10;

  useEffect(() => {
  const container = sliderRef.current;
  if (!container) return;

  const middleScrollLeft = slidingImages.length * ITEM_WIDTH;

  // 初始位置：中間
  container.scrollLeft = middleScrollLeft;

  // 滑動設定
  const autoScrollDuration = 3000; // 滑動總時間 (ms)
  const scrollDistance = 0.8 * autoScrollDuration; // 最終要滑多遠（px）

  let startTime: number | null = null;
  let enableMouseControl = false;

  const speedRef = { current: 0 };

  // 滑鼠事件
  const handleMouseMove = (e: MouseEvent) => {
    if (!enableMouseControl) return;

    const { left, width } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const center = width / 2;
    const deadZone = width * 0.3;
    const maxSpeed = 3;

    if (Math.abs(mouseX - center) < deadZone / 2) {
      speedRef.current = 0;
    } else {
      speedRef.current = (mouseX < center ? -1 : 1) * maxSpeed;
    }
  };

  const handleMouseLeave = () => {
    if (!enableMouseControl) return;

    speedRef.current = 0;
    container.scrollLeft = Math.round(container.scrollLeft);
  };

  const animateMouseControl = () => {
    if (!enableMouseControl) return;

    if (Math.abs(speedRef.current) < 0.5) {
      speedRef.current = 0;
    }

    if (speedRef.current !== 0) {
      container.scrollLeft += speedRef.current;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const leftBoundary = slidingImages.length * ITEM_WIDTH * 0.5;
      const rightBoundary = maxScrollLeft - leftBoundary;

      if (container.scrollLeft <= leftBoundary) {
        container.scrollLeft += slidingImages.length * ITEM_WIDTH;
      } else if (container.scrollLeft >= rightBoundary) {
        container.scrollLeft -= slidingImages.length * ITEM_WIDTH;
      }
    }

    animationRef.current = requestAnimationFrame(animateMouseControl);
  };

  // 自動滑動動畫，使用 ease-out 曲線
  const animateAutoScroll = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const t = Math.min(elapsed / autoScrollDuration, 1); // 正規化時間 (0~1)
    const easeOutProgress = 1 - Math.pow(1 - t, 2); // ease-out 曲線

    container.scrollLeft = middleScrollLeft + scrollDistance * easeOutProgress;

    if (t < 1) {
      animationRef.current = requestAnimationFrame(animateAutoScroll);
    } else {
      // 自動滑動完成，啟用滑鼠控制
      enableMouseControl = true;
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      animationRef.current = requestAnimationFrame(animateMouseControl);
    }
  };

  animationRef.current = requestAnimationFrame(animateAutoScroll);

  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };
}, []);


  return (
    <>
      <div className="slogan-banner">
        捕捉光影的靈魂，記錄世界的詩意。
      </div>

      <div
        className="mouse-slider"
        ref={sliderRef}
        style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
    </>
  );
};

export default Home;
