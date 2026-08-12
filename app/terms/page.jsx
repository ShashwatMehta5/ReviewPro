export default function Terms() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: August 2026</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. What ReviewPro does</h2>
          <p className="text-gray-600 text-sm leading-relaxed">ReviewPro provides a QR-code-based review collection platform for local businesses. We help businesses collect genuine customer reviews via an AI-assisted flow. We do not generate fake reviews and are fully compliant with Google's review policies.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Free trial</h2>
          <p className="text-gray-600 text-sm leading-relaxed">All new accounts receive a 30-day free trial. No credit card is required to start. At the end of the trial period, a subscription payment is required to continue using the service. If you do not subscribe, your account will be paused but your data will be retained for 30 days.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Billing & payments</h2>
          <p className="text-gray-600 text-sm leading-relaxed">Solo Business plan: Rs.999 per month. Chain/Franchise plan: Rs.2,499 per month. Payments are processed via Razorpay. Subscriptions renew automatically each month until cancelled.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Cancellation & refunds</h2>
          <p className="text-gray-600 text-sm leading-relaxed">You may cancel your subscription at any time from your dashboard. Cancellations take effect at the end of the current billing period. We do not offer refunds for the current billing month. No questions asked on cancellation.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Your data</h2>
          <p className="text-gray-600 text-sm leading-relaxed">You own all customer feedback and review data collected through your ReviewPro account. We do not sell your data to third parties. On account deletion, all your data is permanently removed within 30 days.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Acceptable use</h2>
          <p className="text-gray-600 text-sm leading-relaxed">You agree not to use ReviewPro to collect fake, incentivised, or misleading reviews. Any account found violating Google's review policies will be suspended without refund.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">7. Liability</h2>
          <p className="text-gray-600 text-sm leading-relaxed">ReviewPro is provided as-is. We are not liable for any changes to Google's review policies or any removal of reviews by Google. Our maximum liability is limited to the amount paid in the last 30 days.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">8. Contact</h2>
          <p className="text-gray-600 text-sm leading-relaxed">For any questions: <a href="mailto:hello@reviewpro.in" className="text-blue-600">hello@reviewpro.in</a> | WhatsApp support available to all active clients.</p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-100">
        <a href="/" className="text-gray-400 text-sm hover:text-gray-600">← Back to ReviewPro</a>
      </div>
    </div>
  )
}