// AnimatedPage.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const animations = (direction) => ({
  initial: {
    opacity: 0,
    x: direction === 'left' ? '-50vw' : '50vw',
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: direction === 'left' ? '50vw' : '-50vw',
  },
});

const transition = {
  duration: 0.25, // Увеличенная продолжительность для более плавного перехода
  ease: 'easeOut', // Кривая Безье для плавной остановки
};

const AnimatedPage = ({ children, direction = 'right' }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <motion.div
      variants={animations(direction)}
      initial={isFirstRender ? false : 'initial'}
      animate="animate"
      exit="exit"
      transition={transition}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
