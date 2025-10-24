"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AutoCarousel from "@/app/components/AutoCarousel";
import { Menu, X } from "lucide-react"; // icons

import Section from "@/app/components/Section";
import { carouselImg } from "../../../data/images";
import { sectio1nData, section2Data, sectionRef } from "../../../data/tabsData";
import SectionCarousel from "@/app/components/SectionCarousel";

export default function Page() {
  // Section labels
  const sectionNames = sectionRef

  // Single ref holding all section elements
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024 ? true : false);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex justify-start items-start bg-black text-white ">
      {/* 🌟 Mobile Navbar Header */}
      {isMobile && <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-gray-900 border-b border-gray-700 flex justify-between items-center px-4 py-3">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>}

      {/* Sticky Navbar */}
      <div  className={`
          fixed lg:sticky top-12 lg:top-0 left-0 z-40
          h-screen lg:h-[80vh] 
          w-[70%] lg:w-[20%]
          bg-gray-900 border-r border-gray-700 p-4 
          flex flex-col gap-3 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
        {sectionNames.map((name, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className="hover:text-pink-400 transition"
          >
            {name}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="relative lg:w-[80vw] h-screen overflow-y-auto overflow-x-hidden ">
        {/* SECTION 1 */}
        <motion.div
           ref={(el) => {
            if (el) sectionRefs.current[0] = el;
          }} 
          className="min-h-screen flex flex-col w-full lg:flex-row items-start justify-center bg-red-950 p-6"
        >
          {/* Text content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-justify space-y-4">
              {sectio1nData.map((data, index) => (
                  <Section
                    key={index}
                    topic={data.topic}
                    subtopic={data.subtopic}
                    content={data.content}
                  />
                ))}
            </div>

          {/* Carousel / Image */}
          <div className="w-full lg:w-[50%]">
            <AutoCarousel images={carouselImg} />
          </div>
        </motion.div>

        {/* SECTION 2 */}
        <motion.div
          ref={(el) => {
            if (el) sectionRefs.current[1] = el;
          }}          
          className="min-h-screen flex flex-wrap flex-col lg:flex-row lg:flex-nowrap items-center justify-center p-6 bg-gray-800 text-gray-200"
        >
         {section2Data.map((data, index) => (
            <Section
              key={index}
              topic={data.topic}
              subtopic={data.subtopic}
              content={data.content}
              noRepeat={false}
              yAxis={0}
              xAxis={100}
            />
          ))}
        </motion.div>

        {/* SECTION 3 */}
        <motion.div
          ref={(el) => {
            if (el) sectionRefs.current[2] = el;
          }}          
          className="min-h-screen w-full flex flex-wrap items-center justify-center p-6 bg-gray-700 text-gray-200"
        >
         {section2Data.map((data, index) => (
            <Section
              key={index}
              topic={data.topic}
              subtopic={data.subtopic}
              content={data.content}
              noRepeat={false}
              yAxis={100}
              xAxis={0}
            />
          ))}
        </motion.div>

        {/* SECTION 4 */}
        <motion.div
          ref={(el) => {
            if (el) sectionRefs.current[3] = el;
          }}          
          className="min-h-screen w-full flex flex-wrap items-center justify-center p-6 bg-gray-700 text-gray-200"
        >
          <SectionCarousel images={carouselImg}/>
        </motion.div>

      </div>
    </div>
  );
}
