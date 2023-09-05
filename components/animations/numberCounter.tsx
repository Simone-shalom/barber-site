'use client'
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface NumberCounterProps {
    value: number
}

const NumberCounter = ({ value }: NumberCounterProps) => {
  const controls = useAnimation();

  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const startAnimation = async () => {
      await controls.start({
        scale: [1, 1.2, 1], // You can customize the animation, e.g., scale up and down
        transition: { duration: 1, times: [0, 0.5, 1] }, // Adjust the duration and animation curve
      });
    };

    startAnimation();
  }, [controls]);

  
  if(!mounted){
    return null;
  }


  return (
    <motion.div className="text-4xl font-bold" initial={{ scale: 1 }} animate={controls}>
      {value.toFixed(0)}
    </motion.div>
  );
};

export default NumberCounter;

