"use client";

import { useState } from "react";
import Link from "next/link";
import ParticlesBackground from '@/components/ParticlesBackground';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-orange-900 to-gray-900 relative overflow-hidden">
      <ParticlesBackground />
      
      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center z-10 relative">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
          Joltr
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-md">
          Welcome to Joltr.
        </p>
        
        <div className="mt-8">
          <Link href="/login">
            <button className="px-6 py-3 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-200 shadow-lg cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </main>
      
      <footer className="absolute bottom-4 text-sm text-gray-400 z-10">
        &copy; {new Date().getFullYear()} University of Derby - Software Engineering Project - Joltr
      </footer>
    </div>
  );
}
