import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">⭐</span>
          <span className="font-bold text-gray-900 text-lg">ReviewPro</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-gray-600 text-sm hover:text-gray-900">Log in</Link>
          <Link href="/auth/signup" className="bg-gray-900 text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors">Start Free Trial</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-20 max-w-3xl mx-auto">
        <div className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          🇮🇳 Built for Indian businesses
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Get 4x more Google reviews<br />
          <span className="text-green-600">in 10 seconds</span>
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          ReviewPro helps restaurants, salons, clinics & hotels in Gujarat collect more genuine Google reviews — automatically. Customer scans QR, taps 3 chips, AI writes the review. Done.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/auth/signup" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
            Start Free — 30 Days Free Trial
          </Link>
          <Link href="/b/spice-garden" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 transition-colors">
            See Live Demo →
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-4">No credit card required · Cancel anytime</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '📱', title: 'Customer scans QR', desc: 'You place a QR standee at your counter. Customer scans it — no app needed, opens instantly in their browser.' },
              { step: '2', icon: '✨', title: 'AI writes the review', desc: 'Customer taps 3 quick chips about their experience. Our AI instantly generates a personalised review in their words.' },
              { step: '3', icon: '⭐', title: 'Posted to Google', desc: 'Customer ticks a box and posts the review to Google in one tap. Entire process takes under 15 seconds.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-green-600 mb-2">STEP {item.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS TYPES */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Built for every local business</h2>
          <p className="text-gray-500 text-center mb-10">ReviewPro works for any customer-facing business in Gujarat</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '🍽️', name: 'Restaurants & Cafes', desc: 'Get more reviews before customers leave' },
              { emoji: '💇', name: 'Salons & Spas', desc: 'Turn happy clients into Google reviews' },
              { emoji: '🏥', name: 'Clinics & Doctors', desc: 'Build trust with more patient reviews' },
              { emoji: '💪', name: 'Gyms & Fitness', desc: 'Attract new members with social proof' },
              { emoji: '🏨', name: 'Hotels & Stays', desc: 'Boost bookings with fresh reviews' },
              { emoji: '🛍️', name: 'Retail Shops', desc: 'Stand out in local Google searches' },
            ].map(biz => (
              <div key={biz.name} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
                <div className="text-3xl mb-3">{biz.emoji}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{biz.name}</h3>
                <p className="text-gray-400 text-xs">{biz.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Simple, honest pricing</h2>
          <p className="text-gray-500 text-center mb-10">No hidden fees. No setup cost. Cancel anytime.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Solo Business',
                price: '₹999',
                period: '/month',
                desc: 'Perfect for single-location businesses',
                features: ['Unlimited QR scans', 'AI review generation', 'Business dashboard', 'Complaint inbox', 'Email support'],
                cta: 'Start Free Trial',
                highlight: false,
              },
              {
                name: 'Chain / Franchise',
                price: '₹2,499',
                period: '/month',
                desc: 'For businesses with multiple locations',
                features: ['Everything in Solo', 'Multi-branch dashboard', 'Compare locations', 'Branch performance analytics', 'Priority support'],
                cta: 'Start Free Trial',
                highlight: true,
              },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-8 ${plan.highlight ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200'}`}>
                <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className={`block text-center py-3 rounded-xl font-semibold transition-colors ${plan.highlight ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-700'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">Both plans include a 30-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Common questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Is this allowed by Google?', a: 'Yes. ReviewPro is fully compliant with Google\'s review policies. Customers post reviews from their own Google accounts, using their own genuine experience. Our AI assists — it does not write fake reviews.' },
              { q: 'Do customers need to download an app?', a: 'No. Everything works in the browser. Customer scans QR → page opens instantly → review posted. Zero app download required.' },
              { q: 'How long does setup take?', a: 'Under 5 minutes. Sign up, fill your business details, download your QR code, place it on your counter. Done.' },
              { q: 'What happens with negative reviews?', a: 'Customers who give 1-3 stars are shown an option to message you privately first. This gives you a chance to resolve the issue before it goes public on Google.' },
              { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no questions asked. Cancel from your dashboard in 30 seconds.' },
            ].map(faq => (
              <div key={faq.q} className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Start getting more reviews today</h2>
        <p className="text-gray-400 mb-8">Join businesses across Gujarat using ReviewPro to grow their online reputation.</p>
        <Link href="/auth/signup" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
          Start Free — 30 Days Free →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 py-8 text-center">
        <p className="text-gray-400 text-sm">© 2026 ReviewPro · Built for Gujarat MSMEs · <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link></p>
      </footer>

    </div>
  )
}