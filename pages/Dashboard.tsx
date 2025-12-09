import React, { useEffect, useState } from 'react';
import { generateSessionPlan } from '../services/geminiService';
import { LessonPlan, UserProfile, AppView } from '../types';

interface DashboardProps {
  user: UserProfile;
  onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onChangeView }) => {
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlan = async () => {
      setLoading(true);
      const generated = await generateSessionPlan(user);
      setPlans(generated);
      setLoading(false);
    };
    loadPlan();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Ready to learn, {user.name}?</h2>
          <p className="opacity-90 mb-6">Your personalized adventure awaits! AI has prepared a special path for you today.</p>
          <div className="flex gap-4">
             <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
               <div className="text-2xl font-bold">Level {user.level === 'beginner' ? 1 : 2}</div>
               <div className="text-xs opacity-75">Current Rank</div>
             </div>
             <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
               <div className="text-2xl font-bold">{user.xp} XP</div>
               <div className="text-xs opacity-75">Total Experience</div>
             </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
          <svg width="300" height="300" viewBox="0 0 200 200">
             <path fill="currentColor" d="M45,-75C58,-68,68,-55,75,-41C82,-27,86,-12,85,3C84,18,78,33,68,45C58,57,44,66,29,71C14,76,-1,77,-16,75C-31,73,-46,68,-58,58C-70,48,-79,33,-82,17C-85,1,-82,-16,-74,-30C-66,-44,-53,-55,-40,-63C-27,-71,-13,-76,1,-78C15,-80,32,-82,45,-75Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Daily Plan Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-lg">☀️</span> 
          Today's Mission
        </h3>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div 
                key={plan.id} 
                onClick={() => {
                  if(plan.type === 'story') onChangeView(AppView.STORY_MODE);
                  if(plan.type === 'practice') onChangeView(AppView.PRACTICE_MODE);
                }}
                className={`
                  group cursor-pointer rounded-2xl p-6 border-2 transition-all hover:-translate-y-1 hover:shadow-lg
                  ${plan.completed ? 'bg-green-50 border-green-200 opacity-75' : 'bg-white border-slate-100'}
                `}
              >
                <div className={`
                  w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl
                  ${plan.type === 'story' ? 'bg-blue-100 text-blue-600' : ''}
                  ${plan.type === 'practice' ? 'bg-orange-100 text-orange-600' : ''}
                  ${plan.type === 'game' ? 'bg-purple-100 text-purple-600' : ''}
                `}>
                  {plan.type === 'story' && '📖'}
                  {plan.type === 'practice' && '🖐️'}
                  {plan.type === 'game' && '🎮'}
                </div>
                <h4 className="font-bold text-lg text-slate-800 mb-1">{plan.title}</h4>
                <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-500">
                    {plan.estimatedDuration} mins
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform text-indigo-500 font-bold">
                    Start →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Preview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-700 mb-4">Weekly Emotion & Engagement</h3>
        <div className="flex items-end gap-2 h-32">
          {[60, 45, 75, 50, 80, 70, 90].map((h, i) => (
            <div key={i} className="flex-1 bg-indigo-50 rounded-t-lg relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-lg transition-all duration-1000"
                style={{ height: `${h}%` }}
              ></div>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                {h}% Focus
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </div>
  );
};
