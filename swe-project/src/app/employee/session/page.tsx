'use client';
import { startGameSession } from '@/lib/gameSession';
import { useState } from 'react';

export default function SessionPage() {
  const [session, setSession] = useState<any>(null);

  const startSession = () => {
    const newSession = startGameSession('EMP001');
    setSession(newSession);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Start Game Session</h1>
      <button onClick={startSession} className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
        Start Session
      </button>
      {session && (
        <div className="mt-4">
          <p>Session ID: {session.sessionId}</p>
          <p>Status: {session.status}</p>
          <p>Start Time: {session.startTime.toString()}</p>
        </div>
      )}
    </div>
  );
}