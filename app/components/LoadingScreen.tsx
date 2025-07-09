'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout

    const startLoading = () => {
      setLoading(true)
      setProgress(0)

      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            setTimeout(() => {
              setLoading(false)
              setProgress(0)
            }, 200)
            return 100
          }
          return prev + 5
        })
      }, 80)
    }

    startLoading()

    return () => clearInterval(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999] flex-col"
        >
          {/* Progress bar wrapper */}
          <div className="w-[50%] h-3 bg-gray-800 rounded overflow-hidden">
            {/* Progress filler */}
            <motion.div
              className="h-full bg-[#EC682D] rounded"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.05 }}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress text */}
          <div className="mt-4 text-white text-sm font-mono">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
