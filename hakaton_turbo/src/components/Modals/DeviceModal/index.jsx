import React, { useState, useEffect } from 'react';
import './DeviceModal.css';
import { MODAL_OVERLAY_STYLES } from '@/utils/modalConstants';
import { DEVICE_LIST, DEVICE_TYPES, DEVICE_LOCATIONS } from '@/utils/deviceConstants';
import CustomDropdown from '@/components/ui/CustomDropdown';

const DeviceModal = ({ isOpen, onClose }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deviceType, setDeviceType] = useState('All types');
  const [deviceLocation, setDeviceLocation] = useState('All locations');
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Device':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2M8 4v4h8V4M8 4h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
      case 'Smart USB':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m-6-4h12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
      case 'Online camera':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
      case 'Tracker':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 12l4 4m-4-4v6m-4-10v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
      case 'Weather Station':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
      case 'Smart plug':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
      default:
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>;
    }
  };

  const filteredDevices = DEVICE_LIST.filter((device) => {
    const matchesType = deviceType === 'All types' || device.type === deviceType;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleClose = () => {
    const modal = document.querySelector('.modal-content');
    modal.classList.add('modal-exit');
    setTimeout(onClose, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={handleOverlayClick}
    >
      <div
        className={`modal-content bg-[#1C1C1C] rounded-xl w-[480px] overflow-hidden transform transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-1 animate-fadeIn">
            <h2 className="text-white text-xl font-medium text-center">Choose a device</h2>
            <p className="text-gray-400 text-sm text-center">
              Select the device you want to apply the rule to
            </p>
          </div>

          <div className="flex gap-4 animate-slideInRight relative" style={{ '--delay': '0.1s', zIndex: 50 }}>
            <div className="flex-1 group">
              <p className="text-gray-400 text-sm mb-2 transition-colors group-hover:text-white">Device type</p>
              <CustomDropdown
                options={DEVICE_TYPES}
                value={deviceType}
                onChange={setDeviceType}
                label="Select type"
              />
            </div>
            <div className="flex-1 group">
              <p className="text-gray-400 text-sm mb-2 transition-colors group-hover:text-white">Device Location</p>
              <CustomDropdown
                options={DEVICE_LOCATIONS}
                value={deviceLocation}
                onChange={setDeviceLocation}
                label="Select location"
              />
            </div>
          </div>

          <div className="relative animate-slideInLeft" style={{ '--delay': '0.2s' }}>
            <div className="search-block">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-[#2B2B2B] text-white rounded-lg px-4 py-3 pl-11 text-sm placeholder-gray-400 transition-all duration-300 outline-none hover:bg-[#323232] focus:ring-2 focus:ring-[#FF4D00]"
              />
              <svg
                className={`absolute left-4 top-3.5 h-5 w-5 transition-all duration-300 ${isSearchFocused ? 'text-[#FF4D00] scale-110' : 'text-gray-400'
                  } search-icon`}
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
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredDevices.map((device, index) => (
              <button
                key={device.name}
                onClick={() => setSelectedDevice(device)}
                className={`group flex items-center gap-4 p-4 rounded-lg bg-[#2B2B2B] transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#323232] animate-fadeInScale ${selectedDevice?.name === device.name ? 'ring-2 ring-[#FF4D00] shadow-lg shadow-[#FF4D00]/20' : ''
                  }`}
                style={{ '--delay': `${0.3 + index * 0.1}s` }}
              >
                <div className="text-gray-400 transition-colors duration-300 group-hover:text-white">
                  {getDeviceIcon(device.type)}
                </div>
                <div className="text-left transition-transform duration-300 group-hover:translate-x-1">
                  <p className="text-white text-sm font-medium transition-colors duration-300 group-hover:text-[#FF4D00]">{device.name}</p>
                  <p className="text-gray-400 text-xs transition-colors duration-300 group-hover:text-white">{device.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex border-t border-[#2B2B2B]">
          <button
            onClick={handleClose}
            className="flex-1 p-4 text-gray-400 text-sm font-medium transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white relative overflow-hidden group"
          >
            <span className="relative z-10">Close</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B] to-[#323232] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={() => {
              if (selectedDevice) {
                // Здесь логика выбора устройства
                handleClose();
              }
            }}
            disabled={!selectedDevice}
            className={`flex-1 p-4 text-sm font-medium transition-all duration-300 relative overflow-hidden group
              ${selectedDevice 
                ? 'text-white bg-[#FF4D00] hover:bg-[#FF6A00]' 
                : 'text-gray-400 bg-[#2B2B2B] cursor-not-allowed'
              }`}
          >
            <span className="relative z-10">Choose</span>
            <div className={`absolute inset-0 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${!selectedDevice && 'hidden'}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceModal;