"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Button } from '@/components/ui/button';

export default function AgilityTest() {
  const router = useRouter();
  const [step, setStep] = useState<"questions" | "result">("questions");
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [score, setScore] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const correctAnswers = { q1: '12', q2: '15', q3: '9' };
    let total = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key as keyof typeof answers] === correctAnswers[key as keyof typeof correctAnswers]) {
        total++;
      }
    });
    setScore(total * 10);
    setStep("result");
  };

  return (
    <div className="fixed inset-0 overflow-auto bg-gradient-to-b from-orange-900 to-gray-900">
      <ParticlesBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-gray-800 border-gray-700 shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-6">Mental Agility Test</h1>

          {step === "questions" && (
            <div className="space-y-4">
              <p className="text-white">Answer the following math questions:</p>
              <label className="text-white block">What is 6 + 6?</label>
              <input
                name="q1"
                className="w-full p-2 rounded"
                onChange={handleChange}
                value={answers.q1}
                autoComplete="off"
              />
              <label className="text-white block">What is 5 × 3?</label>
              <input
                name="q2"
                className="w-full p-2 rounded"
                onChange={handleChange}
                value={answers.q2}
                autoComplete="off"
              />
              <label className="text-white block">What is 18 ÷ 2?</label>
              <input
                name="q3"
                className="w-full p-2 rounded"
                onChange={handleChange}
                value={answers.q3}
                autoComplete="off"
              />
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          )}

          {step === "result" && (
            <div className="text-white space-y-4 mt-6">
              <p>Your Score: <span className="text-amber-400">{score}/30</span></p>
              <Button onClick={() => router.push('/employee/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}