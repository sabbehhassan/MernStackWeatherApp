// src/components/Lightning.jsx
import React, { useMemo } from 'react';

const generateBoltPath = () => {
  let mainPoints = [{ x: 50, y: 0 }];
  // Create main bolt zig-zag points down to y=1200
  for (let y = 100; y <= 1200; y += 100) {
    const prev = mainPoints[mainPoints.length - 1];
    const nextX = prev.x + (Math.random() > 0.5 ? 10 : -10); // zig-zag horizontally by 10px
    mainPoints.push({ x: nextX, y });
  }

  // Generate path string with smooth curves for main bolt
  let mainPath = `M${mainPoints[0].x},${mainPoints[0].y}`;
  for (let i = 1; i < mainPoints.length; i++) {
    const cpX = (mainPoints[i - 1].x + mainPoints[i].x) / 2; // control point x
    const cpY = (mainPoints[i - 1].y + mainPoints[i].y) / 2; // control point y
    mainPath += ` Q${cpX},${cpY} ${mainPoints[i].x},${mainPoints[i].y}`;
  }

  // Branches - from random main bolt points except first and last
  const branches = [];
  for (let i = 2; i < mainPoints.length - 2; i++) {
    if (Math.random() > 0.4) { // about 60% chance to create branch
      const start = mainPoints[i];
      // Branch end point with horizontal shift +/- 40-70, vertical shift 50-120
      const endX = start.x + (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 30);
      const endY = start.y + 50 + Math.random() * 70;

      // Control point for smooth curve - halfway between start and end, with some vertical offset
      const cpX = (start.x + endX) / 2;
      const cpY = start.y + (endY - start.y) / 2 - 20;

      const branchPath = `M${start.x},${start.y} Q${cpX},${cpY} ${endX},${endY}`;
      branches.push(branchPath);
    }
  }

  return { mainPath, branches };
};

const Lightning = () => {
  const { mainPath, branches } = useMemo(generateBoltPath, []);

  return (
    <svg
      className="absolute top-0 left-0 z-40 pointer-events-none"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      viewBox="0 0 100 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main bolt with smooth zig-zag curves */}
      <path
        d={mainPath}
        stroke="white"
        strokeWidth="3"
        fill="none"
        filter="url(#glow)"
        style={{
          strokeDasharray: 1800,
          strokeDashoffset: 1800,
          animation: 'drawBolt 0.7s ease-out forwards, boltFade 5s ease-in-out infinite',
        }}
      />

      {/* Branches with smooth curves */}
      {branches.map((branch, i) => (
        <path
          key={i}
          d={branch}
          stroke="white"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300,
            animation: 'drawBolt 0.7s ease-out forwards, boltFade 5s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes drawBolt {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes boltFade {
          0%, 95%, 100% {
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          2% {
            opacity: 0.7;
          }
          3% {
            opacity: 1;
          }
          4% {
            opacity: 0;
          }
        }
      `}</style>
    </svg>
  );
};

export default Lightning;
