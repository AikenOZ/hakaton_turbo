import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

import deviceNotif from '@/assets/Device Notif.svg';
import actionButton from '@/assets/actionbutton.svg';

function AddRule() {
  const navigate = useNavigate();
  const navControls = useAnimation();
  const bottomButtonsControls = useAnimation();

  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const imagesToLoad = 4;

  useEffect(() => {
    navControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut', bounce: 0.3 },
    });
  }, [navControls]);

  const handleBackClick = async () => {
    await navControls.start({
      y: -100,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    });
    navigate('/');
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: '50vw',
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: '-50vw',
    },
  };

  const pageTransition = {
    duration: 0.25,
    ease: 'easeOut',
  };

  const bottomButtonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const leftButtonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    whileHover: {
      scale: 1.05,
      rotate: -10,
      transition: { duration: 0.3 },
    },
    whileTap: {
      scale: 0.95,
      rotate: -5,
      transition: { duration: 0.1 },
    },
  };

  const rightButtonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    whileHover: {
      scale: 1.05,
      rotate: 10,
      transition: { duration: 0.3 },
    },
    whileTap: {
      scale: 0.95,
      rotate: 5,
      transition: { duration: 0.1 },
    },
  };

  const handleImageLoad = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoadedCount === imagesToLoad) {
      bottomButtonsControls.start('visible');
    }
  }, [imagesLoadedCount, imagesToLoad, bottomButtonsControls]);

  return (
    <div className="bg-[#1E1E1E] min-h-screen font-sans">
      <div className="relative">
        <motion.div
          className="px-6 py-6 bg-transparent flex justify-between items-center max-w-[calc(100%-20px)] mx-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={navControls}
        >
          <motion.button
            onClick={handleBackClick}
            className="flex items-center gap-4 text-[#F5F5F5] text-2xl font-light tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[#F5F5F5] text-xl">←</span>
            <span>New Rule</span>
          </motion.button>
          <motion.button
            className="bg-[#FF4D00] text-white px-6 py-2.5 rounded-lg text-[15px] font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Save Rule clicked')}
          >
            Save Rule
          </motion.button>
        </motion.div>
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{ 
            width: 'calc(100% - 75px)',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.5)'
          }}
        />
      </div>

      <motion.div
        variants={pageVariants}
        initial={false}
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="flex gap-32">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded flex items-center justify-center mb-5">
                <img
                  src={deviceNotif}
                  alt="Device Icon"
                  className="w-20 h-20"
                  onLoad={handleImageLoad}
                />
              </div>
              <h3 className="text-[#F5F5F5] text-lg font-semibold mb-2">
                Choose your device
              </h3>
              <p className="text-[#808080] text-sm font-light max-w-[280px] leading-relaxed">
                Select the device to which you will apply the rule and set the
                necessary parameters for it
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded flex items-center justify-center mb-5">
                <img
                  src={actionButton}
                  alt="Action Icon"
                  className="w-20 h-20"
                  onLoad={handleImageLoad}
                />
              </div>
              <h3 className="text-[#F5F5F5] text-lg font-semibold mb-2">
                Complete with the actions
              </h3>
              <p className="text-[#808080] text-sm font-light max-w-[280px] leading-relaxed">
                Add one or multiple actions to your rule to act based on the
                result of your logic block
              </p>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-center w-full h-[80px] px-4"
            style={{
              position: 'fixed',
              bottom: '20px',
            }}
            variants={bottomButtonContainerVariants}
            initial="hidden"
            animate={bottomButtonsControls}
          >
            <div className="flex items-center justify-between w-[120px]">
              <motion.div
                className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
                onClick={() => alert('Device Button clicked')}
                variants={leftButtonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <img
                  src={deviceNotif}
                  alt="Device Icon"
                  className="w-[52px] h-[52px]"
                  onLoad={handleImageLoad}
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
                onClick={() => alert('Action Button clicked')}
                variants={rightButtonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <img
                  src={actionButton}
                  alt="Action Icon"
                  className="w-[52px] h-[52px]"
                  onLoad={handleImageLoad}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default AddRule;