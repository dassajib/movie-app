import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

const ScrollAnimation = ({
  children,
  animation,
  threshold = 0,        
  className = "",
  triggerOnce = true,   
}) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  })

  const defaultVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <motion.div
      ref={ref}
      variants={animation?.variants || defaultVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation