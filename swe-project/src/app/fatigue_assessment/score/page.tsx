'use client';
import { getFatigueScore } from '@/lib/fatigueScore';
import { useState } from 'react';

export default function ScorePage() {
  const [score, setScore] = useState<number | null>(null);

  const fetchScore = () => {
    const fatigueScore = getFatigueScore('EMP001');
    setScore(fatigueScore);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Fatigue Score</h1>
      <button onClick={fetchScore} className="bg-purple-600 text-white px-4 py-2 mt-4 rounded">
        View Score
      </button>
      {score !== null && (
        <div className="mt-4">
          <p>Your Fatigue Score: <strong>{score}</strong></p>
        </div>
      )}
    </div>
  );
}