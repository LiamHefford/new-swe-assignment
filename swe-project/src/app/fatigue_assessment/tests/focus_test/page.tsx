"use client";

import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/components/ParticlesBackground';
import { Button } from '@/components/ui/button';

export default function FocusTest() {
  const router = useRouter();
  
  const handleReturnToDashboard = () => {
    router.push('/employee/dashboard');
  };
  
  return (
    <div className="fixed inset-0 overflow-auto bg-gradient-to-b from-orange-900 to-gray-900">
      <ParticlesBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="flex items-center justify-center w-full max-w-2xl text-center">
          <div className="bg-gray-800 border-gray-700 shadow-lg rounded-lg p-8">
            <h1 className="text-4xl md:text-5xl pb-7 font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
              Focus Test
            </h1>
            
            <div className="text-lg text-gray-300 space-y-6 mt-6">
              <p>
                This test is currently under development.
              </p>
              
              <div className="flex items-center justify-center my-4">
                <div className="w-16 h-16 text-5xl mb-2">🔨</div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={handleReturnToDashboard}
                  className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}