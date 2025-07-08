import { motion } from "framer-motion";

const FadingFromEdge: React.FC<{ text: string, animation?: number, delay? : number  }> = ({ text , animation, delay}) => {

  return (
    <motion.div
        initial={{ x: `${animation}%`, opacity: 0 }}
        animate={{ x: '0%', opacity: 1 }}
        transition={{ duration: 0.75, delay: delay }}
        className="text-4xl font-bold text-white text-start uppercase "
    >
        {text}
    </motion.div>
  )
}

export default FadingFromEdge
