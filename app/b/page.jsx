'use client'
import { useState } from 'react'
import { chipSets } from '@/lib/chipSets'

export default function ReviewPage() {
  const business = {
    name: "Spice Garden",
    category: "restaurant",
    emoji: "🍽️",
    location: "Ahmedabad",
    googleUrl: "https://maps.google.com"
  }

  const [step, setStep] = useState('rating')
  const [starRating, setStarRating] = useState(0)
  const [chipsQ1, setChipsQ1] = useState([])
  const [chipsQ2, setChipsQ2] = useState([])
  const [review, setReview] = useState('')
  const [consent, setConsent] = useState(false)
  const [message, setMessage] = useState('')

  const chips = chipSets[business.category]

  const handleStar = (star) => {
    setStarRating(star)
    if (star <= 3) {
      setStep('dual')
    } else {
      setStep('chips')
    }
  }

  const toggleChip = (chip, setter, selected) => {
    if (selected.includes(chip)) {
      setter(selected.filter(c => c !== chip))
    } else {
      setter([...selected, chip])
    }
  }

  const handleGenerate = () => {
    const mockReviews = [
      `Really enjoyed my visit to ${business.name}! The ${chipsQ1[0] || 'food'} was excellent and the ${chipsQ2[0] || 'service'} made it a great experience. Will definitely be coming back soon!`,
      `Great experience at ${business.name}. Loved the ${chipsQ1[0] || 'ambiance'} and the ${chipsQ2[0] || 'value for money'} was spot on. Highly recommend to anyone in the area!`,
      `${business.name} never disappoints! The ${chipsQ1[0] || 'quality'} is always top notch and the ${chipsQ2[0] || 'atmosphere'} is perfect. One of my favourite spots in ${business.location}.`
    ]
    setReview(mockReviews[Math.floor(Math.random() * mockReviews.length)])
    setStep('draft')
  }

  const handlePost = () => {
    if (!consent) return
    navigator.clipboard.writeText(review).catch(() => {})
    window.open(business.googleUrl, '_blank')
    setStep('done')
  }

  const handleMessage = () => {
    if (!message.trim()) return
    alert('Message sent to owner! They will get back to you shortly.')
    setStep('done')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* RATING STEP */}
        {step === 'rating' && (
          <div className="text-center">
            <div className="text-6xl mb-4">{business.emoji}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{business.name}</h1>
            <p className="text-gray-500 text-sm mb-8">{business.category} · {business.location}</p>
            <p className="text-gray-700 font-medium mb-6">How was your experience?</p>
            <div className="flex justify-center gap-3 mb-4">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  onClick={() => handleStar(star)}
                  className="text-5xl transition-transform hover:scale-110"
                >
                  <span style={{ color: star <= starRating ? '#F59E0B' : '#D1D5DB' }}>★</span>
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm">Tap a star to rate</p>
          </div>
        )}

        {/* DUAL OPTION STEP */}
        {step === 'dual' && (
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ color: s <= starRating ? '#F59E0B' : '#D1D5DB', fontSize: '24px' }}>★</span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tell us more</h2>
            <p className="text-gray-500 text-sm mb-8">Choose how you'd like to share</p>

            <button
              onClick={() => setStep('message')}
              className="w-full border-2 border-gray-200 rounded-xl p-4 mb-4 text-left hover:border-gray-400 transition-colors"
            >
              <div className="font-semibold text-gray-900">✉️ Send message to owner</div>
              <div className="text-gray-500 text-sm mt-1">Private — not posted publicly</div>
            </button>

            <button
              onClick={() => setStep('chips')}
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-left hover:border-gray-400 transition-colors"
            >
              <div className="font-semibold text-gray-900">⭐ Share on Google</div>
              <div className="text-gray-500 text-sm mt-1">Post your honest experience</div>
            </button>

            <p className="text-gray-400 text-xs mt-6">Both options are equally available</p>
          </div>
        )}

        {/* MESSAGE OWNER STEP */}
        {step === 'message' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Message the owner</h2>
            <p className="text-gray-500 text-sm mb-6">Tell them what went wrong — they'll make it right.</p>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="What could we have done better?"
              className="w-full border border-gray-200 rounded-xl p-4 h-32 text-gray-900 text-sm resize-none focus:outline-none focus:border-gray-400"
            />
            <button
              onClick={handleMessage}
              className="w-full bg-gray-900 text-white rounded-xl py-4 mt-4 font-semibold"
            >
              Send Message
            </button>
          </div>
        )}

        {/* CHIPS STEP */}
        {step === 'chips' && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">{chips.q1.question}</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {chips.q1.chips.map(chip => (
                <button
                  key={chip}
                  onClick={() => toggleChip(chip, setChipsQ1, chipsQ1)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                    chipsQ1.includes(chip)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-4">{chips.q2.question}</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {chips.q2.chips.map(chip => (
                <button
                  key={chip}
                  onClick={() => toggleChip(chip, setChipsQ2, chipsQ2)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                    chipsQ2.includes(chip)
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={chipsQ1.length === 0 || chipsQ2.length === 0}
              className={`w-full rounded-xl py-4 font-semibold text-white transition-all ${
                chipsQ1.length > 0 && chipsQ2.length > 0
                  ? 'bg-gray-900'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              ✨ Generate My Review
            </button>
            <p className="text-gray-400 text-xs text-center mt-3">Select at least one from each section</p>
          </div>
        )}

        {/* DRAFT STEP */}
        {step === 'draft' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Review Draft</h2>
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-4 h-40 text-gray-900 text-sm resize-none focus:outline-none focus:border-gray-400"
            />
            <button
              onClick={handleGenerate}
              className="w-full border border-gray-200 rounded-xl py-3 mt-3 text-gray-600 text-sm font-medium"
            >
              ↻ Try a different version
            </button>

            <div className="flex items-start gap-3 mt-6 mb-4">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-gray-500 text-xs">
                I confirm this is my own genuine experience and I consent to ReviewPro recording that a review was submitted.
              </label>
            </div>

            <button
              onClick={handlePost}
              disabled={!consent}
              className={`w-full rounded-xl py-4 font-semibold text-white transition-all ${
                consent ? 'bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              G  Post to Google
            </button>
          </div>
        )}

        {/* DONE STEP */}
        {step === 'done' && (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
            <p className="text-gray-500">Your review has been copied. Paste it on the Google page that just opened.</p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-300 text-xs mt-8">Powered by ReviewPro</p>
      </div>
    </div>
  )
}