// src/components/Cloud.jsx
import React from 'react';

const Cloud = ({ size, top, left, anim }) => (
  <div
    className="absolute bg-white rounded-full shadow-md z-20"
    style={{
      width: `${size}px`,
      height: `${size / 2}px`,
      top: top,
      left: left,
      opacity: 0.85,
      animation: `${anim} 12s ease-in-out infinite`,
      filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.1))',
    }}
  >
    <div
      className="absolute bg-white rounded-full"
      style={{
        width: size * 0.7 + 'px',
        height: size * 0.7 + 'px',
        top: '-35%',
        left: '20%',
      }}
    ></div>
    <div
      className="absolute bg-white rounded-full"
      style={{
        width: size * 0.6 + 'px',
        height: size * 0.6 + 'px',
        top: '-30%',
        left: '55%',
      }}
    ></div>
  </div>
);

export default Cloud;
