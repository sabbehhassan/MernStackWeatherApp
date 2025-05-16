// src/components/Rain.jsx
import React from 'react';

const Rain = () => (
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
    {[...Array(40)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-blue-300 opacity-70 rounded-full"
        style={{
          width: '2px',
          height: '15px',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `rain-fall ${0.5 + Math.random()}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      ></div>
    ))}
  </div>
);

export default Rain;
