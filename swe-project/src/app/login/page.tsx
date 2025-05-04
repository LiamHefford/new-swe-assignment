'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // TODO: Replace with actual authentication logic
      // Will currently just check if email matches and password is not empty
      if (email === 'management@joltr.com' && password) {
        // Mock successful login for management
        setTimeout(() => {
          router.push('/management/dashboard')
        }, 1000)
      } else if (email === 'employee@joltr.com' && password) {
        // Mock successful login for employee
        setTimeout(() => {
          router.push('/employee/dashboard')
        }, 1000)
      } else {
        setError('Please enter both email and password')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Failed to login. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Particles background */}
      <ParticlesBackground />
      
      <div className="w-full max-w-md rounded-lg bg-gray-800/50 backdrop-filter backdrop-blur-md border border-orange-800/30 p-8 shadow-lg z-10">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-100">Login to Joltr</h1>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-900/50 p-3 text-sm text-red-200 border border-red-700">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              placeholder="you@joltr.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me {/* NOTE: This is not implemented */}
              </label>
            </div>
            
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-orange-400 hover:text-orange-300">
                Forgot your password? {/* NOTE: This is not implemented */}
              </Link>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 focus:outline-none disabled:bg-orange-800 disabled:text-gray-300"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Don't have an account?</span>{' '}
          <Link href="/signup" className="font-medium text-orange-400 hover:text-orange-300">
            Sign up {/* NOTE: This is not implemented */}
          </Link>
        </div>
      </div>
    </div>
  )
}