'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollSlidderProps {
    children: React.ReactNode
}

const ScrollSlider = ({ children}: ScrollSlidderProps) => {

    const ref= useRef(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ['0 1', '1.33 1'],
    })
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])


  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      className="mb-3 sm:mb-8 last:mb-0"
    >
      {children}
    </motion.div>
  );
};

export default ScrollSlider;