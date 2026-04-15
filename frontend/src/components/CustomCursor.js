import { useState, useEffect, useCallback } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Smooth cursor follow with lerp
  useEffect(() => {
    let animationFrame;
    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    const animate = () => {
      setPosition(prev => ({
        x: lerp(prev.x, targetPosition.x, 0.15),
        y: lerp(prev.y, targetPosition.y, 0.15)
      }));
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetPosition]);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    setTargetPosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Mouse events
  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove]);

  // Hover detection for interactive elements
  useEffect(() => {
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, [data-cursor="pointer"], [data-cursor-text]');
      if (target) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
      }
    };

    const handleElementLeave = (e) => {
      const target = e.target.closest('a, button, [data-cursor="pointer"], [data-cursor-text]');
      if (target) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseout', handleElementLeave);

    return () => {
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
    };
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Inner dot */}
        <div
          className={`rounded-full bg-white transition-all duration-300 ${
            isClicking ? 'scale-50' : isHovering ? 'scale-0' : 'scale-100'
          }`}
          style={{
            width: '8px',
            height: '8px'
          }}
        />
      </div>

      {/* Outer ring */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full border transition-all duration-500 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isHovering ? 'border-[#0047FF] bg-[#0047FF]/10' : 'border-white/50'}`}
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '80px' : '40px',
          height: isHovering ? '80px' : '40px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          mixBlendMode: isHovering ? 'normal' : 'difference'
        }}
      >
        {/* Cursor text */}
        {cursorText && (
          <span 
            className="absolute inset-0 flex items-center justify-center text-[10px] font-futura uppercase tracking-wider text-[#0047FF]"
            style={{ 
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          >
            {cursorText}
          </span>
        )}
      </div>

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
        a, button, [data-cursor="pointer"] {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
