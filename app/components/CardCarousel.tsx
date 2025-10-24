"use client"

import { motion } from 'framer-motion';
import Button from './Button';

const Card = ({ image, title, href, isHovered }: { image: string; title: string; href: string; isHovered: boolean; onEnter: () => void; onLeave: () => void }) => {
    console.log(isHovered, 'isHovered in Card');
    return (
      <motion.div
        className="orbitron w-full h-full rounded-2xl flex justify-center items-center relative z-[30] "
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 0.9 }}
        animate={{ scale: isHovered ? 1.1 : 0.9 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex flex-col justify-end items-start text-white p-10 rounded-2xl bg-gradient-to-b from-transparent to-black/40"
        >
          <motion.div className="w-full flex justify-between items-center">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="uppercase text-xl tracking-wider font-semibold z-[40]"
            >
              {title}
            </motion.span>

            <motion.span>
              <Button text="View Project" href={href} />
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

export default Card
