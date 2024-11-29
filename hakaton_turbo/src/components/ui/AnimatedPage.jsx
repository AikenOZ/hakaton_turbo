// AnimatedPage.jsx
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const transition = {
  duration: 0.5,
  ease: 'easeInOut',
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{
        // Убираем position: 'absolute'
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E',
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
