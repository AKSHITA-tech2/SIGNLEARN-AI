import React, { useState } from 'react';
import { Camera } from '../components/Camera';
import { verifySign } from '../services/geminiService';
import { RecognitionResult } from '../types';

export const PracticeMode: React.FC = () => {
  const [targetWord, setTargetWord] = useState('APPLE');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);

  const handleCapture = async (imageSrc: string) => {
    setAnalyzing(true);
    setResult(null);
    const feedback = await verifySign(imageSrc, targetWord);
    setResult(feedback);
    setAnalyzing(false);
  };

  const nextWord = () => {
    const words = ['APPLE', 'CAT', 'FAMILY', 'FRIEND', 'PLAY'];
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
    setResult(null);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Challenge Card */}
      <div className="w-full md:w-1/3 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-100 text-center">
          <span className="text-sm font-bold text-orange-400 tracking-widest uppercase mb-2 block">Current Challenge</span>
          <h2 className="text-5xl font-black text-slate-800 mb-4">{targetWord}</h2>
          <div className="w-full aspect-video bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400">
            {/* Placeholder for a static reference image of the sign */}
            <span className="text-sm">Reference Image</span>
          </div>
          <p className="text-slate-500">
            Hold your hand up to the camera and make the sign for <b>{targetWord}</b>.
          </p>
        </div>
        
        {/* Results Feedback */}
        {result && (
          <div className={`rounded-2xl p-6 border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${result.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
             <h3 className={`text-xl font-bold mb-2 ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
               {result.isCorrect ? '🎉 Correct!' : '🤔 Not quite...'}
             </h3>
             <p className="text-slate-700 mb-4">{result.feedback}</p>
             {result.isCorrect && (
               <button onClick={nextWord} className="w-full py-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700 transition-colors">
                 Next Word →
               </button>
             )}
          </div>
        )}
      </div>

      {/* Main Camera Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-black rounded-3xl overflow-hidden shadow-2xl relative">
          <Camera 
            active={true} 
            onCapture={handleCapture}
            label={analyzing ? "AI Analyzing..." : "Ready to Verify"} 
          />
          {analyzing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <div className="text-white flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 mb-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-bold">Checking your sign...</span>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-slate-400 mt-4 text-sm">
          Powered by Gemini Vision. Press the camera button to verify your sign.
        </p>
      </div>
    </div>
  );
};
