import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import deviceNotif from '@/assets/Device Notif.svg';
import actionButton from '@/assets/actionbutton.svg';


const DeviceSettingsModal = ({ isOpen, device, onClose }) => {
  if (!isOpen || !device) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[600px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">
          Settings for {device.name}
        </h3>
        {/* Настройки для устройства */}
        <p className="text-[#808080]">Настройки устройства здесь</p>
        <button
          onClick={onClose}
          className="bg-[#FF4D00] text-white px-6 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};


// Модальное окно для выбора устройства
const DeviceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const devices = [
    { name: 'UnknownDevice', type: 'Device', location: 'Living Room' },
    { name: 'WebCamera29', type: 'Online camera', location: 'Office' },
    { name: 'Sensation USB', type: 'Smart USB', location: 'Kitchen' },
    { name: "Iphone Papa's Fritas", type: 'Tracker', location: 'Living Room' },
    { name: 'QingPing Temperature s...', type: 'Weather Station', location: 'Office' },
    { name: 'DragPlag V.14', type: 'Smart plug', location: 'Kitchen' },
  ];

  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceSettingsModalOpen, setDeviceSettingsModalOpen] = useState(false);
  const [deviceType, setDeviceType] = useState('All types');
  const [deviceLocation, setDeviceLocation] = useState('All locations');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeviceSelect = (device) => {
    setSelectedDevices((prevSelectedDevices) =>
      prevSelectedDevices.some((d) => d.name === device.name)
        ? prevSelectedDevices.filter((d) => d.name !== device.name)
        : [...prevSelectedDevices, device]
    );
  };

  const filteredDevices = devices.filter((device) => {
    const matchesType =
      deviceType === 'All types' || device.type === deviceType;
    const matchesLocation =
      deviceLocation === 'All locations' || device.location === deviceLocation;
    const matchesSearch = device.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesLocation && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[600px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">
          Choose a device
        </h3>

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
          <div className="mt-2">
            <input
              type="text"
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {filteredDevices.map((device) => (
            <button
              key={device.name}
              onClick={() => handleDeviceSelect(device)}
              className={`flex items-center justify-between px-4 py-2 bg-[#3A3A3A] rounded-lg ${selectedDevices.some((d) => d.name === device.name)
                ? 'border-2 border-orange-500'
                : ''
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
              if (selectedDevices.length > 0) {
                alert(
                  `Devices selected: ${selectedDevices
                    .map((device) => device.name)
                    .join(', ')}`
                );
                // Открытие модального окна для настройки устройства (пример)
                setDeviceSettingsModalOpen(true);
              } else {
                alert('No devices selected.');
              }
            }}
            className="bg-[#FF6F00] text-white px-6 py-2 rounded"
          >
            Choose ({selectedDevices.length})
          </button>
        </div>

      </div>
    </div>
  );
};


// Модальное окно для добавления действий
const ActionModal = ({ isOpen, onClose }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const renderContent = () => {
    if (!selectedAction) {
      return (
        <div>
          <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">
            Select action type
          </h3>
          <p className="text-[#808080] text-sm font-light mb-6">
            Select the action you want to end the rule with.
          </p>
          <div className="grid gap-4 mb-4">
            <button
              onClick={() => setSelectedAction('email')}
              className={`flex items-center justify-between px-4 py-2 bg-[#3A3A3A] rounded-lg ${selectedAction === 'email' ? 'border-2 border-orange-500' : ''}`}
            >
              <span className="text-[#F5F5F5]">E-mail</span>
              <span className="text-[#808080] text-sm">
                Send notifications via e-mail to one or multiple recipients.
              </span>
            </button>
            <button
              onClick={() => setSelectedAction('sms')}
              className={`flex items-center justify-between px-4 py-2 bg-[#3A3A3A] rounded-lg ${selectedAction === 'sms' ? 'border-2 border-orange-500' : ''}`}
            >
              <span className="text-[#F5F5F5]">SMS</span>
              <span className="text-[#808080] text-sm">
                Send notifications via SMS to one or multiple recipients.
              </span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button onClick={onClose} className="bg-[#FF4D00] text-white px-6 py-2 rounded">
              Close
            </button>
            <button
              onClick={() => selectedAction && setSelectedAction(selectedAction)}
              className={`bg-[#FF6F00] text-white px-6 py-2 rounded ${!selectedAction && 'opacity-50 pointer-events-none'}`}
            >
              Add action
            </button>
          </div>
        </div>
      );
    }

    if (selectedAction === 'email' || selectedAction === 'sms') {
      const isEmail = selectedAction === 'email';
      return (
        <div>
          <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">
            {isEmail ? 'Send E-mail' : 'Send SMS'}
          </h3>
          <p className="text-[#808080] text-sm font-light mb-6">
            {isEmail
              ? 'Set up your email notification'
              : 'Select the recipient and set the message text.'}
          </p>
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              placeholder={isEmail ? 'Recipient email' : 'Recipient phone number'}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
            />
            <textarea
              placeholder={isEmail ? 'Type your email message here' : 'Type your SMS text here'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setSelectedAction(null)}
              className="bg-[#FF4D00] text-white px-6 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (recipient && message) {
                  alert(`Action added: ${selectedAction} to ${recipient}`);
                  onClose();
                }
              }}
              className={`bg-[#FF6F00] text-white px-6 py-2 rounded ${(!recipient || !message) && 'opacity-50 pointer-events-none'}`}
            >
              Save
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[600px]">{renderContent()}</div>
    </div>
  );
};

// Модальное окно для сохранения правила
const SaveRuleModal = ({ isOpen, onClose }) => {
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (ruleName.trim()) {
      alert(`Rule saved: ${ruleName}\nDescription: ${ruleDescription}`);
      onClose();
    } else {
      alert('Please provide a rule name.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[400px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">Save Rule</h3>
        <div className="mb-4">
          <label className="text-[#F5F5F5] block mb-2">Rule name</label>
          <input
            type="text"
            placeholder="Type rule name here"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded mb-4"
          />
          <label className="text-[#F5F5F5] block mb-2">Description</label>
          <textarea
            placeholder="Type rule description here"
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
            className="w-full bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
            rows="4"
          ></textarea>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onClose}
            className="bg-[#FF4D00] text-white px-6 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#FF6F00] text-white px-6 py-2 rounded"
          >
            Create rule
          </button>
        </div>
      </div>
    </div>
  );
};

const LogicModal = ({ isOpen, onClose }) => {
  const [conditionType, setConditionType] = useState('Equal');
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (value.trim()) {
      alert(`Condition saved: ${conditionType} ${value}`);
      onClose();
    } else {
      alert('Please set a value for the condition.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[400px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">Set Condition</h3>
        <div className="mb-4">
          <label className="text-[#F5F5F5] block mb-2">Condition Type</label>
          <select
            value={conditionType}
            onChange={(e) => setConditionType(e.target.value)}
            className="bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded w-full mb-4"
          >
            <option value="Equal">Equal</option>
            <option value="NotEqual">Not Equal</option>
            <option value="GreaterThan">Greater Than</option>
            <option value="LessThan">Less Than</option>
          </select>
          <label className="text-[#F5F5F5] block mb-2">Value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={onClose} className="bg-[#FF4D00] text-white px-6 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-[#FF6F00] text-white px-6 py-2 rounded">
            Save Condition
          </button>
        </div>
      </div>
    </div>
  );
};


function AddRule() {
  const navigate = useNavigate();

  // Состояния для отображения модальных окон
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isSaveRuleModalOpen, setSaveRuleModalOpen] = useState(false);
  const [isLogicModalOpen, setLogicModalOpen] = useState(false);
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
      <div className="px-8 py-6 bg-[#2B2B2B] flex justify-between items-center border-b border-[#3A3A3A]">
        <button onClick={() => navigate('/')} className="flex items-center gap-4">
          <span className="text-[#F5F5F5] text-xl">←</span>
          <span className="text-[#F5F5F5] text-2xl font-light tracking-wide">New Rule</span>
        </button>
        <button
          onClick={() => setSaveRuleModalOpen(true)}
          className="bg-[#FF4D00] hover:bg-[#cc3d00] text-white px-6 py-2.5 rounded-lg text-[15px] transition-colors duration-200 font-medium">
          Save Rule
        </button>
      </div>

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
          <div className="flex gap-32">
            <div className="flex flex-col items-center text-center">
              <img src={deviceNotif} alt="Device Icon" className="w-20 h-20 mb-5" />
              <h3 className="text-[#F5F5F5] text-lg font-semibold mb-2">Choose your device</h3>
              <p className="text-[#808080] text-sm font-light max-w-[280px] leading-relaxed">
                Select the device to which you will apply the rule and set the necessary parameters for it
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src={actionButton} alt="Action Icon" className="w-20 h-20 mb-5" />
              <h3 className="text-[#F5F5F5] text-lg font-semibold mb-2">Complete with the actions</h3>
              <p className="text-[#808080] text-sm font-light max-w-[280px] leading-relaxed">
                Add one or multiple actions to your rule to act based on the result of your logic block
              </p>
            </div>
          </div>
        </div>
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-[150px] h-[80px] rounded-xl shadow-lg px-4"
          style={{ backgroundColor: 'rgba(23, 23, 23, 0.9)' }}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
            onClick={() => setDeviceModalOpen(true)}
            whileHover="hover"
            whileTap="tap"
            variants={buttonHoverTapVariants}
          >
            <img src={deviceNotif} alt="Device Icon" className="w-[52px] h-[52px]" />
          </motion.div>
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

      <motion.div
        className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
        onClick={() => setLogicModalOpen(true)}
        whileHover="hover"
        whileTap="tap"
        variants={buttonHoverTapVariants}
      >
        <span className="text-[#F5F5F5]">Logic</span>
      </motion.div>

      <DeviceModal isOpen={isDeviceModalOpen} onClose={() => setDeviceModalOpen(false)} />
      <ActionModal isOpen={isActionModalOpen} onClose={() => setActionModalOpen(false)} />
      <SaveRuleModal isOpen={isSaveRuleModalOpen} onClose={() => setSaveRuleModalOpen(false)} />
      <LogicModal isOpen={isLogicModalOpen} onClose={() => setLogicModalOpen(false)} />
    </div>
  );
}

export default AddRule;
