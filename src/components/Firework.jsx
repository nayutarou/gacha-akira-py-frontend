import { useEffect, useState } from "react";

const Firework = ({ x, y, color }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: 0,
      y: 0,
      angle: Math.random() * 360,
      speed: Math.random() * 5 + 2,
      opacity: 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: "2px",
        height: "2px",
      }}
      data-testid="firework-container"
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            backgroundColor: color,
            transform: `rotate(${p.angle}deg) translateX(${p.speed * 10}px)`,
            opacity: p.opacity,
            width: "4px",
            height: "4px",
            transition: "transform 1s ease-out, opacity 1s ease-out",
          }}
          data-testid="firework-particle"
        />
      ))}
    </div>
  );
};

export default Firework;
