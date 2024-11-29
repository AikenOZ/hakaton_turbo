import { motion, AnimatePresence } from 'framer-motion';
import triggerIcon from '@/assets/Trigger Alert.svg';
import editIcon from '@/assets/Edit.svg';
import deleteIcon from '@/assets/Trash Delete.svg';

const BurgerMenu = ({ isOpen, onClose }) => {
  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-52 bg-[#2B2B2B]/90 rounded-lg shadow-lg text-white z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          <ul className="flex flex-col py-2">
            <li
              className="flex items-center px-4 py-3 hover:bg-gray-600 cursor-pointer transition-all"
              onClick={() => alert('Trigger clicked')}
            >
              <img
                src={triggerIcon}
                alt="Trigger"
                className="w-5 h-5 mr-3"
              />
              <span className="text-sm leading-tight text-left">Trigger</span>
            </li>
            <li
              className="flex items-center px-4 py-3 hover:bg-gray-600 cursor-pointer transition-all"
              onClick={() => alert('Edit clicked')}
            >
              <img src={editIcon} alt="Edit" className="w-5 h-5 mr-3" />
              <span className="text-sm leading-tight text-left">
                Edit name or description
              </span>
            </li>
            <li
              className="flex items-center px-4 py-3 hover:bg-gray-600 cursor-pointer transition-all"
              onClick={() => alert('Delete clicked')}
            >
              <img src={deleteIcon} alt="Delete" className="w-5 h-5 mr-3" />
              <span className="text-sm leading-tight text-left">Delete</span>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BurgerMenu;
