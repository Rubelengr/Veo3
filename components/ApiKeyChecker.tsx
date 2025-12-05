import React, { useEffect, useState } from 'react';

interface ApiKeyCheckerProps {
  onReady: () => void;
}

export const ApiKeyChecker: React.FC<ApiKeyCheckerProps> = ({ onReady }) => {
  const [loading, setLoading] = useState(true);
  const [hasKey, setHasKey] = useState(false);

  const checkKey = async () => {
    try {
      // @ts-ignore - window.aistudio is injected
      const hasSelected = await window.aistudio.hasSelectedApiKey();
      setHasKey(hasSelected);
      if (hasSelected) {
        onReady();
      }
    } catch (e) {
      console.error("Error checking API key:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        // Assume success after dialog interaction as per guidelines
        setHasKey(true);
        onReady();
    } catch (e) {
        console.error("Failed to open key selector", e);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-dark-900 text-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-veo-500"></div>
    </div>
  );

  if (!hasKey) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-900 p-4">
        <div className="max-w-md w-full bg-dark-800 rounded-xl border border-dark-700 p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-veo-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-veo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Welcome to Veo Studio</h1>
          <p className="text-gray-400 mb-8">
            To generate high-quality videos with Veo 3.1, you need to select a Google Cloud Project with billing enabled.
          </p>
          
          <button 
            onClick={handleSelectKey}
            className="w-full py-3 px-4 bg-veo-600 hover:bg-veo-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Select API Key</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <div className="mt-6 text-xs text-gray-500">
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noreferrer"
              className="underline hover:text-veo-400"
            >
              Learn more about billing and API keys
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
