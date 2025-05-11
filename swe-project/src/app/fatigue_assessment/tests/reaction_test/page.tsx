'use client';

import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import ParticlesBackground from '@/components/ParticlesBackground';

// Define app states
type AppState = 'instructions' | 'countdown' | 'waiting' | 'clicked' | 'toosoon' | 'results';

// Define the state shape
type State = {
  phase: AppState;
  countdown: number;
  startTime: number | null;
  reactionTime: number | null;
  attempts: number[];
  isCircleVisible: boolean;
};

// Define action types
type Action =
  | { type: 'START_TEST' }
  | { type: 'TICK_COUNTDOWN' }
  | { type: 'SHOW_CIRCLE' }
  | { type: 'CIRCLE_CLICKED'; payload: number }
  | { type: 'CLICKED_TOO_SOON' }
  | { type: 'CONTINUE' }
  | { type: 'SHOW_RESULTS' }
  | { type: 'RETRY_TEST' }
  | { type: 'RETURN_TO_DASHBOARD' };

// Initial state
const initialState: State = {
  phase: 'instructions',
  countdown: 3,
  startTime: null,
  reactionTime: null,
  attempts: [],
  isCircleVisible: false
};

// Function for state management
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_TEST':
      return {
        ...state,
        phase: 'countdown',
        countdown: 3,
        isCircleVisible: false
      };
    case 'TICK_COUNTDOWN':
      return {
        ...state,
        countdown: state.countdown - 1
      };
    case 'SHOW_CIRCLE':
      return {
        ...state,
        phase: 'waiting',
        startTime: Date.now(),
        isCircleVisible: true
      };
    case 'CIRCLE_CLICKED':
      return {
        ...state,
        phase: 'clicked',
        isCircleVisible: false,
        startTime: null,
        reactionTime: action.payload,
        attempts: [...state.attempts, action.payload]
      };
    case 'CLICKED_TOO_SOON':
      return {
        ...state,
        phase: 'toosoon',
        isCircleVisible: false
      };
    case 'CONTINUE':
      return {
        ...state,
        phase: state.attempts.length >= 5 ? 'results' : 'countdown',
        countdown: 3,
        reactionTime: null,
        isCircleVisible: false
      };
    case 'SHOW_RESULTS':
      return {
        ...state,
        phase: 'results'
      };
    case 'RETRY_TEST':
      return {
        ...initialState,
        phase: 'countdown',
        countdown: 3
      };
    case 'RETURN_TO_DASHBOARD':
      return initialState;
    default:
      return state;
  }
}

