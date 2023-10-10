'use client'

import { motion } from "framer-motion";

const LeftSlidder = ({children}: {children: React.ReactNode}) => {
    return (
    <motion.div
    initial={{ y: '-100%', filter: 'blur(10px)' }}
    animate={{ y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
        {children}
      </motion.div>
    );
  };
  
  export default LeftSlidder 
  