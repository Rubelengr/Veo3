import React, { useState, useEffect } from 'react';
import { SparklesIcon, WandIcon, DownloadIcon } from './components/Icons';
import { VideoResult } from './components/VideoResult';
import { formatVeoPrompt } from './services/geminiService';
import { 
  INITIAL_PROMPT_STATE, 
  STYLE_PRESETS, 
  LIGHTING_PRESETS, 
  CAMERA_PRESETS,
  SAMPLE_SUBJECTS
} from './constants';
import { PromptState, GeneratedVideo, VeoModel } from './types';

// Reusing types for the history, but mapping 'url' to empty since we don't have video URLs
// and repurposing the structure for saved prompts.

export default function App() {
  // Prompt State
  const [promptState, setPromptState] = useState<PromptState>(INITIAL_PROMPT_STATE);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [savedPrompts, setSavedPrompts] = useState<GeneratedVideo[]>([]);
  const [copied, setCopied] = useState(false);

  // Live update the prompt text when controls change
  useEffect(() => {
    const formatted = formatVeoPrompt(promptState);
    setGeneratedPrompt(formatted);
  }, [promptState]);

  const handleSurpriseMe = () => {
    const randomSubject = SAMPLE_SUBJECTS[Math.floor(Math.random() * SAMPLE_SUBJECTS.length)];
    const randomStyle = STYLE_PRESETS[Math.floor(Math.random() * STYLE_PRESETS.length)];
    const randomLighting = LIGHTING_PRESETS[Math.floor(Math.random() * LIGHTING_PRESETS.length)];
    const randomCamera = CAMERA_PRESETS[Math.floor(Math.random() * CAMERA_PRESETS.length)];
    
    setPromptState({
      ...promptState,
      subject: randomSubject,
      style: randomStyle,
      lighting: randomLighting,
      camera: randomCamera
    });
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePrompt = () => {
    if (!generatedPrompt) return;
    
    const newEntry: GeneratedVideo = {
      id: Date.now().toString(),
      url: '', // No video URL
      prompt: generatedPrompt,
      model: VeoModel.QUALITY, // Defaulting for metadata
      timestamp: Date.now()
    };

    setSavedPrompts(prev => [newEntry, ...prev]);
  };

  const handleDelete = (id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-veo-500/30">
      
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-veo-400 to-veo-600 rounded-lg flex items-center justify-center shadow-lg shadow-veo-500/20">
              <SparklesIcon className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Veo <span className="text-veo-400">Prompt Gen</span></h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
             <span>No API Key Required</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Prompt Builder */}
          <section className="bg-dark-800 rounded-2xl p-6 border border-dark-700 shadow-xl relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-veo-600/5 rounded-full blur-3xl -z-10" />

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-veo-400" />
                Parameters
              </h2>
              <button 
                onClick={handleSurpriseMe}
                className="text-xs text-veo-400 hover:text-veo-300 font-medium flex items-center gap-1 transition-colors px-3 py-1.5 rounded-full bg-veo-900/30 border border-veo-900"
              >
                <WandIcon className="w-3 h-3" />
                Randomize
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Subject</label>
                <textarea 
                  placeholder="e.g. A futuristic car driving through neon city"
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-veo-500 focus:ring-1 focus:ring-veo-500 transition-all placeholder-gray-600 h-24 resize-none"
                  value={promptState.subject}
                  onChange={e => setPromptState({...promptState, subject: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Style</label>
                  <select 
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-veo-500 text-gray-300"
                    value={promptState.style}
                    onChange={e => setPromptState({...promptState, style: e.target.value})}
                  >
                    {STYLE_PRESETS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Lighting</label>
                  <select 
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-veo-500 text-gray-300"
                    value={promptState.lighting}
                    onChange={e => setPromptState({...promptState, lighting: e.target.value})}
                  >
                    {LIGHTING_PRESETS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Camera</label>
                  <select 
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-veo-500 text-gray-300"
                    value={promptState.camera}
                    onChange={e => setPromptState({...promptState, camera: e.target.value})}
                  >
                    {CAMERA_PRESETS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Atmosphere</label>
                   <input 
                    type="text"
                    placeholder="e.g. Foggy"
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-veo-500 text-gray-300"
                    value={promptState.atmosphere}
                    onChange={e => setPromptState({...promptState, atmosphere: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                   <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Additional Details</label>
                   <input 
                    type="text"
                    placeholder="e.g. 8k resolution, highly detailed"
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-veo-500 text-gray-300"
                    value={promptState.custom}
                    onChange={e => setPromptState({...promptState, custom: e.target.value})}
                  />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Output & History */}
        <div className="lg:col-span-7 space-y-6">
            
            {/* Live Preview */}
            <div className="bg-dark-800 rounded-2xl p-1 border border-dark-700 shadow-xl">
                <div className="bg-dark-900/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Final Prompt Output</h3>
                        <div className="flex items-center gap-2">
                             <button 
                                onClick={handleCopy}
                                className={`text-xs px-3 py-1.5 rounded-md transition-all font-medium ${
                                    copied 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                    : 'bg-dark-800 text-gray-300 border border-dark-600 hover:bg-dark-700'
                                }`}
                            >
                                {copied ? 'Copied!' : 'Copy Text'}
                            </button>
                            <button 
                                onClick={handleSavePrompt}
                                disabled={!generatedPrompt}
                                className="text-xs px-3 py-1.5 rounded-md bg-veo-600 hover:bg-veo-500 text-white font-medium transition-colors shadow-lg shadow-veo-900/50"
                            >
                                Save to Library
                            </button>
                        </div>
                    </div>
                    <textarea 
                        className="w-full h-40 bg-black/20 border-l-2 border-veo-500 pl-4 py-2 text-lg leading-relaxed focus:outline-none resize-none font-light text-gray-100"
                        value={generatedPrompt}
                        onChange={e => setGeneratedPrompt(e.target.value)}
                        placeholder="Your generated prompt will appear here..."
                    />
                </div>
            </div>

             <div className="flex items-center justify-between mt-8 mb-4">
                 <h2 className="text-xl font-bold text-white">Saved Prompts</h2>
                 <span className="text-xs text-gray-500">{savedPrompts.length} items</span>
             </div>

             {savedPrompts.length === 0 ? (
                 <div className="bg-dark-800/30 border border-dark-700 border-dashed rounded-2xl h-[300px] flex flex-col items-center justify-center text-gray-500">
                     <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4">
                        <SparklesIcon className="w-8 h-8 opacity-20" />
                     </div>
                     <p>No prompts saved yet.</p>
                     <p className="text-sm mt-1">Adjust parameters and click "Save to Library".</p>
                 </div>
             ) : (
                 <div className="grid grid-cols-1 gap-4">
                     {savedPrompts.map(video => (
                         <VideoResult key={video.id} video={video} /> // Renamed functionally to PromptCard
                     ))}
                 </div>
             )}
        </div>
      </main>
    </div>
  );
}