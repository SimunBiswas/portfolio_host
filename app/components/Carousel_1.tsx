"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import Button from "./Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [
  { src: "/images/AON.png", title: "AON", href: "/intro/AON" },
  { src: "/images/OTWD.png", title: "Over the Walking Dead", href: "/intro/OTWD" },
  { src: "/images/Jedi.png", title: "Star Wars Jedi Survivor", href: "/intro/Jedi" },
  { src: "/images/Vanguard.png", title: "Call of Duty Vanguard", href: "/intro/Vanguard" },
];

const Carousel_1 = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);

  // ✅ Paginate with click-disable delay
  const paginate = useCallback(
    (direction: number) => {
      if (clickDisabled) return;
      setClickDisabled(true);
      setCenterIndex((prev) => (prev + direction + images.length) % images.length);
      setTimeout(() => setClickDisabled(false), 500);
    },
    [clickDisabled]
  );

  // ✅ Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const getIndex = (offset: number) => {
    return (centerIndex + offset + images.length) % images.length;
  };

  const imageVariants = {
    left: (hovered: boolean) => ({
      x: hovered ? "-145%" : "-140%",
      scale: hovered ? 0.8 : 1,
      zIndex: 20,
      background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))",
    }),
    center: {
      x: "0%",
      scale: 1.7,
      zIndex: 30,
      background: "transparent",
    },
    right: (hovered: boolean) => ({
      x: hovered ? "145%" : "140%",
      scale: hovered ? 0.8 : 1,
      zIndex: 20,
      background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))",
    }),
    hidden: {
      scale: 0,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    },
  };

  const handleClick = (clickedIndex: number) => {
    if (clickedIndex === getIndex(-1)) paginate(-1);
    else if (clickedIndex === getIndex(1)) paginate(1);
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-[#0f0f0f] relative overflow-hidden w-full">
      {/* Carousel Container */}
      <div className="relative w-[120%] h-full flex justify-center items-center cursor-pointer">
        {/* Left Curved Gradient Overlay */}
        <div className="pointer-events-none absolute left-0 top-0 w-[20%] h-full z-50 
                        bg-gradient-to-r from-[#0f0f0f] to-transparent rounded-tr-[200px] rounded-br-[200px]" />

        {/* Right Curved Gradient Overlay */}
        <div className="pointer-events-none absolute right-0 top-0 w-[20%] h-full z-50 
                        bg-gradient-to-l from-[#0f0f0f] to-transparent rounded-tl-[200px] rounded-bl-[200px]" />

        {images.map((img, i) => {
          let variant: keyof typeof imageVariants = "hidden";
          if (i === getIndex(-1)) variant = "left";
          else if (i === centerIndex) variant = "center";
          else if (i === getIndex(1)) variant = "right";

          const isCenter = i === centerIndex;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ width: "30%" }}
              onClick={() => handleClick(i)}
              onMouseEnter={() => isCenter && setIsHovered(true)}
              onMouseLeave={() => isCenter && setIsHovered(false)}
              custom={variant === "left" || variant === "right" ? isHovered : undefined}
              variants={imageVariants}
              animate={variant}
              transition={{ duration: 0.25 }}
              whileHover={isCenter ? { scale: 2 } : undefined}
            >
              {/* Image */}
              <motion.img
                src={img.src}
                alt={`img-${i}`}
                className="rounded-xl shadow-lg cursor-pointer w-full h-full object-cover"
              />

              {/* Center Hover Overlay */}
              {isCenter && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end items-center text-white bg-gradient-to-b from-transparent to-black/60 z-10 border-2 border-transparent shadow-[0_0_20px_#EC682D] rounded-lg"
                  >
                    <motion.div
                      style={{
                        fontSize: "clamp(0.8rem, 2vw, 0.8rem)",
                      }}
                      initial={{ y: 20, opacity: 0, scale: 1 }}
                      animate={{
                        y: isHovered ? 0 : 20,
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-[90%] flex justify-between items-center p-2 rounded-lg "
                    >
                      <span className="uppercase tracking-wider font-semibold">
                        {img.title}
                      </span>
                      <div className="scale-75">
                        <Button text="View Project" href={img.href} />
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-8 top-1/2 -translate-y-1/2 z-[60] bg-black/40 p-2 rounded-full hover:bg-black/60"
        onClick={() => paginate(-1)}
      >
        <ArrowLeft className="text-white w-6 h-6" />
      </button>
      <button
        className="absolute right-8 top-1/2 -translate-y-1/2 z-[60] bg-black/40 p-2 rounded-full hover:bg-black/60"
        onClick={() => paginate(1)}
      >
        <ArrowRight className="text-white w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center z-20 mt-4 lg:mt-11">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] rounded-lg m-1 cursor-pointer ${
              index === centerIndex ? "bg-[#9c9c9c]" : "bg-[#9a9898]"
            }`}
            onClick={() => setCenterIndex(index)}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel_1;
