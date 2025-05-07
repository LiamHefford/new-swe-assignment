'use client';
import { runDecisionMakingTest } from '@/lib/decisionTest';
import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);

  const handleTest = () => {
    const res = runDecisionMakingTest();
    setResult(res);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Decision-Making Test</h1>
      <button onClick={handleTest} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        Start Test
      </button>
      {result && (
        <div className="mt-4">
          <p>Score: {result.score}</p>
          <p>Completed: {result.completed ? 'Yes' : 'No'}</p>
          <p>Time Taken: {result.timeTaken}</p>
        </div>
      )}
    </div>
  );
}