"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Button } from '@/components/ui/button';

export default function FocusTest() {
  const router = useRouter();
  const [testStarted, setTestStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showClickNow, setShowClickNow] = useState(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (testStarted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (testStarted && countdown === 0) {
      const delay = Math.floor(Math.random() * 3000) + 2000;
      const timeout = setTimeout(() => {
        setShowClickNow(true);
        setStartTime(Date.now());
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [testStarted, countdown]);

  const handleStart = () => {
    setTestStarted(true);
    setCountdown(3);
    setShowClickNow(false);
    setReactionTime(null);
  };

  const handleClick = () => {
    if (showClickNow && startTime) {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setShowClickNow(false);
      setTestStarted(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-auto bg-gradient-to-b from-orange-900 to-gray-900">
      <ParticlesBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-gray-800 border-gray-700 shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-6">Focus Test</h1>

          {!testStarted && reactionTime === null && (
            <Button onClick={handleStart}>Start Test</Button>
          )}

          {testStarted && !showClickNow && (
            <p className="text-white text-xl">
              Get ready... {countdown > 0 ? countdown : "Wait for it..."}
            </p>
          )}

          {showClickNow && (
            <Button
              onClick={handleClick}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 mt-4"
            >
              CLICK NOW!
            </Button>
          )}

          {reactionTime !== null && (
            <div className="text-white space-y-4 mt-6">
              <p>
                Your reaction time:{" "}
                <span className="text-amber-400">{reactionTime} ms</span>
              </p>
              <Button
                onClick={() => router.push('/employee/dashboard')}
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2"
              >
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}