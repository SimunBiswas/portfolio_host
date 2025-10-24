import { motion } from "framer-motion";

interface TopicProps {
  title: string;
  delayTime?: number; // optional delay
}

const Topic = ({ title, delayTime = 0 }: TopicProps) => {
  const words = title.trim().split(" "); // split into words

  return (
    <div className="flex flex-wrap gap-2">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: delayTime + index * 0.15 }}
          style={{ transformOrigin: "bottom" }}
          className="text-white text-xl font-semibold"
          viewport={{ once: true }}

        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default Topic;
