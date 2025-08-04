"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "./Button";

const images = [
  { src: "/images/AON.png", title: "AON", href: "/intro/AON" },
  { src: "/images/OTWD.png", title: "Over the Walking Dead", href: "/intro/OTWD" },
  { src: "/images/Jedi.png", title: "Star Wars Jedi Survivor", href: "/intro/Jedi" },
  { src: "/images/Vanguard.png", title: "Call of Duty Vanguard", href: "/intro/Vanguard" },
];

const Carousel_1 = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
      scale: 0,
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    },
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % images.length);
  };

  const handleBack = () => {
    setCenterIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleClick = (clickedIndex: number) => {
    if (clickedIndex === getIndex(-1)) handleBack();
    else if (clickedIndex === getIndex(1)) handleNext();
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-[#0f0f0f] relative overflow-hidden w-full">
      {/* Carousel Container */}
      <div className="relative w-[120%] h-full flex justify-center items-center">
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
                className="rounded-xl shadow-lg cursor-pointer w-full"
              />

              {/* Center Hover Overlay */}
              {isCenter && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col justify-end items-center text-white bg-gradient-to-b from-transparent to-black/60 z-10"
    >
      {/* This container scales BOTH text + button */}
      <motion.div
        style={{
          fontSize: "clamp(0.8rem, 2vw, 0.8rem)", // Responsive font size
        }}
        initial={{ y: 20, opacity: 0, scale: 1 }}
        animate={{
          y: isHovered ? 0 : 20,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1, // Hover scale
        }}
        transition={{ duration: 0.3 }}
        className="w-[90%] flex justify-between items-center p-2"
      >
        <span className="uppercase tracking-wider font-semibold">
          {img.title}
        </span>
        <div className="scale-75"><Button text="View Project" href={img.href} /></div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}

            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6 z-10">
        <button
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={handleBack}
          
        >
          Back
        </button>
        <button
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel_1;
