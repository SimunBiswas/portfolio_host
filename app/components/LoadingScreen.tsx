'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let startTime: number
    let frameId: number

    const startLoading = () => {
      setLoading(true)
      setProgress(0)
      startTime = performance.now()

      const updateProgress = (timestamp: number) => {
        const elapsed = timestamp - startTime
        const duration = 6500 // 6.5 seconds
        const newProgress = Math.min((elapsed / duration) * 100, 100)
        setProgress(newProgress)

        if (elapsed < duration) {
          frameId = requestAnimationFrame(updateProgress)
        } else {
          setTimeout(() => {
            setLoading(false)
            setProgress(0)
          }, 400)
        }
      }

      frameId = requestAnimationFrame(updateProgress)
    }

    startLoading()
    return () => cancelAnimationFrame(frameId)
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-transparent flex items-center justify-center z-[100]"
        >
          {/* Progress bar container */}
          <div className="relative w-[60%] h-10 bg-gray-800/50 rounded-full overflow-visible">
            {/* Base bar */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#F87F4A] rounded-full"
              style={{ width: `${progress}%` }}
            />

            {/* Glow bar */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#F87F4A] F87F4A rounded-full blur-[32px] opacity-80 "
              style={{ width: `${progress}%` }}
            />

            {/* Optional outer soft halo for stronger glow */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#EC682D]/50 rounded-full blur-[64px] opacity-50 "
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress text */}
          <div className="ml-6 text-white text-sm font-mono tracking-wider">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
