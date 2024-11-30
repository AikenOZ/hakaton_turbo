import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

import deviceNotif from '@/assets/Device Notif.svg';
import actionButton from '@/assets/actionbutton.svg';

// Device Modal Component
const DeviceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const devices = [
    { name: 'UnknownDevice', type: 'Device', icon: '../public/Group 1597877242.svg' },
    { name: 'Sensation USB', type: 'Smart USB', icon: '/public/USB Device.svg' },
    { name: 'WebCamera29', type: 'Online camera', icon: '/public/Online Camera.svg' },
    { name: "Iphone Papa's Fritas", type: 'Tracker', icon: '../public/geolac.svg' },
    { name: 'QingPing Temperature s...', type: 'Weather Station', icon: '/public/Weather Station.svg' },
    { name: 'DragPlag V.14', type: 'Smart plug', icon: '/public/Smart Plug.svg' },
  ];

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deviceType, setDeviceType] = useState('All types');

  const filteredDevices = devices.filter((device) => {
    const matchesType = deviceType === 'All types' || device.type === deviceType;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#1C1C1C] rounded-lg w-[480px] overflow-hidden">
        <div className="p-4">
          <h2 className="text-white text-lg font-medium text-center">Choose a device</h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Select the device you want to apply the rule to
          </p>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <p className="text-gray-300 text-sm mb-2">Device type</p>
              <select 
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full bg-[#2B2B2B] text-white rounded px-3 py-2 text-sm border border-gray-700"
              >
                <option>All types</option>
                <option>Device</option>
                <option>Smart USB</option>
                <option>Tracker</option>
                <option>Weather Station</option>
                <option>Smart plug</option>
              </select>
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-sm mb-2">Device Location</p>
              <select className="w-full bg-[#2B2B2B] text-white rounded px-3 py-2 text-sm border border-gray-700">
                <option>All locations</option>
              </select>
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2B2B2B] text-white rounded px-3 py-2 pl-8 text-sm border border-gray-700"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredDevices.map((device) => (
              <button
                key={device.name}
                onClick={() => setSelectedDevice(device)}
                className={`flex items-center gap-3 p-3 rounded bg-[#2B2B2B] hover:bg-[#3A3A3A] transition-colors ${
                  selectedDevice?.name === device.name ? 'ring-2 ring-[#FF4D00]' : ''
                }`}
              >
                <div className="bg-[#1C1C1C] rounded-lg p-2 w-[44px] h-[44px] flex items-center justify-center">
                  <img 
                    src={device.icon} 
                    alt={device.type}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="text-left">
                  <p className="text-[#F5F5F5] text-sm font-normal">{device.name}</p>
                  <p className="text-[#808080] text-xs font-light">{device.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex border-t border-gray-700 mt-4">
          <button
            onClick={onClose}
            className="flex-1 p-4 text-[#808080] text-sm bg-[#2B2B2B] hover:bg-[#3A3A3A] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (selectedDevice) {
                alert(`Selected: ${selectedDevice.name}`);
                onClose();
              }
            }}
            className="flex-1 p-4 text-white text-sm bg-[#FF4D00] hover:bg-[#cc3d00] transition-colors"
            disabled={!selectedDevice}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
};

