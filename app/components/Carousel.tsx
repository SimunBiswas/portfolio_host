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

export default function Carousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = ((page % images.length) + images.length) % images.length

  const Card = ({ image, title, href }: { image: string; title: string; href: string }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="orbitron w-full h-full rounded-2xl flex justify-center items-center relative z-[30]"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 0.9 }}
        animate={{ scale: isHovered ? 1.1 : 0.9 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex flex-col justify-end items-start text-white p-10 rounded-2xl bg-gradient-to-b from-transparent to-black/40"
        >
          <motion.div className="w-full flex justify-between items-center">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="uppercase text-xl tracking-wider font-semibold z-[40]"
            >
              {title}
            </motion.span>

            <motion.span>
              <Button text="View Project" href={href} />
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection])
  }, [])

  const handleDotClick = (index: number) => {
    const newDirection = index > imageIndex ? 1 : -1
    setPage([index, newDirection])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') paginate(1)
      else if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [paginate])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 1,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const dotsVariants = {
    initial: { y: 0, scale: 0.8 },
    animate: {
      y: -10,
      scale: 1.2,
      transition: { type: 'spring' as const },
    },
  }

  return (
    <div className="relative w-full py-10 px-2 overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-[50] bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        <ArrowLeft className="text-white w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-[50] bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        <ArrowRight className="text-white w-6 h-6" />
      </button>

      {/* Main Slide */}
      <div className="flex justify-center items-center h-[60%]">
        <div className="relative w-[80%] h-[150px] md:h-[300px] lg:h-[700px] z-[30]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 150, damping: 30 },
                opacity: { duration: 0.2, ease: "easeInOut" },
              }}
              className="absolute w-full h-full"
            >
              <Card
                image={images[imageIndex].src}
                title={images[imageIndex].title}
                href={images[imageIndex].href}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center z-[20] mt-4 lg:mt-11">
        {images.map((_, index) => {
          const isActive = imageIndex === index
          return (
            <motion.div
              key={index}
              className={`w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] rounded-lg m-1 cursor-pointer ${
                isActive ? 'bg-[#9c9c9c]' : 'bg-[#9a9898]'
              }`}
              onClick={() => handleDotClick(index)}
              variants={dotsVariants}
              initial="initial"
              animate={isActive ? 'animate' : 'initial'}
            />
          )
        })}
      </div>

      {/* Side Previews */}
      <div className="absolute top-1/2 -translate-y-2/3 lg:-translate-y-1/2 w-full flex justify-between pointer-events-none z-[10]">
        <Image
          src={images[(imageIndex - 1 + images.length) % images.length].src}
          alt="Previous image preview"
          className="w-[100px] h-[100px] lg:w-[200px] lg:h-[400px] object-cover object-right rounded-xl opacity-40"
          width={1000}
          height={600}
        />
        <Image
          src={images[(imageIndex + 1) % images.length].src}
          alt="Next image preview"
          className="w-[100px] h-[100px] lg:w-[200px] lg:h-[400px] object-cover object-left rounded-xl opacity-40"
          width={1000}
          height={600}
        />
      </div>
    </div>
  )
}
