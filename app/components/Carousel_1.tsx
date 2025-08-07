"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import Button from "./Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [
  { src: "/images/AON.png", title: "AON", href: "/intro/AON", grad_from : "#83D9F4", grad_via : "#3C7E9E", grad_to: "#000B13" },
  { src: "/images/OTWD.png", title: "Over the Walking Dead", href: "/intro/OTWD", grad_from : "#E29999", grad_via : "#AF4848", grad_to: "#5D0D0D" },
  { src: "/images/Jedi.png", title: "Star Wars Jedi Survivor", href: "/intro/Jedi", grad_from : "#CA843A", grad_via : "#CA843A", grad_to: "#110602" },
  { src: "/images/Vanguard.png", title: "Call of Duty Vanguard", href: "/intro/Vanguard", grad_from : "#FCCAAB", grad_via : "#5A4A1F", grad_to: "#110B0C" },
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
                className="rounded-xl shadow-lg cursor-pointer w-full h-full object-cover fl"
              />

              {/* Center Hover Overlay */}
              {isCenter && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 -z-10 rounded-lg blur-lg"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${img.grad_from}, ${img.grad_via}, ${img.grad_to})`,
                  }}
                />

                <motion.div
                  style={{
                    fontSize: "clamp(0.8rem, 2vw, 0.8rem)",
                  }}
                  initial={{ y: 20, opacity: 0, scale: 1 }}
                  animate={{
                    y: isHovered ? 0 : 20,
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute w-full h-full top-0 text-white rounded-lg flex justify-between items-end bg-gradient-to-b from-transparent to-black/60"
                >
                  <div className="w-full flex justify-between items-center pb-2">
                    <div className="uppercase tracking-wider font-semibold z-10 ps-9">
                      {img.title}
                    </div>
                    <div className="scale-75 z-10">
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

      
    </div>
  );
};

export default Carousel_1;
