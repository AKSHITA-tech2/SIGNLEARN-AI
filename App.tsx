import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { StoryTime } from './pages/StoryTime';
import { PracticeMode } from './pages/PracticeMode';
import { ParentDashboard } from './pages/ParentDashboard';
import { AppView, UserProfile } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  
  // Mock User Profile State
  const [user] = useState<UserProfile>({
    name: "Alex",
    age: 7,
    level: 'beginner',
    xp: 1240,
    streak: 12,
    mood: 'happy',
    lastSession: new Date().toISOString()
  });

  const renderView = () => {
    switch(currentView) {
      case AppView.DASHBOARD:
        return <Dashboard user={user} onChangeView={setCurrentView} />;
      case AppView.STORY_MODE:
        return <StoryTime />;
      case AppView.PRACTICE_MODE:
        return <PracticeMode />;
      case AppView.PARENT_DASHBOARD:
        return <ParentDashboard />;
      case AppView.SETTINGS:
        return <div className="p-10 text-center text-slate-500">Settings Placeholder</div>;
      default:
        return <Dashboard user={user} onChangeView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
