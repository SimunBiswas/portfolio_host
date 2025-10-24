"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RotateBlock() {
  const [step, setStep] = useState(0); // 0 = first, 1 = second, 2 = masked

  useEffect(() => {
    const animateSequence = async () => {
      // 🌀 Step 1: First GIF
      setStep(0);
      await new Promise((r) => setTimeout(r, 2166));

      // // 🌀 Step 2: Second GIF
      setStep(1);
      await new Promise((r) => setTimeout(r, 2166));

      // 🌀 Step 3: Masked Block
      setStep(2);
      await new Promise((r) => setTimeout(r, 2166));
    };
    animateSequence();
  }, []);

  return (
    <div className="relative w-full h-[20em] lg:h-[22em] flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        key={0}
        className={`absolute w-80 h-80 rounded-full flex items-center justify-center bg-cover bg-center transition-opacity duration-500 ${
          0 === step ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url('/gif/Jedi_Survivor.gif')` }}
        animate={0 === step ? { rotateY: [-90, 0, 90] } : {}}
        transition={{
            duration: 2.16,
            ease: ["easeIn", "linear", "easeOut"],
            // ease: "linear",
            times: [0, 0.5, 1],
          }}
      >
        {0 === 0 && step === 0 && (
          <Image src="/images/Vector_1.png" alt="EA" width={100} height={100} />
        )}
      </motion.div>

      {/* 🎭 Masked GIF + Overlay (Step 2) */}
      <motion.div
        key={1}
        className={`relative w-[20em] lg:w-[600px] h-[200px] transition-opacity duration-500 -translate-y-4  ${
            step === 1 ? "opacity-100" : "opacity-0"
        }`}
        // animate={step === 1 ? { rotateY: [-90, 0, 90], y : [100, 100, 100] } : {}}
        animate={step === 1 ? { rotateY: [-90, 0, 90] } : {}}
        transition={{
            duration: 2.16,
            ease: ["easeIn", "linear", "easeOut"],
            times: [0, 0.6, 1],
          }}
        >

        {/* 🌀 Masked GIF */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: "url('/gif/Vanguard.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: "url('/images/Mask_group.png')",
            maskImage: "url('/images/Mask_group.png')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            scale: "1.1",
          }}
        ></div>

        {/* 🧱 Overlay ACTIVISION image */}
        <div className="absolute inset-0 z-20 flex justify-center items-center">
          <Image
            src="/images/Mask_group1.png"
            alt="Overlay"
            className="w-full h-full object-contain"
            width={600}
            height={200}
          />
        </div>
      </motion.div>

      
      <motion.div
        key={2}
        className={`absolute w-64 h-64 rounded-full flex items-center justify-center bg-cover bg-center transition-opacity duration-500 ${
          2 === step ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url('/gif/AON_Intro.gif')` }}
        animate={2 === step ? { rotateY: [-90, 0, 90] } : {}}
        transition={{
            duration: 2.16,
            ease: ["easeIn", "linear", "easeOut"],
            times: [0, 0.6, 1],
          }}
      >
        <Image className="absolute z-10 translate-y-24 translate-x-24 scale-100" src="/images/Vector.png" alt="AG" width={400} height={300} />
      </motion.div>

      <motion.div
      className={` ${
        2 === step ? "opacity-100" : "opacity-0"
        }`}
        // initial={{ opacity: 0, x: -180 , y: -235}}
        animate={2 === step ? { 
          // opacity: [0, 1, 1, 0, 0],
          //  x: [-180, -150, -130, -130, -130],
          //  y: [-255, -235, -205, -205, -205]
          opacity: [0, 1, 1, 1, 0],
           x: [-160, -145, -130, -130, -130],
           y: [-255, -235, -205, -205, -205]
          } 
          :
           {} }
        // exit={2 === step ? { opacity: 0, x: -180, y: -215,  transition: { duration: 1 } } : { opacity: 0, x: -180, y: -215 }}
        transition={{
          delay: 0.3,
          duration: 2.16,
         ease: ["easeIn", "linear", "linear", "linear", "easeOut"],
        times: [0, 0.15, 0.3, 0.7, 1],
        }}
        >
          <Image src="/images/DIVER.png" alt="Diver" width={75} height={75} />
        </motion.div>

    </div>
  );
}
