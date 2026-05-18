'use client'
import { useState } from 'react'

const QUESTIONS = [
  "What did you enjoy most — food, service, or ambience?",
  "Was there any dish or moment that stood out?",
  "Would you come back or bring a friend?"
]

const MOCK_REVIEWS = [
  "Amazing experience at Spice Garden! The food was absolutely delicious and the service was super friendly. Will definitely be coming back with friends!",
  "Loved every bit of my visit to Spice Garden. The ambience was great and the dishes were outstanding. Highly recommend to everyone!",
  "Spice Garden never disappoints! Great food, warm staff, and a lovely atmosphere. One of the best restaurants in Ahmedabad.",
  "Had a wonderful time at Spice Garden. The flavours were incredible and the service was prompt. A must-visit!",
  "Excellent experience from start to finish. The food was fresh, staff was attentive, and the overall vibe was fantastic!"
]

export default function BusinessPage() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [step, setStep] = useState('rating')
  const [answers, setAnswers] = useState(['', '', ''])
  const [currentQ, setCurrentQ] = useState(0)
  const [review, setReview] = useState('')
  const [reviewIndex, setReviewIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleRating = (val) => {
    setRating(val)
    if (val <= 2) {
      setStep('complaint')
    } else {
      setStep('questions')
    }
  }

  const handleAnswer = (val) => {
    const updated = [...answers]
    updated[currentQ] = val
    setAnswers(updated)
  }

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      generateReview()
    }
  }

  const generateReview = () => {
    setLoading(true)
    setStep('loading')
    setTimeout(() => {
      setReview(MOCK_REVIEWS[0])
      setReviewIndex(0)
      setStep('review')
      setLoading(false)
    }, 2000)
  }

  const shuffleReview = () => {
    const next = (reviewIndex + 1) % MOCK_REVIEWS.length
    setReviewIndex(next)
    setReview(MOCK_REVIEWS[next])
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
                <span key={star} onClick={() => handleRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                  style={{ fontSize: '40px', cursor: 'pointer', transition: 'transform 0.1s', transform: (hover || rating) >= star ? 'scale(1.2)' : 'scale(1)' }}>
                  {(hover || rating) >= star ? '⭐' : '☆'}
                </span>
              ))}
            </div>
            <p style={{ color: '#9ca3af', fontSize: '13px' }}>Tap a star to rate</p>
          </>
        )}

        {/* Questions */}
        {step === 'questions' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{ width: '28px', height: '4px', borderRadius: '2px', background: i <= currentQ ? '#111' : '#e5e7eb' }} />
              ))}
            </div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#111', marginBottom: '16px' }}>{QUESTIONS[currentQ]}</p>
            <textarea
              value={answers[currentQ]}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Type your answer here..."
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', minHeight: '90px', resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' }}
            />
            <button
              onClick={handleNext}
              disabled={!answers[currentQ]}
              style={{ width: '100%', padding: '14px', background: answers[currentQ] ? '#111' : '#e5e7eb', color: answers[currentQ] ? 'white' : '#9ca3af', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: answers[currentQ] ? 'pointer' : 'not-allowed' }}>
              {currentQ < QUESTIONS.length - 1 ? 'Next →' : 'Generate My Review ✨'}
            </button>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '10px' }}>Question {currentQ + 1} of {QUESTIONS.length}</p>
          </>
        )}

        {/* Loading */}
        {step === 'loading' && (
          <>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>✨</div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#111', marginBottom: '8px' }}>Writing your review...</p>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Just a moment</p>
          </>
        )}

        {/* Generated Review */}
        {step === 'review' && (
          <>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#111', marginBottom: '16px' }}>Here's your review!</p>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', minHeight: '120px', resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: '12px', lineHeight: '1.6' }}
            />
            <button onClick={shuffleReview}
              style={{ width: '100%', padding: '12px', background: 'transparent', color: '#111', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', marginBottom: '8px' }}>
              🔀 Shuffle Review
            </button>
            <button
              style={{ width: '100%', padding: '14px', background: '#4285F4', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              ⭐ Post to Google
            </button>
          </>
        )}

        {/* Complaint */}
        {step === 'complaint' && (
          <>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>😔</div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#111', marginBottom: '8px' }}>We're sorry to hear that</p>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>Tell us what went wrong — the owner will personally look into it</p>
            <textarea placeholder="What could we have done better?"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', minHeight: '100px', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
            <button style={{ marginTop: '16px', width: '100%', padding: '14px', background: '#111', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              Send Feedback
            </button>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '12px' }}>This feedback goes directly to the owner — not public</p>
          </>
        )}

      </div>
    </main>
  )
}