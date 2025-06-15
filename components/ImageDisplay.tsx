
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string;
  altText: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, altText }) => {
  return (
    <div className="mt-8 p-4 bg-gray-700 rounded-lg shadow-inner">
      <h2 className="text-xl font-semibold text-pink-400 mb-4 text-center">Your Pixel Art:</h2>
      <div className="flex justify-center items-center">
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-full h-auto rounded-md border-2 border-gray-600 shadow-lg"
          style={{ imageRendering: 'pixelated' }} // Ensures pixel art scaling
        />
      </div>
    </div>
  );
};
