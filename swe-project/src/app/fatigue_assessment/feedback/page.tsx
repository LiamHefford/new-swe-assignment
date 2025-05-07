'use client';
import { getFatigueScore } from '@/lib/fatigueScore';
import { generateFeedback } from '@/lib/feedback';
import { useState } from 'react';

export default function FeedbackPage() {
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const getFeedback = () => {
    const s = getFatigueScore('EMP001');
    const f = generateFeedback(s);
    setScore(s);
    setFeedback(f);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Your Feedback</h1>
      <button onClick={getFeedback} className="bg-teal-600 text-white px-4 py-2 mt-4 rounded">
        Get Feedback
      </button>
      {score !== null && (
        <div className="mt-4">
          <p>Fatigue Score: <strong>{score}</strong></p>
          <p>Feedback: {feedback}</p>
        </div>
      )}
    </div>
  );
}