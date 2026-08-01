'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const categories = ['restaurant', 'salon', 'clinic', 'gym', 'hotel', 'retail']
const emojis = ['🍽️', '💇', '🏥', '💪', '🏨', '🛍️', '☕', '🏪', '💊', '🎓']

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '', category: 'restaurant', location: '',
    email: '', password: '', googleUrl: '', emoji: '🍽️'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    if (!form.name || !form.location || !form.email || !form.password || !form.googleUrl) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    const slug = generateSlug(form.name)

    // Create business record
    const { error: bizError } = await supabase.from('businesses').insert({
      slug: slug,
      name: form.name,
      category: form.category,
      location: form.location,
      logo_emoji: form.emoji,
      google_review_url: form.googleUrl,
      owner_id: authData.user.id,
      plan: 'trial'
    })

    if (bizError) {
      setError('Business name already taken. Try a different name.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h2>
        <p className="text-gray-500 mb-6">Your ReviewPro account is ready. Your review page is live at:</p>
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <p className="text-blue-600 font-medium">
            localhost:3000/b/{generateSlug(form.name)}
          </p>
        </div>
        <a href="/auth/login" className="block w-full bg-gray-900 text-white rounded-xl py-4 font-semibold text-center">
          Go to Dashboard
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Start your free trial</h1>
          <p className="text-gray-500 text-sm mt-1">30 days free — no credit card required</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Business Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Spice Garden" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400">
              {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">City / Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Ahmedabad" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Logo Emoji</label>
            <div className="flex gap-2 flex-wrap">
              {emojis.map(e => (
                <button key={e} onClick={() => setForm({ ...form, emoji: e })} className={`text-2xl p-2 rounded-lg border-2 transition-all ${form.emoji === e ? 'border-gray-900 bg-gray-100' : 'border-gray-200'}`}>{e}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Google Review URL</label>
            <input name="googleUrl" value={form.googleUrl} onChange={handleChange} placeholder="https://maps.google.com/..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400" />
            <p className="text-gray-400 text-xs mt-1">Find this by searching your business on Google Maps → Share → Copy link</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400" />
          </div>

          <button onClick={handleSubmit} disabled={loading} className={`w-full rounded-xl py-4 font-semibold text-white transition-all ${loading ? 'bg-gray-300' : 'bg-gray-900'}`}>
            {loading ? 'Creating your account...' : 'Start Free Trial →'}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account? <a href="/auth/login" className="text-gray-900 font-medium">Log in</a>
          </p>
        </div>
      </div>
    </div>
  )
}