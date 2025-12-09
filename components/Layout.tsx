import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden my-4 border border-white/50">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-24 bg-indigo-600 flex md:flex-col justify-between items-center p-4 shadow-lg z-10">
        <div className="mb-0 md:mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-inner">
            SB
          </div>
        </div>

        <div className="flex md:flex-col gap-6 w-full justify-center md:justify-start">
          <NavButton 
            active={currentView === AppView.DASHBOARD} 
            onClick={() => onChangeView(AppView.DASHBOARD)} 
            icon={<HomeIcon />} 
            label="Home" 
          />
          <NavButton 
            active={currentView === AppView.STORY_MODE} 
            onClick={() => onChangeView(AppView.STORY_MODE)} 
            icon={<BookIcon />} 
            label="Story" 
          />
          <NavButton 
            active={currentView === AppView.PRACTICE_MODE} 
            onClick={() => onChangeView(AppView.PRACTICE_MODE)} 
            icon={<HandIcon />} 
            label="Learn" 
          />
           <NavButton 
            active={currentView === AppView.PARENT_DASHBOARD} 
            onClick={() => onChangeView(AppView.PARENT_DASHBOARD)} 
            icon={<ChartIcon />} 
            label="Parents" 
          />
        </div>

        <div className="mt-auto hidden md:block">
          <NavButton 
            active={currentView === AppView.SETTINGS} 
            onClick={() => onChangeView(AppView.SETTINGS)} 
            icon={<SettingsIcon />} 
            label="Settings" 
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-slate-50 flex flex-col">
         {/* Top Bar */}
        <header className="h-16 border-b border-slate-200 bg-white/50 flex items-center justify-between px-6">
          <h1 className="text-xl font-bold text-slate-700 tracking-tight">
            {currentView === AppView.DASHBOARD && "Welcome back, Alex! 👋"}
            {currentView === AppView.STORY_MODE && "Story Time 📖"}
            {currentView === AppView.PRACTICE_MODE && "Sign Practice 🤟"}
            {currentView === AppView.PARENT_DASHBOARD && "Parent Dashboard 🛡️"}
            {currentView === AppView.SETTINGS && "Settings ⚙️"}
          </h1>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold flex items-center gap-1">
               🔥 12 Days
             </div>
             <div className="w-10 h-10 bg-indigo-100 rounded-full border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
               A
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          <div className="blob bg-purple-300 w-64 h-64 rounded-full top-0 left-0 mix-blend-multiply opacity-30 animate-blob"></div>
          <div className="blob bg-yellow-300 w-64 h-64 rounded-full bottom-0 right-0 mix-blend-multiply opacity-30 animate-blob animation-delay-2000"></div>
          {children}
        </div>
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-xl transition-all duration-300 group relative flex items-center justify-center ${
      active 
        ? 'bg-white text-indigo-600 shadow-lg scale-110' 
        : 'text-indigo-200 hover:bg-indigo-500/50 hover:text-white'
    }`}
    title={label}
  >
    {icon}
    {active && <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />}
  </button>
);

// Icons
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const HandIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
);
const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
const SettingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
