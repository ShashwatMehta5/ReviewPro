'use client'
import { useEffect, useState } from 'react'

export default function BrandAnimation({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="animate-bounce mb-4">
        <span className="text-6xl">⭐</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">ReviewPro</h1>
      <p className="text-gray-400 text-sm">Powered by AI</p>
      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}