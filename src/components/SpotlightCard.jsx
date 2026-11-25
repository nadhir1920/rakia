import { useRef, useState } from 'react';

export function SpotlightCard({ children, className = '', as: Component = 'div', ...props }) {
  const ref = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, active: false }));
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        '--spot-x': `${coords.x}px`,
        '--spot-y': `${coords.y}px`,
        '--spot-opacity': coords.active ? 1 : 0,
      }}
      {...props}
    >
      <span className="spotlight-glow" aria-hidden="true" />
      <div className="spotlight-content">{children}</div>
    </Component>
  );
}
