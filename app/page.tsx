import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">⭐</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">ReviewPro</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how" className="text-gray-500 text-sm hover:text-gray-900 transition-colors">How it works</Link>
            <Link href="#industries" className="text-gray-500 text-sm hover:text-gray-900 transition-colors">Industries</Link>
            <Link href="#pricing" className="text-gray-500 text-sm hover:text-gray-900 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Log in</Link>
            <Link href="/auth/signup" className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors font-medium">
              Start Free →
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Now live across Ahmedabad & Vadodara
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            More Google reviews.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              In 10 seconds.
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            ReviewPro helps restaurants, salons, clinics & hotels collect genuine Google reviews automatically — using AI. Customer scans QR, taps 3 chips, done.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/auth/signup" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-700 transition-all hover:shadow-lg text-lg">
              Start Free Trial — 30 Days
            </Link>
            <Link href="/b/spice-garden" className="bg-gray-50 border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-gray-300 transition-all text-lg">
              See Live Demo →
            </Link>
          </div>
          <p className="text-gray-400 text-sm">No credit card · No setup fee · Cancel anytime</p>
        </div>

        {/* Stats row */}
        <div className="max-w-3xl mx-auto mt-16 grid grid-cols-3 gap-8">
          {[
            { number: '4x', label: 'More reviews on average' },
            { number: '15s', label: 'End to end review time' },
            { number: '88%', label: 'Customer completion rate' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-500 text-lg">Three steps. Under 15 seconds. No app needed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '📱',
                title: 'Customer scans QR',
                desc: 'You place a branded QR standee at your counter. Customer scans — page opens instantly in their phone browser. No app download, no friction.',
                color: 'bg-blue-50 border-blue-100',
                num: 'text-blue-200'
              },
              {
                step: '02',
                icon: '✨',
                title: 'AI writes the review',
                desc: 'Customer taps 2-3 chips describing their experience. Our AI generates a personalised, natural-sounding review in their own words instantly.',
                color: 'bg-purple-50 border-purple-100',
                num: 'text-purple-200'
              },
              {
                step: '03',
                icon: '⭐',
                title: 'Posted to Google',
                desc: 'Customer confirms and posts to Google in one tap. The whole process takes under 15 seconds — while they\'re still in your business.',
                color: 'bg-green-50 border-green-100',
                num: 'text-green-200'
              },
            ].map(item => (
              <div key={item.step} className={`relative border rounded-3xl p-8 ${item.color}`}>
                <div className={`text-8xl font-bold absolute top-4 right-6 ${item.num}`}>{item.step}</div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for every local business</h2>
            <p className="text-gray-500 text-lg">ReviewPro adapts to your industry automatically</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { emoji: '🍽️', name: 'Restaurants & Cafes', desc: 'Capture reviews before customers leave the table', href: '/restaurant', color: 'hover:border-orange-200 hover:bg-orange-50' },
              { emoji: '💇', name: 'Salons & Spas', desc: 'Turn happy clients into 5-star Google reviews', href: '/salon', color: 'hover:border-pink-200 hover:bg-pink-50' },
              { emoji: '🏥', name: 'Clinics & Doctors', desc: 'Build patient trust with more verified reviews', href: '/clinic', color: 'hover:border-blue-200 hover:bg-blue-50' },
              { emoji: '💪', name: 'Gyms & Fitness', desc: 'Attract new members with social proof', href: '/gym', color: 'hover:border-red-200 hover:bg-red-50' },
              { emoji: '🏨', name: 'Hotels & Stays', desc: 'Boost bookings with fresh, genuine reviews', href: '/hotel', color: 'hover:border-yellow-200 hover:bg-yellow-50' },
              { emoji: '🛍️', name: 'Retail Shops', desc: 'Stand out in local Google searches', href: '/retail', color: 'hover:border-green-200 hover:bg-green-50' },
            ].map(biz => (
              <Link href={biz.href} key={biz.name} className={`border border-gray-100 rounded-2xl p-6 transition-all cursor-pointer ${biz.color}`}>
                <div className="text-4xl mb-4">{biz.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{biz.name}</h3>
                <p className="text-gray-400 text-sm">{biz.desc}</p>
                <p className="text-gray-900 text-sm font-medium mt-3">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE BADGE */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-6 py-4 mb-6 shadow-sm">
            <span className="text-2xl">✅</span>
            <span className="font-semibold text-gray-900">100% Google Policy Compliant</span>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed">
            Every review posted through ReviewPro is genuine — written from the customer's own experience, posted from their own Google account. No fake reviews. No policy violations. Ever.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h2>
            <p className="text-gray-500 text-lg">No hidden fees. No setup cost. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Solo Business',
                price: '₹999',
                period: '/month',
                desc: 'Perfect for single-location businesses',
                features: [
                  'Unlimited QR scans',
                  'AI review generation',
                  'Business dashboard',
                  'Complaint inbox',
                  'QR code download',
                  'Email support',
                ],
                highlight: false,
                cta: 'Start Free Trial',
              },
              {
                name: 'Chain / Franchise',
                price: '₹2,499',
                period: '/month',
                desc: 'For businesses with multiple locations',
                features: [
                  'Everything in Solo',
                  'Multi-branch dashboard',
                  'Compare branch ratings',
                  'Branch performance analytics',
                  'Branded QR per location',
                  'Priority support',
                ],
                highlight: true,
                cta: 'Start Free Trial',
              },
            ].map(plan => (
              <div key={plan.name} className={`rounded-3xl p-8 ${plan.highlight ? 'bg-gray-900 text-white' : 'bg-gray-50 border border-gray-100'}`}>
                <div className="mb-6">
                  <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-sm ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.desc}</p>
                </div>
                <div className="flex items-end gap-1 mb-8">
                  <span className={`text-5xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm mb-2 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`text-sm flex items-center gap-3 ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className={`block text-center py-4 rounded-2xl font-semibold transition-all ${plan.highlight ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-700'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">30-day free trial on all plans · No credit card required</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Common questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Is this allowed by Google?', a: 'Yes. ReviewPro is fully compliant with Google\'s review policies. Customers post reviews from their own Google accounts using their genuine experience. Our AI assists the writing — it does not generate fake reviews.' },
              { q: 'Do customers need to download an app?', a: 'No. Everything works in the browser. Customer scans QR → page opens instantly → review posted. Zero friction.' },
              { q: 'How long does setup take?', a: 'Under 5 minutes. Sign up, fill your business details, download your QR code, place it on your counter. Done.' },
              { q: 'What happens with negative reviews?', a: 'Customers who give 1-3 stars are shown an option to message you privately first. This gives you a chance to resolve the issue before it goes public on Google.' },
              { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no lock-in, no questions asked. Cancel from your dashboard in 30 seconds.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to get more reviews?</h2>
          <p className="text-gray-500 text-lg mb-10">Join businesses across Gujarat growing their online reputation with ReviewPro.</p>
          <Link href="/auth/signup" className="inline-block bg-gray-900 text-white px-10 py-5 rounded-2xl font-semibold hover:bg-gray-700 transition-all hover:shadow-xl text-lg">
            Start Free — 30 Days →
          </Link>
          <p className="text-gray-400 text-sm mt-4">No credit card required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">⭐</span>
            </div>
            <span className="font-bold text-gray-900">ReviewPro</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
            <Link href="/auth/signup" className="hover:text-gray-600 transition-colors">Sign Up</Link>
          </div>
          <p className="text-gray-400 text-sm">© 2026 ReviewPro · Built for Gujarat MSMEs</p>
        </div>
      </footer>

    </div>
  )
}