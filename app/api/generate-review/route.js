import { generateReview } from '@/lib/anthropic'

const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const maxRequests = 5

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const timestamps = rateLimitMap.get(ip).filter(t => now - t < windowMs)
  
  if (timestamps.length >= maxRequests) {
    return false
  }

  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)
  return true
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Too many requests. Please wait before trying again.' },
        { status: 429 }
      )
    }

    const { businessName, category, starRating, chipsQ1, chipsQ2 } = await request.json()

    if (!businessName || !category || !starRating || !chipsQ1 || !chipsQ2) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const review = await generateReview({
      businessName,
      category,
      starRating,
      chipsQ1,
      chipsQ2,
    })

    return Response.json({ review })

  } catch (error) {
    console.error('Review generation error:', error)
    return Response.json(
      { error: 'Failed to generate review. Please try again.' },
      { status: 500 }
    )
  }
}