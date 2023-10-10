'use client'
import { motion } from "framer-motion";

interface CardSlidderProps {
    index: number;
    children: React.ReactNode
}

const CardSlider = ({ children, index }: CardSlidderProps) => {
  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default CardSlider;