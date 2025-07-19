import { motion } from "framer-motion"

const MotionButton = ({ children, className = "", ...props }) => (
    <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`transition-shadow duration-300 ease-in-out ${className}`}
        {...props}
    >
        {children}
    </motion.button>
)

export default MotionButton