import React, { useState } from 'react';
import { GeneratedVideo } from '../types';

// Repurposed from "VideoResult" to "PromptCard"
interface VideoResultProps {
  video: GeneratedVideo;
}

export const VideoResult: React.FC<VideoResultProps> = ({ video }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(video.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-dark-800 rounded-xl p-5 border border-dark-700 shadow-sm hover:border-veo-500/30 transition-all group">
      <div className="flex justify-between items-start gap-4">
        <p className="text-gray-300 text-sm leading-relaxed font-mono bg-black/20 p-3 rounded-lg w-full border border-white/5">
          {video.prompt}
        </p>
        <button 
            onClick={handleCopy}
            className={`shrink-0 p-2 rounded-lg transition-colors border ${
                copied 
                ? 'bg-green-900/20 border-green-800 text-green-400' 
                : 'bg-dark-700 border-dark-600 text-gray-400 hover:bg-dark-600 hover:text-white'
            }`}
            title="Copy Prompt"
        >
            {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
            )}
        </button>
      </div>
      <div className="flex items-center justify-between mt-3 pl-1">
        <span className="text-xs text-gray-500">
            {new Date(video.timestamp).toLocaleString()}
        </span>
        <span className="text-xs font-medium text-veo-500">
            Veo 3.1 Optimized
        </span>
      </div>
    </div>
  );
};
