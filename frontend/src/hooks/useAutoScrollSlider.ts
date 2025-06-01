// hooks/useAutoScrollSlider.ts
import type { RefObject } from 'react';

export function startAutoScrollSlider(
  container: HTMLDivElement,
  slidingImages: any[],
  ITEM_WIDTH: number,
  animationRef: RefObject<number | null>
) {
  const autoScrollDuration = 3000;
  const scrollDistance = 0.4 * autoScrollDuration;

  let startTime: number | null = null;
  let enableMouseControl = false;

  const speedRef = { current: 0 };

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

  const initialScrollLeft = container.scrollLeft; // ⭐️ 儲存目前位置

  const animateAutoScroll = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const t = Math.min(elapsed / autoScrollDuration, 1);
    const easeOutProgress = 1 - Math.pow(1 - t, 2);

    container.scrollLeft = initialScrollLeft + scrollDistance * easeOutProgress;

    if (t < 1) {
      animationRef.current = requestAnimationFrame(animateAutoScroll);
    } else {
      enableMouseControl = true;
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      animationRef.current = requestAnimationFrame(animateMouseControl);
    }
  };

  animationRef.current = requestAnimationFrame(animateAutoScroll);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };
}
