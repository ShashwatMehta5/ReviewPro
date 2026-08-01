'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email, password
    })

    if (error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⭐</div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Log in to your ReviewPro dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full rounded-xl py-4 font-semibold text-white transition-all ${loading ? 'bg-gray-300' : 'bg-gray-900'}`}
          >
            {loading ? 'Logging in...' : 'Log In →'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            No account yet?{' '}
            <a href="/auth/signup" className="text-gray-900 font-medium">
              Start free trial
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}