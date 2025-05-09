"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Button } from '@/components/ui/button';

export default function MemoryTest() {
  const router = useRouter();
  const [step, setStep] = useState<"view" | "input" | "result">("view");
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const words = ["Apple", "Banana", "Grape"];

  const handleStartTest = () => {
    setTimeout(() => {
      setStep("input");
    }, 4000); // display words for 4 seconds
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const correct = ["apple", "banana", "grape"];
    const user = [answers.q1, answers.q2, answers.q3];
    let score = 0;
    user.forEach((ans, i) => {
      if (ans.trim().toLowerCase() === correct[i]) score++;
    });
    setScore(score * 10);
    setFeedback(score >= 2 ? "Excellent memory!" : "Keep practicing.");
    setStep("result");
  };

  const handleReturn = () => {
    router.push('/employee/dashboard');
  };

  return (
    <div className="fixed inset-0 overflow-auto bg-gradient-to-b from-orange-900 to-gray-900">
      <ParticlesBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-gray-800 border-gray-700 shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-6">Memory Recall Test</h1>

          {step === "view" && (
            <>
              <p className="text-white mb-4">Memorize these words:</p>
              <div className="text-2xl font-bold text-amber-300 space-x-4 mb-4">
                {words.map((word) => <span key={word}>{word}</span>)}
              </div>
              <Button onClick={handleStartTest}>Start</Button>
            </>
          )}

          {step === "input" && (
            <div className="space-y-4">
              <p className="text-white">Enter the 3 words you remember:</p>
              <input name="q1" className="w-full p-2 rounded" onChange={handleInputChange} />
              <input name="q2" className="w-full p-2 rounded" onChange={handleInputChange} />
              <input name="q3" className="w-full p-2 rounded" onChange={handleInputChange} />
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          )}

          {step === "result" && (
            <div className="text-white space-y-4 mt-6">
              <p>Your Score: <span className="text-amber-400">{score}/30</span></p>
              <p className="italic">{feedback}</p>
              <Button onClick={handleReturn}>Back to Dashboard</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}