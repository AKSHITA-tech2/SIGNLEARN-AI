import { GoogleGenAI, SchemaType, Type } from "@google/genai";
import { LessonPlan, RecognitionResult, UserProfile } from "../types";

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

// Helper to validate API key
export const hasApiKey = () => !!apiKey;

const MODEL_FLASH = 'gemini-2.5-flash';

/**
 * Generates a daily lesson plan based on the user's profile and progress.
 */
export const generateSessionPlan = async (profile: UserProfile): Promise<LessonPlan[]> => {
  if (!apiKey) return mockLessonPlans;

  const prompt = `
    Create a personalized daily lesson plan for a DHH child named ${profile.name}.
    Age: ${profile.age}. Level: ${profile.level}. Current Mood: ${profile.mood}.
    
    The plan should have 3 distinct activities.
    Types can be: 'story', 'practice', 'game'.
    
    Return a JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['story', 'practice', 'game'] },
              difficulty: { type: Type.INTEGER },
              estimatedDuration: { type: Type.INTEGER },
              completed: { type: Type.BOOLEAN },
            },
            required: ['id', 'title', 'description', 'type', 'difficulty', 'estimatedDuration', 'completed']
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as LessonPlan[];
  } catch (error) {
    console.error("Plan generation failed", error);
    return mockLessonPlans;
  }
};

/**
 * Analyzes an image frame to verify a sign.
 */
export const verifySign = async (
  imageBase64: string, 
  targetSign: string
): Promise<RecognitionResult> => {
  if (!apiKey) {
    // Mock response if no key
    return {
      isCorrect: true,
      confidence: 0.85,
      feedback: "Great job! (Mock)",
      detectedSign: targetSign
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64.split(',')[1] // remove data:image/jpeg;base64, prefix
            }
          },
          {
            text: `A child is attempting to perform the ASL sign for "${targetSign}". 
            Analyze the hand shape, position, and orientation.
            Is the sign correct? Provide encouraging feedback suitable for a child.
            Return JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            detectedSign: { type: Type.STRING },
          },
          required: ['isCorrect', 'confidence', 'feedback']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as RecognitionResult;
  } catch (error) {
    console.error("Sign verification failed", error);
    return {
      isCorrect: false,
      confidence: 0,
      feedback: "I couldn't quite see that. Can you try again?",
    };
  }
};

/**
 * Generates the next segment of an interactive story.
 */
export const generateStorySegment = async (
  history: string[], 
  userAction: string,
  difficulty: string
): Promise<{ text: string; gloss: string; nextPrompt: string }> => {
  if (!apiKey) return {
    text: "Once upon a time, there was a brave little rabbit.",
    gloss: "LONG-AGO RABBIT BRAVE SMALL EXIST.",
    nextPrompt: "What should the rabbit do?"
  };

  const prompt = `
    Continue the interactive story for a DHH child.
    Difficulty: ${difficulty}.
    Previous context: ${history.join('\n')}.
    User's last action: ${userAction}.
    
    Output a JSON object with:
    - text: The story sentence (English).
    - gloss: The ASL gloss (UPPERCASE, distinct grammar).
    - nextPrompt: A question asking the child what to do next.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            gloss: { type: Type.STRING },
            nextPrompt: { type: Type.STRING },
          },
          required: ['text', 'gloss', 'nextPrompt']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text);
  } catch (error) {
    return {
      text: "The connection was lost, but the adventure continues!",
      gloss: "CONNECTION LOST ADVENTURE CONTINUE",
      nextPrompt: "Try again?"
    };
  }
};

const mockLessonPlans: LessonPlan[] = [
  {
    id: '1',
    title: 'Morning Adventure',
    description: 'Learn animal signs with a story about a zoo.',
    type: 'story',
    difficulty: 1,
    estimatedDuration: 10,
    completed: false
  },
  {
    id: '2',
    title: 'Finger Spelling Dash',
    description: 'Quick fire A-Z practice.',
    type: 'practice',
    difficulty: 2,
    estimatedDuration: 5,
    completed: false
  },
  {
    id: '3',
    title: 'Emotion Check',
    description: 'Expressing feelings through signs.',
    type: 'game',
    difficulty: 1,
    estimatedDuration: 5,
    completed: false
  }
];
