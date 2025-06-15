
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ErrorMessage } from './components/ErrorMessage';
import { generatePixelArt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);

  React.useEffect(() => {
    // Check for API key presence on mount (conceptual check as per constraints)
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
      setError("API Key is missing. Please ensure it's configured in the environment.");
    }
  }, []);

  const handleGenerateImage = useCallback(async (currentPrompt: string) => {
    if (apiKeyMissing) {
       setError("Cannot generate image: API Key is missing.");
       return;
    }
    if (!currentPrompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generatePixelArt(currentPrompt);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKeyMissing]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 selection:bg-pink-500 selection:text-white">
      <Header />
      <main className="container mx-auto mt-8 p-6 bg-gray-800 shadow-2xl rounded-lg w-full max-w-2xl">
        <PromptForm
          onSubmit={handleGenerateImage}
          isLoading={isLoading}
          initialPrompt={prompt}
          setOuterPrompt={setPrompt}
        />

        {apiKeyMissing && !isLoading && (
           <ErrorMessage message="API Key is missing. This application requires an API key to function. Please ensure 'process.env.API_KEY' is configured." />
        )}
        
        {isLoading && <LoadingIndicator />}
        {error && !isLoading && <ErrorMessage message={error} />}
        
        {!isLoading && generatedImage && (
          <ImageDisplay imageUrl={generatedImage} altText={`Pixel art for: ${prompt}`} />
        )}
        
        {!isLoading && !generatedImage && !error && !apiKeyMissing && (
          <div className="mt-8 text-center text-gray-400">
            <p>Enter a prompt above and click "Generate" to create your pixel art!</p>
            <p className="text-sm mt-2">Example: "A majestic dragon flying over a cyberpunk city"</p>
          </div>
        )}
      </main>
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Powered by Gemini API. Pixel Art Generator.</p>
      </footer>
    </div>
  );
};

export default App;
