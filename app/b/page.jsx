'use client'
import { useState } from 'react'

export default function BusinessPage() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [step, setStep] = useState('rating')

  const handleRating = (val) => {
    setRating(val)
    if (val <= 2) {
      setStep('complaint')
    } else {
      setStep('review')
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '420px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>

        {/* Business Info */}
        <div style={{ width: '72px', height: '72px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px' }}>🍽️</div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111', margin: '0 0 4px' }}>Spice Garden</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 28px' }}>Restaurant · Ahmedabad</p>

        {/* Star Rating */}
        {step === 'rating' && (
          <>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#111', marginBottom: '16px' }}>How was your experience?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{ fontSize: '40px', cursor: 'pointer', transition: 'transform 0.1s', transform: (hover || rating) >= star ? 'scale(1.2)' : 'scale(1)' }}
                >
                  {(hover || rating) >= star ? '⭐' : '☆'}
                </span>
              ))}
            </div>
            <p style={{ color: '#9ca3af', fontSize: '13px' }}>Tap a star to rate</p>
          </>
        )}

        {/* Complaint Form */}
        {step === 'complaint' && (
          <>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>😔</div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#111', marginBottom: '8px' }}>We're sorry to hear that</p>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>Tell us what went wrong — the owner will personally look into it</p>
            <textarea
              placeholder="What could we have done better?"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', minHeight: '100px', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
            />
            <button style={{ marginTop: '16px', width: '100%', padding: '14px', background: '#111', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Send Feedback
            </button>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '12px' }}>This feedback goes directly to the owner — not public</p>
          </>
        )}

        {/* Review Flow */}
        {step === 'review' && (
          <>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#111', marginBottom: '8px' }}>Glad you loved it!</p>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>Would you mind sharing your experience on Google?</p>
            <button style={{ width: '100%', padding: '14px', background: '#4285F4', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              ⭐ Write a Google Review
            </button>
            <button
              onClick={() => setStep('rating')}
              style={{ marginTop: '10px', width: '100%', padding: '12px', background: 'transparent', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}
            >
              ← Change my rating
            </button>
          </>
        )}

      </div>
    </main>
  )
}