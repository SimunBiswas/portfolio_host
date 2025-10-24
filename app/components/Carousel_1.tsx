"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {images} from "../data/images"

const Carousel_1 = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // ✅ after first mount, disable "firstLoad" so delay only applies once
  useEffect(() => {
    const timer = setTimeout(() => setIsFirstLoad(false), 9000); // matches 9s delay
    return () => clearTimeout(timer);
  }, []);

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
    }),
    center: {
      x: "0%",
      scale: 1.7,
      zIndex: 30,
    },
    right: (hovered: boolean) => ({
      x: hovered ? "145%" : "140%",
      scale: hovered ? 0.8 : 1,
      zIndex: 20,
    }),
    hidden: {
      scale: 1,
      opacity: 1,
      zIndex: 1,
      pointerEvents: "none",
    },
  };

  const handleClick = (clickedIndex: number) => {
    if (clickedIndex === getIndex(-1)) paginate(-1);
    else if (clickedIndex === getIndex(1)) paginate(1);
  };

  return (
    <div className="flex items-center justify-start flex-col h-[300px] md:h-[200px] lg:h-screen bg-black relative overflow-hidden w-full">
      <div className="relative w-[120%] h-full flex justify-center items-center cursor-pointer">
        
        {/* Left Gradient */}
        <div className="pointer-events-none absolute left-0 top-0 w-[20%] h-full z-50 
                        bg-gradient-to-r from-[#0f0f0f] to-transparent rounded-tr-[200px] rounded-br-[200px]" />
        {/* Right Gradient */}
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
              custom={variant === "left" || variant === "right" ? isHovered : undefined}
              variants={imageVariants}
              animate={variant}
              transition={{
                duration: 0.25,
                delay: isFirstLoad ? 9.5 : 0, // 👈 first load vs later animations
              }}
              whileHover={isCenter ? { scale: 2 } : undefined}
              onMouseEnter={() => isCenter && setIsHovered(true)}
              onMouseLeave={() => isCenter && setIsHovered(false)}
            >
              <motion.img
                src={img.src}
                alt={`img-${i}`}
                className="rounded-xl shadow-lg cursor-pointer w-full h-full object-cover"
              />
              
              {isCenter && (
                <AnimatePresence>
                  {isHovered && 
                    <motion.div
                      key="overlay"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: isHovered ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 -z-10 rounded-lg blur-lg"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, ${img.grad_from}, ${img.grad_via}, ${img.grad_to})`,
                      }}
                    />}
                  <motion.div
                    key="caption"
                    style={{ fontSize: "clamp(0.8rem, 2vw, 0.8rem)" }}
                    initial={{ y: 20, opacity: 0, scale: 1 }}
                    animate={{
                      y: isHovered ? 0 : 20,
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute w-full h-full top-0 text-white rounded-lg flex justify-center items-end bg-gradient-to-b from-transparent to-black/60"
                  >
                    <div className="absolute top-[68%] md:top-[78%] lg:top-[85%] w-[200%] lg:w-full flex justify-between items-center scale-50 lg:scale-100 pb-0 lg:pb-2 " >
                      <div className="uppercase tracking-wider font-semibold text-xs scale-75 lg:text-sm z-10 ps-0 lg:ps-2 ">
                        {img.title}
                      </div>
                      <div className="scale-50 z-10 ">
                        <Button text="View Project" href={img.href} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <button
        className="absolute left-[40%] md:left-[45%] lg:left-[46%] top-[90%] -translate-y-1/2 z-[60] bg-black/40 p-2 rounded-full hover:bg-black/60"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button
        className="absolute right-[40%] md:right-[45%] lg:right-[46%] top-[90%] -translate-y-1/2 z-[60] bg-black/40 p-2 rounded-full hover:bg-black/60"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default Carousel_1;
