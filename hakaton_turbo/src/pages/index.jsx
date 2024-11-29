import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import AnimatedPage from '@/components/ui/AnimatedPage';
import birdIcon from '@/assets/Vector.svg';

const EmptyPage = () => {
  const navigate = useNavigate();
  const navControls = useAnimation();

  useEffect(() => {
    navControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
    });
  }, [navControls]);

  const handleButtonClick = async () => {
    await navControls.start({
      y: -100,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    });
    navigate('/add-rule');
  };

  return (
    <div className="bg-[#1E1E1E] h-screen overflow-hidden">
      <motion.div
        className="px-6 py-6 bg-transparent border-b flex justify-between items-center max-w-[calc(100%-20px)] mx-auto"
        style={{ borderBottomColor: 'rgba(255, 255, 255, 0.5)' }}
        initial={{ y: -50, opacity: 0 }}
        animate={navControls}
      >
        <h1 className="text-[#F5F5F5] text-2xl font-light tracking-wide">
          Rules Engine
        </h1>
        <motion.button
          onClick={handleButtonClick}
          className="bg-[#FF4D00] text-white px-6 py-2.5 rounded-lg flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl font-normal leading-none translate-y-[-2px] mr-3">+</span>
          <span className="font-normal text-[15px]">Add Rule</span>
        </motion.button>
      </motion.div>

      <AnimatedPage>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-82px)] text-[#808080]">
          <img
            src={birdIcon}
            alt="Empty state"
            className="w-14 h-14 mb-5 object-contain opacity-70"
          />
          <p className="mb-2 text-[15px] font-extralight">
            You have not added any rules
          </p>
          <p className="text-sm opacity-80 font-light">
            To create your first rule, click the "Add Rule" button
          </p>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default EmptyPage;
