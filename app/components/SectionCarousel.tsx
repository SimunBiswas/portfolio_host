"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  images: string[];
  interval?: number; // in ms
}

const SectionCarousel: React.FC<CarouselProps> = ({ images, interval = 2500 }) => {
  const [current, setCurrent] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative scale-90 lg:scale-100 max-w-3xl mx-auto overflow-hidden object-cover rounded-2xl shadow-lg w-full flex flex-col border-2 border-white/50">
      {/* Image Container */}
      <div className="w-full h-[400px] sm:h-[400px] relative rounded-lg ">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Slide ${current}`}
            className="absolute w-full h-full object-fit m-4 rounded-lg scale-90"
            initial={{ opacity: 1, x: 100, borderRadius : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.3 }}
            
          />
        </AnimatePresence>
      </div>

      {/* Pagination Circles */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-white scale-110" : "bg-gray-500 opacity-70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionCarousel;
