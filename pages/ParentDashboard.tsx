import React from 'react';

export const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Therapist & Parent Portal</h2>
        <p className="opacity-70">Monitor Alex's progress, adjust difficulty, and view safety logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-6">Vocabulary Acquisition</h3>
          <div className="flex items-end gap-4 h-48 px-2">
            {[10, 15, 22, 28, 35, 42].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group">
                <div 
                  className="bg-indigo-500 rounded-t w-full transition-all hover:bg-indigo-600 relative"
                  style={{ height: `${val * 2}%` }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {val} words
                  </span>
                </div>
                <div className="text-center text-xs text-slate-400 mt-2">Wk {i+1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-4">AI Observations</h3>
          <div className="space-y-4">
             <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
               <div className="text-xs font-bold text-yellow-600 uppercase mb-1">Attention Span</div>
               <p className="text-sm text-slate-700">Alex showed signs of boredom after 15 mins of "Animals". Recommendation: Switch to "Space" theme.</p>
             </div>
             <div className="p-4 bg-green-50 rounded-xl border border-green-100">
               <div className="text-xs font-bold text-green-600 uppercase mb-1">Breakthrough</div>
               <p className="text-sm text-slate-700">Successfully recognized "FRIEND" and "PLAY" without prompts today!</p>
             </div>
          </div>
        </div>
      </div>

      {/* Safety Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-4">Privacy & Safety</h3>
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <h4 className="font-semibold text-slate-800">Local Processing Only</h4>
            <p className="text-xs text-slate-500">Ensure sensitive video data never leaves the device unless for verification.</p>
          </div>
          <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
           <div>
            <h4 className="font-semibold text-slate-800">Anonymize Reports</h4>
            <p className="text-xs text-slate-500">Remove names from AI generated summaries.</p>
          </div>
          <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
             <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
