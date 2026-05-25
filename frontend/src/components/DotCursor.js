import { useEffect, useState, useCallback } from 'react';

export const DotCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOnDark, setIsOnDark] = useState(false);

  // Function to check if background is dark
  const checkBackgroundColor = useCallback((x, y) => {
    const element = document.elementFromPoint(x, y);
    if (!element) return false;

    // Check the element and its parents for background color
    let currentElement = element;
    while (currentElement && currentElement !== document.body) {
      const style = window.getComputedStyle(currentElement);
      const bgColor = style.backgroundColor;
      
      // Parse RGB values
      const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        // Check if not transparent (alpha > 0 or no alpha)
        if (bgColor.includes('rgba') && bgColor.match(/,\s*([\d.]+)\)$/)?.[1] === '0') {
          currentElement = currentElement.parentElement;
          continue;
        }
        // Calculate luminance - if low, background is dark
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        if (luminance < 0.5) {
          return true; // Dark background
        }
        return false; // Light background
      }
      currentElement = currentElement.parentElement;
    }
    
    // Check body background
    const bodyStyle = window.getComputedStyle(document.body);
    const bodyBg = bodyStyle.backgroundColor;
    const bodyMatch = bodyBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (bodyMatch) {
      const [, r, g, b] = bodyMatch.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
    
    return false; // Default to light
  }, []);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Check background color (throttled)
      setIsOnDark(checkBackgroundColor(e.clientX, e.clientY));
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add cursor:none to all elements
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      style.remove();
    };
  }, [isVisible, checkBackgroundColor]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[9999] w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
        isOnDark ? 'bg-white' : 'bg-black'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default DotCursor;
