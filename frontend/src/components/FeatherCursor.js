import { useEffect, useState } from 'react';

// Feather/Pen cursor SVG
const FEATHER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%230047FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
  <line x1="16" y1="8" x2="2" y2="22"/>
  <line x1="17.5" y1="15" x2="9" y2="15"/>
</svg>
`;

// Encode SVG for CSS
const encodedSVG = encodeURIComponent(FEATHER_SVG.trim());
const cursorURL = `data:image/svg+xml,${encodedSVG}`;

export const FeatherCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Set global cursor style
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main feather cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-4px, -4px) scale(${isClicking ? 0.8 : isHovering ? 1.2 : 1}) rotate(-45deg)`,
        }}
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isHovering ? "#0047FF" : "#0047FF"} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-all duration-200 ${isHovering ? 'drop-shadow-[0_0_8px_rgba(0,71,255,0.6)]' : ''}`}
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
          <line x1="16" y1="8" x2="2" y2="22"/>
          <line x1="17.5" y1="15" x2="9" y2="15"/>
        </svg>
      </div>

      {/* Hover ring effect */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9998] rounded-full border-2 border-[#0047FF]/30 animate-ping"
          style={{
            left: position.x - 20,
            top: position.y - 20,
            width: 40,
            height: 40,
          }}
        />
      )}

      {/* Click ripple */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9998] rounded-full bg-[#0047FF]/20 animate-ping"
          style={{
            left: position.x - 15,
            top: position.y - 15,
            width: 30,
            height: 30,
          }}
        />
      )}
    </>
  );
};

export default FeatherCursor;
