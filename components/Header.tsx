
import React from 'react';

const PixelIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 text-pink-500">
    <rect width="2" height="2" fill="currentColor"/>
    <rect y="2" width="2" height="2" fill="currentColor"/>
    <rect y="4" width="2" height="2" fill="currentColor"/>
    <rect y="6" width="2" height="2" fill="currentColor"/>
    <rect x="2" width="2" height="2" fill="currentColor"/>
    <rect x="4" width="2" height="2" fill="currentColor"/>
    <rect x="6" width="2" height="2" fill="currentColor"/>
    <rect x="2" y="6" width="2" height="2" fill="currentColor"/>
    <rect x="4" y="6" width="2" height="2" fill="currentColor"/>
    <rect x="6" y="6" width="2" height="2" fill="currentColor"/>
    <rect x="6" y="2" width="2" height="2" fill="currentColor"/>
    <rect x="6" y="4" width="2" height="2" fill="currentColor"/>
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-2xl text-center py-6">
      <div className="flex items-center justify-center">
        <PixelIcon />
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Pixel Art Generator
        </h1>
      </div>
      <p className="text-gray-400 mt-2 text-lg">Transform your ideas into stunning pixel art with AI.</p>
    </header>
  );
};