// Action Modal Component
const ActionModal = ({ isOpen, onClose }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSaveAction = () => {
    if (recipient && message) {
      const actionData = {
        type: selectedAction,
        recipient,
        message,
      };

      fetch('http://localhost:5000/save-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actionData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Action saved successfully');
          onClose();
        })
        .catch((error) => {
          console.error('Error saving action:', error);
          alert('Failed to save action');
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderContent = () => {
    if (!selectedAction) {
      return (
        <div className="p-6">
          <h2 className="text-[#F5F5F5] text-xl font-medium text-center">Select action type</h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Select the action you want to end the rule with.
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => setSelectedAction('email')} 
              className="w-full bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-lg p-4 text-left flex items-start gap-4 transition-colors border border-transparent hover:border-gray-700"
            >
              <div className="bg-[#fffff]">
              <span className="text-gray-400">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M21 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H21C21.5523 19 22 18.5523 22 18V6C22 5.44772 21.5523 5 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 6L12 13L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">E-mail</h3>
                <p className="text-gray-400 text-sm">Send notifications via e-mail to one or multiple recipients.</p>
              </div>
            </button>

            <button 
              onClick={() => setSelectedAction('sms')} 
              className="w-full bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-lg p-4 text-left flex items-start gap-4 transition-colors border border-transparent hover:border-gray-700"
            >
              <span className="text-gray-400">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <h3 className="text-white font-medium mb-1">SMS</h3>
                <p className="text-gray-400 text-sm">Send notifications via SMS to one or multiple recipients.</p>
              </div>
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={onClose} 
              className="flex-1 py-3 text-gray-300 bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-lg transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => selectedAction && setSelectedAction(selectedAction)} 
              className="flex-1 py-3 bg-[#FF4D00] hover:bg-[#cc3d00] text-white rounded-lg transition-colors"
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
        <div className="p-6">
          <h2 className="text-[#F5F5F5] text-xl font-medium text-center">
            {isEmail ? 'Send E-mail' : 'Send SMS'}
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Set up your {isEmail ? 'e-mail' : 'SMS'} notification
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-2">Recipient</label>
              <input
                type="text"
                placeholder={isEmail ? 'mainaddress@gmail.com' : 'Phone number'}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-[#2B2B2B] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-gray-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">Message</label>
              <textarea
                placeholder={`Type your ${isEmail ? 'e-mail' : 'SMS'} message here`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#2B2B2B] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-gray-600 focus:outline-none resize-none"
                rows="4"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={() => setSelectedAction(null)} 
              className="flex-1 py-3 text-gray-300 bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-lg transition-colors"
            >
              Back
            </button>
            <button 
              onClick={handleSaveAction} 
              className="flex-1 py-3 bg-[#FF4D00] hover:bg-[#cc3d00] text-white rounded-lg transition-colors"
              disabled={!recipient || !message}
            >
              Save
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1C] rounded-xl w-[400px] overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

// Save Rule Modal Component
const SaveRuleModal = ({ isOpen, onClose }) => {
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');

  if (!isOpen) return null;

  const saveRuleToJson = () => {
    const ruleData = {
      name: ruleName,
      description: ruleDescription,
    };

    const existingRules = JSON.parse(localStorage.getItem('rules')) || [];
    existingRules.push(ruleData);
    localStorage.setItem('rules', JSON.stringify(existingRules));

    alert(`Rule saved: ${ruleName}\nDescription: ${ruleDescription}`);
  };

  const downloadJsonFile = () => {
    const rulesData = JSON.parse(localStorage.getItem('rules')) || [];
    const dataStr = JSON.stringify(rulesData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.href = url;
    link.download = 'storage.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (ruleName.trim()) {
      saveRuleToJson();
      onClose();
    } else {
      alert('Please provide a rule name.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[400px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4 text-center font-sans">Save Rule</h3>
        <div className="mb-4">
          <label className="text-[#656565] block mb-2">Rule name</label>
          <input
            type="text"
            placeholder="Type rule name here"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full bg-[#3A3A3A] text-[#bababa] px-4 py-2 rounded-md mb-4"
          />
          <label className="text-[#656565] block mb-2">Description</label>
          <textarea
            placeholder="Type rule description here"
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
            className="w-full bg-[#3A3A3A] text-[#bababa] px-4 py-2 rounded-md"
            rows="4"
          ></textarea>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onClose}
            className="bg-[#FF4D00] text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#FF6F00] text-white px-6 py-2 rounded-md"
          >
            Create rule
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={downloadJsonFile}
            className="bg-[#FF6F00] text-white px-6 py-2 rounded-md"
          >
            Download Rules JSON
          </button>
        </div>
      </div>
    </div>
  );
};

// Logic Modal Component
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
  const navControls = useAnimation();
  const bottomButtonsControls = useAnimation();

  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const imagesToLoad = 4;

  // Modal states
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isSaveRuleModalOpen, setSaveRuleModalOpen] = useState(false);
  const [isLogicModalOpen, setLogicModalOpen] = useState(false);

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
  }, [imagesLoadedCount, bottomButtonsControls]);

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
            onClick={() => setSaveRuleModalOpen(true)}
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
        initial="initial"
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
                onClick={() => setDeviceModalOpen(true)}
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
                onClick={() => setActionModalOpen(true)}
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

      {/* Modal components */}
      <DeviceModal isOpen={isDeviceModalOpen} onClose={() => setDeviceModalOpen(false)} />
      <ActionModal isOpen={isActionModalOpen} onClose={() => setActionModalOpen(false)} />
      <SaveRuleModal isOpen={isSaveRuleModalOpen} onClose={() => setSaveRuleModalOpen(false)} />
      <LogicModal isOpen={isLogicModalOpen} onClose={() => setLogicModalOpen(false)} />
    </div>
  );
}

export default AddRule;