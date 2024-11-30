import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEVICE_TYPES } from "../../utils/deviceConstants";

const CustomDropdown = ({ selectedType, setSelectedType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    DEVICE_TYPES.indexOf(selectedType) || 0
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectItem = (index) => {
    setSelectedType(DEVICE_TYPES[index]);
    setCurrentIndex(index);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {/* Dropdown Button */}
      <motion.button
        onClick={toggleDropdown}
        className="w-full bg-light-gray text-white py-3 px-4 rounded-lg flex items-center justify-between focus:outline-none hover:bg-gray-700 transition shadow-md"
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.15)",
        }}
        whileTap={{
          scale: 0.98,
        }}
      >
        <span>{selectedType}</span>
        <motion.span
          className="text-xl"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-full left-0 w-full mt-2 bg-dark-gray rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="relative h-56 overflow-y-auto scrollbar-hide">
              <ul
                className="flex flex-col items-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateY(calc(-${currentIndex} * 48px))`,
                  transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {DEVICE_TYPES.map((type, index) => (
                  <motion.li
                    key={type}
                    className={`text-center py-3 text-lg cursor-pointer select-none transition-all ${
                      index === currentIndex
                        ? "text-white font-semibold scale-110"
                        : "text-gray-500"
                    }`}
                    style={{
                      transform: `rotateX(${(index - currentIndex) * 15}deg)`,
                      opacity: index === currentIndex ? 1 : 0.5,
                    }}
                    onClick={() => selectItem(index)}
                    whileHover={{
                      scale: 1.15,
                      color: "#FF4D00",
                      textShadow: "0px 4px 20px rgba(255, 77, 0, 0.8)",
                    }}
                  >
                    {type}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
