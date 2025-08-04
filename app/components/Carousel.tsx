'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Button from './Button'

const images = [
  { src: '/images/AON.png', title: 'AON', href: '/intro/AON' },
  { src: '/images/OTWD.png', title: 'Over the Walking Dead', href: '/intro/OTWD' },
  { src: '/images/Jedi.png', title: 'Star Wars Jedi Survivor', href: '/intro/Jedi' },
  { src: '/images/Vanguard.png', title: 'Call of Duty Vanguard', href: '/intro/Vanguard' },
]

const Card = ({
  image,
  title,
  href,
  isHovered,
  onEnter,
  onLeave,
}: {
  image: string
  title: string
  href: string
  isHovered: boolean
  onEnter: () => void
  onLeave: () => void
}) => (
  <motion.div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className="orbitron w-full h-full rounded-2xl flex justify-center items-center relative overflow-hidden"
    initial={{ scale: 0.95 }}
    animate={{ scale: isHovered ? 1.05 : 0.95 }}
    transition={{ type: 'spring', stiffness: 200, damping: 24 }}
  >
    <Image
      src={image}
      alt={title}
      fill
      priority
      sizes="(max-width: 768px) 100vw, 700px"
      className="object-cover rounded-2xl z-0"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col justify-end items-start text-white p-10 bg-gradient-to-b from-transparent to-black/60 z-10"
    >
      <div className="w-full flex justify-between items-center">
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="uppercase text-xl tracking-wider font-semibold"
        >
          {title}
        </motion.span>
        <motion.span>
          <Button text="View Project" href={href} />
        </motion.span>
      </div>
    </motion.div>
  </motion.div>
)

export default function Carousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = ((page % images.length) + images.length) % images.length
  const [isHovered, setIsHovered] = useState(false)
  const [clickDisabled, setClickDisabled] = useState(false)

  const paginate = useCallback((newDirection: number) => {
    if (clickDisabled) return
    setClickDisabled(true)
    setPage(([currentPage]) => [currentPage + newDirection, newDirection])
    setTimeout(() => setClickDisabled(false), 500)
  }, [clickDisabled])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1)
      else if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [paginate])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* Arrows */}
      <button onClick={() => paginate(-1)} className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full hover:bg-black/60">
        <ArrowLeft className="text-white w-6 h-6" />
      </button>
      <button onClick={() => paginate(1)} className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-2 rounded-full hover:bg-black/60">
        <ArrowRight className="text-white w-6 h-6" />
      </button>

      {/* Carousel Content */}
      <div className="flex justify-center items-center h-[60%]">
        <div className="relative w-[80%] h-[150px] md:h-[300px] lg:w-[70%] lg:h-[600px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 250, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute w-full h-full"
            >
              <Card
                image={images[imageIndex].src}
                title={images[imageIndex].title}
                href={images[imageIndex].href}
                isHovered={isHovered}
                onEnter={() => setIsHovered(true)}
                onLeave={() => setIsHovered(false)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center z-20 mt-4 lg:mt-11">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] rounded-lg m-1 cursor-pointer ${
              index === imageIndex ? 'bg-[#9c9c9c]' : 'bg-[#9a9898]'
            }`}
            onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        ))}
      </div>

      {/* Side Previews */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none z-10 px-2">
        <motion.div animate={{ x: isHovered ? -60 : 0 }} transition={{ type: 'spring', damping: 20 }}>
          <Image
            src={images[(imageIndex - 1 + images.length) % images.length].src}
            alt="prev"
            loading="lazy"
            className="w-[80px] lg:w-[220px] h-[100px] lg:h-[320px] rounded-xl opacity-60 object-cover object-right"
            width={320}
            height={320}
          />
        </motion.div>
        <motion.div animate={{ x: isHovered ? 60 : 0 }} transition={{ type: 'spring', damping: 20 }}>
          <Image
            src={images[(imageIndex + 1) % images.length].src}
            alt="next"
            loading="lazy"
            className="w-[80px] lg:w-[220px] h-[0px] lg:h-[320px] rounded-xl opacity-60 object-cover object-left"
            width={320}
            height={320}
          />
        </motion.div>
      </div>
    </div>
  )
}
