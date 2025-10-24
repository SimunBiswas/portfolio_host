"use client";
import React from "react";
import RotateBlock from "./RotateBlock";
import { motion } from "framer-motion";

export const IntroBg_1 = () => {
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
    "READY TO CREATE",
  ];

  return (
    <div className="relative w-full h-screen bg-[url('/images/BACKGROUND.png')] bg-cover bg-center font-Hitmarker flex flex-col justify-center items-center overflow-hidden">

      {/* 🔳 Grid overlay (keep as is) */}
      <div className="absolute inset-0 bg-[url('/images/Grid.svg')] bg-repeat opacity-40 z-10 pointer-events-none"></div>

      {/* ⚙️ Rotate animation block */}
      <div className="relative w-full flex justify-center items-center z-20 mt-[3vh] lg:mt-[8vh]">
        <RotateBlock />
      </div>

      {/* 🌀 Animated Headings */}
      <div className="relative w-full flex flex-col justify-center items-center text-center mt-[6vh] md:mt-[15vh] z-30">
        {headings.map((heading, i) => (
          <motion.div
            key={i}
            className="absolute w-full text-[clamp(1.5rem,5vw,5rem)] leading-tight text-[#F9CDB9] font-Hitmarker"
            initial={{ y: "5vh", opacity: 0, scale: 1, filter: "blur(50px)" }}
            animate={{
              y: ["5vh", "0vh", "-10vh"],
              opacity: [0, 1, 1, 0],
              scale: [1, 1, 1, 0.9],
              filter: ["blur(50px)", "blur(0px)", "blur(0px)", "blur(10px)"],
            }}
            transition={{
              duration: 2.2,
              delay: i * 2.0,
              ease: "easeInOut",
              times: [0, 0.3, 0.9, 1],
            }}
          >
            <div className="relative">
              <span className="drop-shadow-[2px_9px_76px_rgba(249,205,185,0.5)]">
                {heading}
              </span>
            </div>

            <div className="absolute inset-0">
              <span className="text-[#EC682D] font-bold drop-shadow-[2px_9px_76px_rgba(234,254,31,0.5)] blur-[32px]">
                {heading}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🧩 Initialising Workspace */}
      <div className="relative mt-[8vh] md:mt-[10vh] text-[clamp(0.9rem,1.5vw,1.5rem)] text-[#FFFFFF]/35 text-center z-20">
        INITIALISING WORKSPACE
      </div>

      {/* ⚡ Progress Bar */}
      <div className="relative mt-[2vh] w-[90%] max-w-full z-20">
        <div className="bg-gray-800/50 w-full overflow-visible">
          {/* solid bar */}
          <motion.div
            className="relative w-[100%] flex justify-center items-center origin-left rounded-full z-20 "
            animate={{ scaleX: [0, 0.5, 1] }}
            transition={{ duration: 7, ease: "linear", times: [0, 0.5, 1] }}
          >
            <div className="w-full h-[18px] bg-[#F87F4A] rounded-full"></div>
          </motion.div>

          {/* blurred glow */}
          <motion.div
            className="relative w-[102%] flex justify-center items-center z-20 origin-left -left-1 -mt-5"
            animate={{ scaleX: [0, 0.5, 1] }}
            transition={{ duration: 7, ease: "linear", times: [0, 0.5, 1] }}
          >
            <div className="w-full h-[18px] bg-[#EC682D] rounded-full blur-[32.5px] -left-4 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>

      {/* 🧠 WORKSPACE Animation */}
      <div className="relative w-full flex flex-col justify-center items-center text-center mt-[5vh] z-30">
        {works.map((work, i) => (
          <motion.div
            key={i}
            className="absolute text-[clamp(0.9rem,1.8vw,1.2rem)] text-[#FFFFFF]/35 font-Hitmarker"
            initial={{ y: "3vh", opacity: 0, filter: "blur(50px)" }}
            animate={{
              y: ["3vh", "0vh", "-5vh"],
              opacity: [0, 1, 1, 0],
              filter: ["blur(50px)", "blur(0px)", "blur(0px)", "blur(10px)"],
            }}
            transition={{
              duration: 2.16,
              ease: "easeInOut",
              delay: i === 0 ? 0.75 : i * 2.0 + 0.5,
              times: [0, 0.3, 0.7, 1],
            }}
          >
            {work}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IntroBg_1;
