import React, { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Camera } from '../components/Camera';
import { generateStorySegment } from '../services/geminiService';

export const StoryTime: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("Hi! I'm your storyteller. Are you ready for an adventure?");
  const [currentGloss, setCurrentGloss] = useState("HELLO I STORYTELLER. ADVENTURE READY?");
  const [loading, setLoading] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);

  const handleNext = async () => {
    setLoading(true);
    // Simulate context based on a random choice for demo purposes
    const action = "User smiled and nodded"; 
    const segment = await generateStorySegment(history, action, "beginner");
    
    setHistory([...history, currentText]);
    setCurrentText(segment.text);
    setCurrentGloss(segment.gloss);
    setLoading(false);
    setWaitingForInput(true);
  };

  const handleUserSign = () => {
    // This would be triggered by ML recognition in a real app
    // Here we simulate the 'Correct' response from the user
    setWaitingForInput(false);
    handleNext();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Story Stage */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: AI Avatar & Story */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-indigo-100 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
           
           <Avatar mood={loading ? 'thinking' : 'excited'} speaking={!waitingForInput} />
           
           <div className="mt-8 text-center space-y-4 max-w-md z-10">
             {loading ? (
                <div className="animate-pulse flex flex-col gap-2 items-center">
                  <div className="h-4 w-48 bg-slate-200 rounded"></div>
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <span className="text-sm text-slate-400 font-mono">AI is crafting the story...</span>
                </div>
             ) : (
               <>
                <h3 className="text-2xl font-bold text-slate-800 leading-relaxed">
                  {currentText}
                </h3>
                <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 inline-block">
                  <p className="text-indigo-600 font-mono font-bold tracking-wide text-sm">
                    GLOSS: {currentGloss}
                  </p>
                </div>
               </>
             )}
           </div>
        </div>

        {/* Right: User Camera & Interaction */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-black rounded-3xl overflow-hidden relative shadow-lg">
             <Camera label="Emotion & Sign Detector Active" />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
             <h4 className="font-bold text-slate-700 mb-2">Your Turn!</h4>
             <p className="text-sm text-slate-500 mb-4">
               Sign <span className="font-bold text-indigo-600">"READY"</span> to continue or make a choice.
             </p>
             
             <div className="flex gap-3">
               <button 
                 onClick={handleUserSign}
                 disabled={loading}
                 className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
               >
                 I Signed It! 👋
               </button>
               <button 
                 className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
                 title="Ask for help"
               >
                 ❓
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
