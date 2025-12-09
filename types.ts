export interface UserProfile {
  name: string;
  age: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  streak: number;
  mood: 'happy' | 'neutral' | 'frustrated' | 'tired';
  lastSession: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'practice' | 'game';
  difficulty: number;
  estimatedDuration: number; // minutes
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  signGloss?: string; // The textual representation of signs
  timestamp: number;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  STORY_MODE = 'STORY_MODE',
  PRACTICE_MODE = 'PRACTICE_MODE',
  PARENT_DASHBOARD = 'PARENT_DASHBOARD',
  SETTINGS = 'SETTINGS',
}

export interface RecognitionResult {
  isCorrect: boolean;
  confidence: number;
  feedback: string;
  detectedSign?: string;
}
