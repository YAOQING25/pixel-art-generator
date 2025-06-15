
import { GoogleGenAI, GenerateImageResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const generatePixelArt = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    console.error("Gemini API key not configured or GoogleGenAI SDK failed to initialize.");
    throw new Error(
      "The Pixel Art Generator is not configured correctly. API Key is missing."
    );
  }

  const enhancedPrompt = `pixel art style, 8-bit, detailed, vibrant colors, ${userPrompt}`;

  try {
    const response: GenerateImageResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002', // Use the specified Imagen model
      prompt: enhancedPrompt,
      config: { 
        numberOfImages: 1,
        outputMimeType: 'image/png' // PNG is good for pixel art
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      console.error("No image data received from API:", response);
      throw new Error("The AI couldn't generate an image for this prompt. Try a different one.");
    }
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    if (error.message && error.message.includes('API key not valid')) {
        throw new Error("Invalid API Key. Please check your configuration.");
    }
    // Attempt to parse more specific error details if available
    if (error.message && error.message.includes('permission')) {
        throw new Error("API Key does not have permission for Imagen. Please check your Google Cloud project and API key permissions.");
    }
    if (error.message && error.message.includes('quota')) {
         throw new Error("You've exceeded your API quota. Please check your usage limits or try again later.");
    }
    throw new Error(error.message || "An unexpected error occurred while generating the image.");
  }
};
