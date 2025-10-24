"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollView from "./ScrollView";
import { images } from "../../../data/images";
import Topic from "@/app/components/Topic";

const VerticalTabs = () => {
  const [active, setActive] = useState("Profile");
  const tabs = ["Profile", "Settings", "Billing", "Security"];

  return (
    <div className="w-full text-white overflow-x-hidden">
      {/* Title (sticky) */}
      <div className="sticky top-0 left-0 z-50">
        <div className="flex justify-center items-start w-[100%] p-6 bg-black/30 border-b border-gray-300 text-3xl font-light tracking-wide ">
          <Topic title={"AON - ABYSS OF NEPTUNE"}/>
        </div>
        {/* Tabs (sticky under title) */}
        <div className="sticky top-[40px] bg-black z-40">
          <div className="flex justify-center items-center p-2 border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative px-4 py-2 text-left transition-colors ${
                  active === tab
                    ? "text-pink-500 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
                {active === tab && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-pink-500/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content (scrollable only inside) */}
        <div className="h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden  m-6 bg-black w-auto ">
          {active === "Profile" && <ScrollView />}
          {active === "Settings" && <p>⚙️ Settings content here</p>}
          {active === "Billing" && <p>💳 Billing content here</p>}
          {active === "Security" && <p>🔒 Security content here</p>}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const ref = useRef(null);

  // Track scroll progress (for your pre-animations)
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -900]);

  return (
    <div className="flex justify-center items-center text-white font-orbitron bg-black">
      <div
        ref={ref}
        className="w-screen flex flex-col justify-center items-center bg-black"
      >
        {/* Top progress bar */}
        <motion.div
          className="fixed top-0 left-0 h-[10px] bg-[#2c2b2b]"
          style={{
            originX: 0,
          }}
        />

        {/* Sticky Image (pinned on top) */}
        <motion.div
          className="w-[90%] h-[100%] sticky -mt-8 top-10 z-40 bg-black"
          style={{ y, scale }}
        >
          <motion.img
            className="w-full h-full object-contain bg-black"
            src={images[0].src}
            alt="AON"
            width={800}
            height={800}
            initial={{ y: 0, scale: 0.8, opacity: 1 }}
          />
        </motion.div>

        {/* Sticky Section with VerticalTabs */}
        <div className="absolute top-[20%] lg:top-[40%] w-full h-[200vh]">
          <div className="sticky top-12 lg:top-0 h-screen flex justify-center items-start z-50">
            <motion.div
              className="w-full max-w-full h-full  text-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <VerticalTabs />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
