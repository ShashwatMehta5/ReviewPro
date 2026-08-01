import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function generateReview({
  businessName,
  category,
  starRating,
  chipsQ1,
  chipsQ2,
}) {
  const systemPrompt = `You are a review-writing assistant for local Indian businesses. 
Write a natural, genuine, first-person review draft between 40 and 80 words based on 
the customer's selections. The customer will read this, edit it if they want, and post 
it from their own Google account. Write as if the customer is speaking. 
Avoid corporate language, overused phrases like "nestled" or "truly exceptional", 
and obvious AI-sounding sentences. Keep it warm and conversational.

TONE GUIDE based on star rating:
5 stars - warm and enthusiastic
4 stars - positive with slight nuance  
3 stars - balanced and honest
2 stars - constructive and measured
1 star - direct and factual, never angry

STRICT RULE: Response must be between 40 and 80 words. Count carefully.`

  const userMessage = `Business name: ${businessName}
Category: ${category}
Star rating: ${starRating} out of 5
Customer highlighted: ${chipsQ1.join(', ')}
Customer also noted: ${chipsQ2.join(', ')}

Write the review now.`

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 200,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  let review = response.content[0].text.trim()

  // Word count check - trim if too long
  const words = review.split(/\s+/)
  if (words.length > 80) {
    review = words.slice(0, 80).join(' ')
  }

  return review
}