export default function ReactionTest() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Refs to store timeouts/intervals
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const circleAppearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownCompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear all timers
  const clearAllTimers = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (circleAppearTimeoutRef.current) {
      clearTimeout(circleAppearTimeoutRef.current);
      circleAppearTimeoutRef.current = null;
    }
    if (countdownCompleteTimeoutRef.current) {
      clearTimeout(countdownCompleteTimeoutRef.current);
      countdownCompleteTimeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return clearAllTimers;
  }, [clearAllTimers]);
  
  // Handle countdown logic
  useEffect(() => {
    if (state.phase === 'countdown') {
      clearAllTimers();
      
      countdownIntervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK_COUNTDOWN' });
      }, 1000);
      
      return () => {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      };
    }
  }, [state.phase, clearAllTimers]);
  
  // Handle showing circle after countdown reaches 0
  useEffect(() => {
    if (state.phase === 'countdown' && state.countdown <= 0) {
      // Clear the countdown interval
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      
      // Add a small delay to ensure the "0" is visible
      countdownCompleteTimeoutRef.current = setTimeout(() => {
        // Generate random delay between 1.5-5.5 seconds
        const delay = Math.floor(Math.random() * 4000) + 1500;
        
        // Set a timeout to show the circle
        circleAppearTimeoutRef.current = setTimeout(() => {
          dispatch({ type: 'SHOW_CIRCLE' });
        }, delay);
      }, 400);
    }
  }, [state.phase, state.countdown]);
  
  // Handle the start of the test
  const handleStart = useCallback(() => {
    clearAllTimers();
    dispatch({ type: 'START_TEST' });
  }, [clearAllTimers]);
  
  // Handle clicking on the target
  const handleTargetClick = useCallback(() => {
    if (state.phase === 'waiting' && state.startTime) {
      clearAllTimers();
      const reactionTime = Date.now() - state.startTime;
      dispatch({ type: 'CIRCLE_CLICKED', payload: reactionTime });
    }
  }, [state.phase, state.startTime, clearAllTimers]);
  
  // Handle clicking too soon
  const handleScreenClick = useCallback(() => {
    if (state.phase === 'countdown') {
      clearAllTimers();
      dispatch({ type: 'CLICKED_TOO_SOON' });
    }
  }, [state.phase, clearAllTimers]);
  
  // Handle continuing to next attempt or finishing
  const handleContinue = useCallback(() => {
    clearAllTimers();
    dispatch({ type: 'CONTINUE' });
  }, [clearAllTimers]);
  
  // Handle retrying the test
  const handleRetry = useCallback(() => {
    clearAllTimers();
    dispatch({ type: 'RETRY_TEST' });
  }, [clearAllTimers]);
  
  // Handle returning to dashboard
  const handleReturnToDashboard = useCallback(() => {
    clearAllTimers();
    router.push('/employee/dashboard');
  }, [router, clearAllTimers]);
  
  // Calculate average reaction time
  const averageReactionTime = state.attempts.length > 0 
    ? Math.round(state.attempts.reduce((sum, time) => sum + time, 0) / state.attempts.length) 
    : 0;
  
  // Calculate fatigue score based on reaction time
  const calculateFatigueScore = useCallback(() => {
    // This is a placeholder formula for fatigue score calculation
    // It will be replaced with a reusable function in the future
    const baseScore = Math.min(100, Math.max(0, Math.round((averageReactionTime - 200) / 4.0)));
    return baseScore;
  }, [averageReactionTime]);
  
  // Render different components based on the current state
  const renderContent = () => {
    switch (state.phase) {
      case 'instructions':
        return (
          <Card className="bg-gray-800 border-gray-700 shadow-lg w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl font-semibold text-orange-400">Reaction Time Test</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Test your reaction speed by clicking on the circle as soon as it appears.</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                <li>When ready, click the Start button below</li>
                <li>Wait for the orange circle to appear</li>
                <li>Click the circle as quickly as you can</li>
                <li>Complete 5 attempts for a final fatigue score</li>
              </ul>
              <p className="text-sm text-gray-500">This test measures your reaction time, which is affected by fatigue levels.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleReturnToDashboard}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleStart}
                className="bg-orange-600 hover:bg-orange-500 text-white"
              >
                Start Test
              </Button>
            </CardFooter>
          </Card>
        );
      
      case 'countdown':
        return (
          <div 
            className="w-full h-96 flex flex-col items-center justify-center"
            onClick={handleScreenClick}
          >
            <p className="text-3xl text-white mb-8">Get ready...</p>
            <p className="text-6xl font-bold text-orange-400">
              {state.countdown > 0 ? state.countdown : "Click when the circle appears!"}
            </p>
          </div>
        );
      
      case 'waiting':
        return state.isCircleVisible ? (
          <div 
            className="w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150"
            style={{ backgroundColor: '#fb923c' }}
            onClick={handleTargetClick}
          >
            <p className="text-white text-2xl font-bold">Click!</p>
          </div>
        ) : null;
      
      case 'clicked':
        return (
          <Card className="bg-gray-800 border-gray-700 shadow-lg w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl font-semibold text-orange-400">Results</h2>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-4xl font-bold text-white mb-2">{state.reactionTime} ms</p>
              <p className="text-sm text-gray-400">
                {state.reactionTime && state.reactionTime < 300 ? "Excellent!" : 
                 state.reactionTime && state.reactionTime < 400 ? "Good!" : 
                 state.reactionTime && state.reactionTime < 500 ? "Average" : "Needs improvement"}
              </p>
              <div className="mt-8">
                <p className="text-gray-300">Attempt {state.attempts.length} of 5</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-orange-500 h-2.5 rounded-full" 
                    style={{ width: `${(state.attempts.length / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleContinue}
                className="bg-orange-600 hover:bg-orange-500 text-white"
              >
                {state.attempts.length >= 5 ? "See Final Results" : "Continue"}
              </Button>
            </CardFooter>
          </Card>
        );
      
      case 'toosoon':
        return (
          <Card className="bg-gray-800 border-gray-700 shadow-lg w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl font-semibold text-red-400">Too soon!</h2>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-4">You clicked before the target appeared.</p>
              <p className="text-sm text-gray-400">Wait for the circle to appear before clicking.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleStart}
                className="bg-orange-600 hover:bg-orange-500 text-white"
              >
                Try Again
              </Button>
            </CardFooter>
          </Card>
        );
      
      case 'results':
        return (
          <Card className="bg-gray-800 border-gray-700 shadow-lg w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl font-semibold text-orange-400">Test Complete</h2>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-gray-300 mb-2">Average Reaction Time:</p>
                <p className="text-4xl font-bold text-white">{averageReactionTime} ms</p>
              </div>
              
              <div className="mb-8">
                <p className="text-gray-300 mb-2">Estimated Fatigue Score:</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-700 rounded-full h-4 mr-4">
                    <div 
                      className={`h-4 rounded-full ${
                        calculateFatigueScore() < 40 ? 'bg-green-500' :
                        calculateFatigueScore() < 70 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${calculateFatigueScore()}%` }}
                    ></div>
                  </div>
                  <span className="text-xl font-bold text-white">{calculateFatigueScore()}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">All attempts (ms):</p>
                <div className="grid grid-cols-5 gap-2">
                  {state.attempts.map((time, index) => (
                    <div key={index} className="bg-gray-700 p-2 rounded text-center">
                      <p className="text-xs text-gray-400">#{index + 1}</p>
                      <p className="text-sm text-white">{time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={handleRetry}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Retry Test
              </Button>
              <Button 
                onClick={handleReturnToDashboard}
                className="bg-orange-600 hover:bg-orange-500 text-white"
              >
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 overflow-auto bg-gradient-to-b from-orange-900 to-gray-900">
      <ParticlesBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="flex items-center justify-center w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}