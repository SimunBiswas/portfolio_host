"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const images = [
  { src: "/images/AON.png", title: "AON", href: "/intro/AON" },
  { src: "/images/OTWD.png", title: "Over the Walking Dead", href: "/intro/OTWD" },
  { src: "/images/Jedi.png", title: "Star Wars Jedi Survivor", href: "/intro/Jedi" },
  { src: "/images/Vanguard.png", title: "Call of Duty Vanguard", href: "/intro/Vanguard" },
];

const Carousel_1 = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  // Helper to wrap index circularly
  const getIndex = (offset: number) => {
    const index = (centerIndex + offset + images.length) % images.length;
    return index;
  };

  // Dynamic Framer Motion variants
  const imageVariants = {
    left: (hovered: boolean) => ({
      x: hovered ? "-150%" : "-130%",
      scale: hovered ? 0.7 :  0.8,
      zIndex: 20,
    }),
    center: { x: "0%", scale: 1.7, zIndex: 30 },
    right: (hovered: boolean) => ({
        x: hovered ? "150%" : "130%",
        scale: hovered ? 0.7 :  0.8,
        zIndex: 20,
      }),
    // right: (hovered : boolean) => ({ x: hovered ? "150%" : "130%", scale: 0.8, zIndex: 20 }),
    hidden: { scale: 0, opacity: 0, zIndex: 0, pointerEvents: "none" },
  };

  // Navigation
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
    <div className="flex items-center justify-center flex-col h-screen bg-black relative overflow-hidden w-full scale-300">
      {/* Carousel Container */}
      <div className="relative w-[120%] h-[400px] flex justify-center items-center">
        {images.map((img, i) => {
          let variant: keyof typeof imageVariants = "hidden";
          if (i === getIndex(-1)) variant = "left";
          else if (i === centerIndex) variant = "center";
          else if (i === getIndex(1)) variant = "right";

          return (
            <motion.img
              key={i}
              src={img.src}
              alt={`img-${i}`}
              className="absolute rounded-xl shadow-lg cursor-pointer"
              variants={imageVariants}
              animate={variant}
              custom={variant === "left" || variant === "right" ? isCenterHovered : undefined}
              transition={{ duration: 0.25 }}
              style={{ width: "30%" }}
              onClick={() => handleClick(i)}
              onMouseEnter={() => i === centerIndex && setIsCenterHovered(true)}
              onMouseLeave={() => i === centerIndex && setIsCenterHovered(false)}
              whileHover={
                i === centerIndex
                  ? {
                      scale: 2,
                      transition: {
                        duration: 0.25,
                        ease: "easeInOut",
                      },
                    }
                  : undefined
              }
            />
          );
        })}
      </div>

      {/* Title with Link */}
      <div className="mt-8 text-center z-10">
        <Link
          href={images[centerIndex].href}
          className="text-white text-xl font-semibold hover:underline"
        >
          {images[centerIndex].title}
        </Link>
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
