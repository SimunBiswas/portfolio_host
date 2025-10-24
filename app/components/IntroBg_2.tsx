"use client";
import React from "react";
import RotateBlock from "./RotateBlock";
import { motion } from "framer-motion";

export const IntroBg_2 = () => {
  const headings = [
    "AVINASH MASIH",
    "DESTRUCTION ARTIST",
    "GAME DEVELOPER",
    "TECHNICAL ARTIST",
  ];

  const works = [
    "LOADING ASSETS",
    "PREPARING ENVIRONMENT",
    "SETTING UP WORKSPACE",
    "READY TO CREATE"
  ]

  return (
    <div className="relative w-full h-screen bg-[url('/images/BACKGROUND.png')] bg-cover bg-center font-Hitmarker items-center flex flex-col ">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/images/Grid.svg')] bg-repeat opacity-40 z-10 w-full h-screen bg-center pointer-events-none"></div>

        {/* Rotate animation block */}
      <div className="relative w-full h-auto z-100 mt-28">
        <RotateBlock />
      </div>

      <div className="relative w-full h-auto items-center flex justify-center z-10 mt-32">
         {/* Animated headings (1 by 1) */}
        {headings.map((heading, i) => (
            <motion.div
            key={i}
            className="absolute font-Hitmarker capitalize text-3xl lg:text-7xl text-[#F9CDB9] text-center z-20"
            initial={{ y: 0, opacity: 0, scale: 1, filter: "blur(50px)" }}
            animate={{
                y: [20, 0, -50],
                opacity: [0, 1, 1, 0], // visible in the middle
                scale: [1, 1, 1, 0.7],
                filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)"],
            }}
            transition={{
                duration: 2.35,
                delay: i * 2.0, // 🔥 delay each heading by 2s (tweak as needed)
                ease: "easeInOut",
                times: [0, 0.3, 0.9, 1],
            }}
            >
            {/* Text layers */}
            <div className="relative">
                <span className="drop-shadow-[2px_9px_76px_rgba(249,205,185,0.5)]">
                {heading}
                </span>
            </div>

            <div className="relative -top-10 lg:-top-16">
                <span className="text-[#EC682D] font-bold drop-shadow-[2px_9px_76px_rgba(234,254,31,0.5)] blur-[32px]">
                {heading}
                </span>
            </div>
            </motion.div>
        ))}
      </div>

      <div className="relative w-full h-auto text-2xl text-[#FFFFFF]/35 items-center flex justify-center mt-20">
        INITIALISING WORKSPACE
      </div>

      <div className="relative w-[90%] flex flex-col justify-center items-center z-10 overflow-visible mt-5 ">
        <div className="bg-gray-800/50  w-full overflow-visible">
          {/* solid bar */}
        <motion.div
          className="relative w-[100%] flex justify-center items-center origin-left rounded-full z-20"
          animate={{ scaleX: [0, 0.5, 1] }}
          transition={{
            duration: 6.5,
            ease: "linear",
            times: [0, 0.5, 1],
          }}
        >
          <div className="w-full h-[18px] bg-[#F87F4A] rounded-full"></div>
        </motion.div>

        {/* blurred glow */}
        <motion.div
          className="relative w-[102%] flex justify-center items-center z-20 origin-left -mt-5 -left-1"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 6.5,
            ease: "linear",
            times: [0, 0.5, 1],
          }}
        >
          <div className="w-full h-[18px] bg-[#EC682D] rounded-full blur-[20px] -left-4 pointer-events-none"></div>
        </motion.div>
        </div>
      </div>
      
      <div className="relative w-full h-auto items-center flex justify-center z-100 mt-14">
         {/* Animated headings (1 by 1) */}
        {works.map((work, i) => (
            <motion.div
            key={i}
            className="absolute font-Hitmarker capitalize text-lg text-[#FFFFFF]/35 text-center z-20"
            initial={{ y: 0, opacity: 0, scale: 1, filter: "blur(50px)" }}
            animate={{
                y: [30, 0, -60],
                opacity: [0, 1, 1, 0], // visible in the middle
                scale: [1, 1, 1],
                filter: ["blur(50px)", "blur(0px)", "blur(0px)", "blur(10px)"],
            }}
            transition={{
                duration: 2.35,
                // delay: i * 2.0, // 🔥 delay each heading by 2s (tweak as needed)
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1],
                delay: i === 0 ? 0.75 : i * 2.0 + 0.5, // Start first word a bit earlier

            }}
            >
            {/* Text layers */}
            <div className="relative top-[70%]">
                <span >
                {work}
                </span>
            </div>

            {/* <div className="relative -top-16">
                <span className="text-[#EC682D] font-bold drop-shadow-[2px_9px_76px_rgba(234,254,31,0.5)] blur-[32px]">
                {work}
                </span>
            </div> */}
            </motion.div>
        ))}
      </div>

      
    </div>
  );
};

export default IntroBg_2;
