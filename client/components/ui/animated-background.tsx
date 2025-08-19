import { useEffect, useState } from 'react';

interface FloatingElementProps {
  size: number;
  delay: number;
  color: string;
  opacity: number;
}

function FloatingElement({ size, delay, color, opacity }: FloatingElementProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });

    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, 8000 + delay * 1000);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      className="absolute rounded-full transition-all duration-8000 ease-in-out blur-xl"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity: opacity,
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <FloatingElement size={120} delay={0} color="rgba(139, 120, 93, 0.1)" opacity={0.3} />
      <FloatingElement size={80} delay={2} color="rgba(139, 120, 93, 0.15)" opacity={0.2} />
      <FloatingElement size={160} delay={4} color="rgba(139, 120, 93, 0.08)" opacity={0.4} />
      <FloatingElement size={100} delay={6} color="rgba(139, 120, 93, 0.12)" opacity={0.25} />
    </div>
  );
}
