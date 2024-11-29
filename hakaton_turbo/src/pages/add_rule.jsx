import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import deviceNotif from '@/assets/Device Notif.svg';
import actionButton from '@/assets/actionbutton.svg';

// Модальное окно для выбора устройства
const DeviceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const devices = [
    { name: 'UnknownDevice', type: 'Device' },
    { name: 'WebCamera29', type: 'Online camera' },
    { name: 'Sensation USB', type: 'Smart USB' },
    { name: 'Iphone Papa\'s Fritas', type: 'Tracker' },
    { name: 'QingPing Temperature s...', type: 'Weather Station' },
    { name: 'DragPlag V.14', type: 'Smart plug' },
  ];

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceType, setDeviceType] = useState('All types');
  const [deviceLocation, setDeviceLocation] = useState('All locations');

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[600px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">Choose a device</h3>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <label className="text-[#F5F5F5]">Device type</label>
            <select
              className="bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <option>All types</option>
              <option>Device</option>
              <option>Online camera</option>
              <option>Smart USB</option>
              <option>Tracker</option>
              <option>Weather Station</option>
              <option>Smart plug</option>
            </select>
          </div>
          <div className="flex justify-between">
            <label className="text-[#F5F5F5]">Device Location</label>
            <select
              className="bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
              value={deviceLocation}
              onChange={(e) => setDeviceLocation(e.target.value)}
            >
              <option>All locations</option>
              <option>Living Room</option>
              <option>Office</option>
              <option>Kitchen</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {devices
            .filter((device) =>
              deviceType === 'All types' || device.type === deviceType
            )
            .map((device) => (
              <button
                key={device.name}
                onClick={() => handleDeviceSelect(device)}
                className={`flex items-center justify-between px-4 py-2 bg-[#3A3A3A] rounded-lg ${selectedDevice === device ? 'border-2 border-orange-500' : ''
                  }`}
              >
                <span className="text-[#F5F5F5]">{device.name}</span>
                <span className="text-[#808080] text-sm">{device.type}</span>
              </button>
            ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onClose}
            className="bg-[#FF4D00] text-white px-6 py-2 rounded"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (selectedDevice) {
                alert(`Device ${selectedDevice.name} selected`);
              }
            }}
            className="bg-[#FF6F00] text-white px-6 py-2 rounded"
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
};

// Модальное окно для добавления действий
const ActionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[600px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">Complete with the actions</h3>
        {/* Здесь будет содержимое модалки для добавления действий */}
        <button onClick={onClose} className="text-white bg-red-500 px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

function AddRule() {
  const navigate = useNavigate();

  // Состояния для отображения модальных окон
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isActionModalOpen, setActionModalOpen] = useState(false);

  // Анимации для страницы
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

  // Анимации для нижних кнопок
  const buttonVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  const buttonHoverTapVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="bg-[#1E1E1E] min-h-screen font-sans">
      {/* Верхняя панель (навбар) */}
      <div className="px-8 py-6 bg-[#2B2B2B] flex justify-between items-center border-b border-[#3A3A3A]">
        <button onClick={() => navigate('/')} className="flex items-center gap-4">
          <span className="text-[#F5F5F5] text-xl">←</span>
          <span className="text-[#F5F5F5] text-2xl font-light tracking-wide">
            New Rule
          </span>
        </button>
        <button className="bg-[#FF4D00] hover:bg-[#cc3d00] text-white px-6 py-2.5 rounded-lg text-[15px] transition-colors duration-200 font-medium">
          Save Rule
        </button>
      </div>

      {/* Основной контент с анимацией */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
          <div className="flex gap-32">
            {/* Блок "Choose your device" */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded flex items-center justify-center mb-5">
                <img src={deviceNotif} alt="Device Icon" className="w-20 h-20" />
              </div>
              <h3 className="text-[#F5F5F5] text-lg font-semibold mb-2">
                Choose your device
              </h3>
              <p className="text-[#808080] text-sm font-light max-w-[280px] leading-relaxed">
                Select the device to which you will apply the rule and set the
                necessary parameters for it
              </p>
            </div>

            {/* Блок "Complete with the actions" */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded flex items-center justify-center mb-5">
                <img src={actionButton} alt="Action Icon" className="w-20 h-20" />
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
        </div>

        {/* Нижние иконки с анимацией */}
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-[150px] h-[80px] rounded-xl shadow-lg px-4"
          style={{
            backgroundColor: 'rgba(23, 23, 23, 0.9)',
          }}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Левая кнопка Device */}
          <motion.div
            className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
            onClick={() => setDeviceModalOpen(true)}
            whileHover="hover"
            whileTap="tap"
            variants={buttonHoverTapVariants}
          >
            <img src={deviceNotif} alt="Device Icon" className="w-[52px] h-[52px]" />
          </motion.div>

          {/* Правая кнопка Action */}
          <motion.div
            className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
            onClick={() => setActionModalOpen(true)}
            whileHover="hover"
            whileTap="tap"
            variants={buttonHoverTapVariants}
          >
            <img src={actionButton} alt="Action Icon" className="w-[52px] h-[52px]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Модальные окна */}
      <DeviceModal isOpen={isDeviceModalOpen} onClose={() => setDeviceModalOpen(false)} />
      <ActionModal isOpen={isActionModalOpen} onClose={() => setActionModalOpen(false)} />
    </div>
  );
}

export default AddRule;