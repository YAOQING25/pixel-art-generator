
import React, { useState } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  initialPrompt: string;
  setOuterPrompt: (prompt: string) => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading, initialPrompt, setOuterPrompt }) => {
  const [localPrompt, setLocalPrompt] = useState<string>(initialPrompt);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOuterPrompt(localPrompt); // Update parent state if needed for display purposes
    onSubmit(localPrompt);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalPrompt(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">
          Enter your vision:
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={3}
          value={localPrompt}
          onChange={handleChange}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-100 placeholder-gray-400 disabled:opacity-50"
          placeholder="e.g., A brave knight on a pixelated horse"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !localPrompt.trim()}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-150"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Pixel Art'
        )}
      </button>
    </form>
  );
};
