import React from 'react';

interface AvatarProps {
  mood?: 'happy' | 'thinking' | 'waiting' | 'excited';
  speaking?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ mood = 'happy', speaking = false }) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
      {/* Background Circle */}
      <div className="absolute inset-0 bg-blue-100 rounded-full scale-90 animate-pulse"></div>
      
      {/* Simple Vector Character */}
      <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <path d="M50 180C50 140 70 120 100 120C130 120 150 140 150 180" fill="#4F46E5" />
        
        {/* Head */}
        <circle cx="100" cy="90" r="45" fill="#FFD7B5" />
        
        {/* Hair */}
        <path d="M55 90C55 60 75 35 100 35C125 35 145 60 145 90V95H55V90Z" fill="#3730A3" />
        
        {/* Eyes */}
        <g className={mood === 'thinking' ? 'animate-bounce' : ''}>
          <circle cx="85" cy="85" r="4" fill="#1E1B4B" />
          <circle cx="115" cy="85" r="4" fill="#1E1B4B" />
        </g>

        {/* Mouth - Changes based on state */}
        {speaking ? (
           <ellipse cx="100" cy="105" rx="8" ry="6" fill="#991B1B" className="animate-ping" />
        ) : mood === 'happy' || mood === 'excited' ? (
           <path d="M85 105 Q100 115 115 105" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
        ) : (
           <path d="M90 105 H110" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Hands (Simulated Signing) */}
        {speaking && (
          <g className="animate-pulse">
            <circle cx="60" cy="140" r="12" fill="#FFD7B5" />
            <circle cx="140" cy="140" r="12" fill="#FFD7B5" />
          </g>
        )}
      </svg>
    </div>
  );
};
