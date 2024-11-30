import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import AnimatedPage from '@/components/ui/AnimatedPage';
import BurgerMenu from '@/pages/burger.jsx';
import burgerIcon from '@/assets/burger.svg';
import data from '@/utils/storage.json';

const BurgerMenuPortal = ({ isOpen, buttonRef, onClose }) => {
  if (!isOpen || !buttonRef.current) return null;

  const rect = buttonRef.current.getBoundingClientRect();
  
  return createPortal(
    <div 
      className="fixed bg-[#333] rounded-lg shadow-xl"
      style={{
        top: `${rect.bottom + 12}px`,
        left: `${rect.right - 200}px`, // 200px - ширина меню
        minWidth: '200px',
        zIndex: 9999
      }}
    >
      <BurgerMenu isOpen onClose={onClose} />
    </div>,
    document.body
  );
};

const IndexRulesPage = () => {
  const navigate = useNavigate();
  const navControls = useAnimation();
  const [rules, setRules] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const userRules = data.user?.rules || [];
    setRules(userRules);

    navControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
    });

    const handleClickOutside = (event) => {
      if (openMenuId !== null && 
          buttonRefs.current[openMenuId] && 
          !buttonRefs.current[openMenuId].contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navControls, openMenuId]);

  const handleButtonClick = async () => {
    await navControls.start({
      y: -100,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    });
    navigate('/add-rule');
  };

  const toggleMenu = (id) => {
    setOpenMenuId(prev => prev === id ? null : id);
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  return (
    <div className="bg-[#1E1E1E] h-screen overflow-hidden text-[#F5F5F5] relative">
      <div className="relative">
        <motion.div
          className="px-6 py-6 bg-transparent flex justify-between items-center max-w-[calc(100%-20px)] mx-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={navControls}
        >
          <h1 className="text-2xl font-light tracking-wide">Rules Engine</h1>
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
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{ 
            width: 'calc(100% - 75px)',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.5)'
          }}
        />
      </div>

      <AnimatedPage>
        <div className="p-6">
          {rules.length > 0 ? (
            <div className="relative">
              <table className="w-full table-auto border-separate border-spacing-y-3">
                <thead className="text-sm text-[#808080] uppercase">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Description</th>
                    <th className="text-left p-3">Connected devices</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-left p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule, index) => (
                    <tr
                      key={rule.id}
                      className={`text-sm rounded-lg transition-all duration-300 ${
                        openMenuId === rule.id ? '' : 'hover:shadow-lg hover:scale-[1.02]'
                      }`}
                      style={{
                        position: 'relative',
                        zIndex: rules.length - index
                      }}
                    >
                      <td className="p-4">{rule.name}</td>
                      <td className="p-4">{rule.description}</td>
                      <td className="p-4">{rule.connectedDevices.join(', ')}</td>
                      <td className="p-4 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked={rule.status === 'active'}
                          />
                          <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-[#FF4D00] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                        </label>
                      </td>
                      <td className="p-4 text-right">
                        <div className="relative">
                          <button
                            ref={el => buttonRefs.current[rule.id] = el}
                            onClick={() => toggleMenu(rule.id)}
                          >
                            <img src={burgerIcon} alt="Options" className="w-8 h-8" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <BurgerMenuPortal 
                isOpen={openMenuId !== null}
                buttonRef={{ current: buttonRefs.current[openMenuId] }}
                onClose={closeMenu}
              />
            </div>
          ) : (
            <p className="text-center text-[#808080]">No rules available</p>
          )}
        </div>
      </AnimatedPage>
    </div>
  );
};

export default IndexRulesPage;