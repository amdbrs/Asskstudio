import { useEffect, useState } from 'react';

export const DotCursor = () => {
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

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Add cursor:none to all interactive elements
    const style = document.createElement('style');
    style.textContent = `
      a, button, [role="button"], .cursor-pointer, input, textarea, select {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.body.style.cursor = 'auto';
      style.remove();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot cursor */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-black transition-all duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? 40 : isClicking ? 6 : 10,
          height: isHovering ? 40 : isClicking ? 6 : 10,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.1 : 1,
          mixBlendMode: isHovering ? 'difference' : 'normal',
        }}
      />
      
      {/* Outer ring on hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9998] rounded-full border-2 border-black transition-all duration-300 ease-out"
          style={{
            left: position.x,
            top: position.y,
            width: 50,
            height: 50,
            transform: 'translate(-50%, -50%)',
            opacity: 0.5,
          }}
        />
      )}
    </>
  );
};

export default DotCursor;
