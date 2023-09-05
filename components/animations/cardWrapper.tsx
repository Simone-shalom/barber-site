'use client'

import { motion, AnimatePresence } from "framer-motion";

export const CardWrapper = ({children}: {children: React.ReactNode}) => {


  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const images = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
    <AnimatePresence>
      <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
        >
         <motion.div variants={images}>
            {children}
         </motion.div>
      </motion.div>
    </AnimatePresence>
  </>
  )
}
