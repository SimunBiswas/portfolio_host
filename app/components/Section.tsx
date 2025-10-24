import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  topic?: string;
  subtopic?: string;
  content?: string;
  delayTime?: number;
  noRepeat? : boolean;
  yAxis? : number,
  xAxis? : number,

}

const Section = ({ topic, subtopic, content, yAxis, xAxis, delayTime = 0 }: SectionProps) => {
  const words = topic?.trim().split(" ") || [];
  const subtopicWords = subtopic?.trim().split(" ") || [];

  return (
    <div className="space-y-3 w-full flex flex-col flex-wrap p-4">
    {/* Topic */}
    <div className="flex flex-wrap gap-2">
    {words.map((word, index) => (
        <motion.span
        key={`topic-${index}`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, delay: delayTime + index * 0.15 }}
        style={{ transformOrigin: "bottom" }}
        viewport={{ once: false }} // repeat every time
        className="text-white text-xl font-bold"
        >
        {word}
        </motion.span>
    ))}
    </div>

    {/* Subtopic */}
    <div className="flex flex-wrap gap-2">
    {subtopicWords.map((word, index) => (
        <motion.span
        key={`subtopic-${index}`}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
            duration: 0.3,
            delay: delayTime + words.length * 0.15 + index * 0.15,
        }}
        style={{ transformOrigin: "bottom" }}
        viewport={{ once: false }} // repeat every time
        className="text-gray-300 text-lg font-semibold tracking-wide"
        >
        {word}
        </motion.span>
    ))}
    </div>

      {/* Content */}
      <div>
        {content && (
        <motion.p
          className="w-full text-sm text-red-300 leading-relaxed"
          initial={{ x: xAxis, y: yAxis, opacity: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{  once : true }}
        >
          {content}
        </motion.p>
      )}
      </div>
    </div>
  );
};

export default Section;
