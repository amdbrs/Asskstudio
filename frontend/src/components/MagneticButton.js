import { useRef, useState, useCallback } from 'react';

export const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.4,
  radius = 200,
  as: Component = 'button',
  ...props 
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < radius) {
      const magnetStrength = (1 - distance / radius) * strength;
      setPosition({
        x: distanceX * magnetStrength,
        y: distanceY * magnetStrength
      });
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <Component
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 
          ? 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)' 
          : 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)'
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
