'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import QRCode from 'qrcode.react'

export default function Dashboard() {
  const [business, setBusiness] = useState(null)
  const [stats, setStats] = useState({ total: 0, avg: 0, today: 0, complaints: 0 })
  const [sessions, setSessions] = useState([])
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const qrRef = useRef(null)

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/auth/login'; return }

      const { data: biz } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user.id)
        .single()

      if (!biz) { window.location.href = '/auth/signup'; return }
      setBusiness(biz)

      const { data: reviewData } = await supabase
        .from('review_sessions')
        .select('*')
        .eq('business_id', biz.id)
        .order('created_at', { ascending: false })

      if (reviewData) {
        setSessions(reviewData)
        const total = reviewData.length
        const avg = total > 0
          ? (reviewData.reduce((sum, r) => sum + r.star_rating, 0) / total).toFixed(1)
          : 0
        const today = reviewData.filter(r =>
          new Date(r.created_at).toDateString() === new Date().toDateString()
        ).length
        setStats(prev => ({ ...prev, total, avg, today }))
      }

      const { data: complaintData } = await supabase
        .from('complaints')
        .select('*')
        .eq('business_id', biz.id)
        .order('created_at', { ascending: false })

      if (complaintData) {
        setComplaints(complaintData)
        setStats(prev => ({
          ...prev,
          complaints: complaintData.filter(c => c.status === 'new').length
        }))
      }

      setLoading(false)
    }
    loadDashboard()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  const updateComplaintStatus = async (id, status) => {
    await supabase.from('complaints').update({ status }).eq('id', id)
    setComplaints(complaints.map(c => c.id === id ? { ...c, status } : c))
  }

  const downloadQR = (size, label) => {
    const canvas = document.getElementById('qr-canvas')
    if (!canvas) return

    // Create a high-res version
    const offscreen = document.createElement('canvas')
    offscreen.width = size
    offscreen.height = size
    const ctx = offscreen.getContext('2d')

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    // Draw QR scaled up
    ctx.drawImage(canvas, 0, 0, size, size)

    // Download
    const link = document.createElement('a')
    link.download = `reviewpro-qr-${business?.slug}-${label}.png`
    link.href = offscreen.toDataURL('image/png', 1.0)
    link.click()
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-400">Loading dashboard...</div>
    </div>
  )

  const qrUrl = `https://review-pro-npc3.vercel.app/b/${business?.slug}`

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{business?.logo_emoji}</span>
          <div>
            <h1 className="font-bold text-gray-900">{business?.name}</h1>
            <p className="text-gray-500 text-xs">{business?.category} · {business?.location}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-gray-400 text-sm hover:text-gray-600">
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          {['overview', 'complaints', 'qr'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Reviews', value: stats.total, icon: '⭐' },
                { label: 'Average Rating', value: stats.avg || '—', icon: '📊' },
                { label: 'Reviews Today', value: stats.today, icon: '📅' },
                { label: 'New Complaints', value: stats.complaints, icon: '✉️' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4">Recent Review Sessions</h2>
              {sessions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📋</div>
                  <p className="text-gray-500 text-sm">
                    No reviews yet. Place your QR code and wait for the first scan!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.slice(0, 10).map(session => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {[1,2,3,4,5].map(s => (
                            <span
                              key={s}
                              style={{
                                color: s <= session.star_rating ? '#F59E0B' : '#D1D5DB',
                                fontSize: '14px'
                              }}
                            >★</span>
                          ))}
                        </div>
                        <span className="text-gray-500 text-xs">
                          {session.review_path === 'google'
                            ? '🌐 Posted to Google'
                            : '✉️ Sent to owner'}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {new Date(session.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMPLAINTS TAB */}
        {activeTab === 'complaints' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Customer Messages</h2>
            {complaints.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✉️</div>
                <p className="text-gray-500 text-sm">
                  No messages yet. Unhappy customers will reach out here instead of going public on Google.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.map(c => (
                  <div key={c.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <span
                            key={s}
                            style={{
                              color: s <= c.star_rating ? '#F59E0B' : '#D1D5DB',
                              fontSize: '14px'
                            }}
                          >★</span>
                        ))}
                      </div>
                      <select
                        value={c.status}
                        onChange={e => updateComplaintStatus(c.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                    <p className="text-gray-700 text-sm">{c.message}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(c.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* QR TAB */}
        {activeTab === 'qr' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-1">Your QR Code</h2>
            <p className="text-gray-500 text-sm mb-6">
              Download and print — place on counter, tables, or bill folders.
            </p>

            {/* QR Code display */}
            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                <QRCode
                  id="qr-canvas"
                  value={qrUrl}
                  size={200}
                  level="H"
                  renderAs="canvas"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#0a0a0a"
                />
              </div>
              <p className="text-gray-800 font-medium text-sm text-center mb-1">
                {business?.name}
              </p>
              <p className="text-gray-400 text-xs text-center break-all max-w-xs">
                {qrUrl}
              </p>
            </div>

            {/* Download buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => downloadQR(400, 'standard')}
                className="bg-gray-900 text-white py-3 rounded-xl text-xs font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                ⬇ Standard<br />
                <span className="text-gray-400 font-normal">400×400px</span>
              </button>
              <button
                onClick={() => downloadQR(800, 'high-res')}
                className="bg-gray-900 text-white py-3 rounded-xl text-xs font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                ⬇ High Res<br />
                <span className="text-gray-400 font-normal">800×800px</span>
              </button>
              <button
                onClick={() => downloadQR(1200, 'print')}
                className="bg-green-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors text-center"
              >
                🖨 Print<br />
                <span className="text-green-300 font-normal">1200×1200px</span>
              </button>
            </div>

            {/* URL copy section */}
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              <p className="text-blue-700 text-xs font-medium mb-2">Your review page URL</p>
              <div className="flex items-center gap-2">
                <p className="text-blue-600 text-xs break-all flex-1">{qrUrl}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(qrUrl)
                    alert('URL copied!')
                  }}
                  className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Placement tips */}
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-green-700 text-sm font-medium mb-2">💡 Best placement spots</p>
              <ul className="space-y-1">
                <li className="text-green-600 text-xs">• Bill folder or receipt tray</li>
                <li className="text-green-600 text-xs">• Counter next to payment terminal</li>
                <li className="text-green-600 text-xs">• Table card at each table</li>
                <li className="text-green-600 text-xs">• Front entrance / exit door</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}