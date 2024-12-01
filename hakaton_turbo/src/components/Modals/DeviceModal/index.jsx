import React, { useState, useEffect } from 'react';
import './DeviceModal.css';
import { MODAL_OVERLAY_STYLES } from '@/utils/modalConstants';
import { DEVICE_LIST, DEVICE_TYPES, DEVICE_LOCATIONS } from '@/utils/deviceConstants';
import CustomDropdown from '@/components/ui/CustomDropdown';
import DeviceIcon from '../../../assets/Device.svg';
import UsbIcon from '../../../assets/usb.svg';
import CameraIcon from '../../../assets/camera.svg';
import GeoIcon from '../../../assets/Geo.svg';
import TempIcon from '../../../assets/temperature.svg';
import FlashIcon from '../../../assets/flashe.svg';

const DeviceModal = ({ isOpen, onClose }) => {
  const [selectedDevices, setSelectedDevices] = useState([]);
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
        return (
          <div className="w-13 h-13 transition-transform duration-300 group-hover:scale-110">
            <img src={DeviceIcon} className="w-13 h-13" alt="Device icon" />
          </div>
        );
      case 'Smart USB':
        return (
          <div className="w-13 h-13 transition-transform duration-300 group-hover:scale-110">
            <img src={UsbIcon} className="w-13 h-13" alt="USB icon" />
          </div>
        );
      case 'Online camera':
        return (
          <div className="w-13 h-13 transition-transform duration-300 group-hover:scale-110">
            <img src={CameraIcon} className="w-13 h-13" alt="Camera icon" />
          </div>
        );
      case 'Tracker':
        return (
          <div className="w-13 h-13 transition-transform duration-300 group-hover:scale-110">
            <img src={GeoIcon} className="w-13 h-13" alt="Tracker icon" />
          </div>
        );
      case 'Weather Station':
        return (
          <div className="w-13 h-13 transition-transform duration-300 group-hover:scale-110">
            <img src={TempIcon} className="w-13 h-13" alt="Weather icon" />
          </div>
        );
      case 'Smart plug':
        return (
          <div className="w-13 h-13 transition-transform duration-300 group-hover:scale-110">
            <img src={FlashIcon} className="w-13 h-13" alt="Smart plug icon" />
          </div>
        );
      default:
        return (
          <div className="w-13 h-13 transition-transform duration-300 group-hover:scale-110">
            <img src={DeviceIcon} className="w-13 h-13" alt="Default icon" />
          </div>
        );
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

  const toggleDeviceSelection = (device) => {
    setSelectedDevices((prevSelectedDevices) => {
      if (prevSelectedDevices.find((d) => d.name === device.name)) {
        return prevSelectedDevices.filter((d) => d.name !== device.name);
      } else {
        return [...prevSelectedDevices, device];
      }
    });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
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
            <h2 className="text-white text-xl font-medium text-center">Choose devices</h2>
            <p className="text-gray-400 text-sm text-center">
              Select the devices you want to apply the rule to
            </p>
          </div>

          <div
            className="flex gap-4 animate-slideInRight relative"
            style={{ '--delay': '0.1s', zIndex: 50 }}
          >
            <div className="flex-1 group">
              <p className="text-gray-400 text-sm mb-2 transition-colors group-hover:text-white">
                Device type
              </p>
              <CustomDropdown
                options={DEVICE_TYPES}
                value={deviceType}
                onChange={setDeviceType}
                label="Select type"
              />
            </div>
            <div className="flex-1 group">
              <p className="text-gray-400 text-sm mb-2 transition-colors group-hover:text-white">
                Device Location
              </p>
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

          <div className="grid grid-cols-2 gap-4">
            {filteredDevices.map((device, index) => (
              <button
                key={device.name}
                onClick={() => toggleDeviceSelection(device)}
                className={`group flex flex-col items-center justify-center gap-2 w-full h-32 p-4 rounded-lg bg-[#2B2B2B] transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#323232] animate-fadeInScale ${selectedDevices.find((d) => d.name === device.name)
                    ? 'ring-2 ring-[#FF4D00] shadow-lg shadow-[#FF4D00]/20'
                    : ''
                  }`}
                style={{ '--delay': `${0.3 + index * 0.1}s` }}
              >
                <div className="text-gray-400 transition-colors duration-300 group-hover:text-white">
                  {getDeviceIcon(device.type)}
                </div>
                <div className="text-center transition-transform duration-300 group-hover:translate-y-1">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${selectedDevices.find((d) => d.name === device.name)
                        ? 'text-[#FF4D00]'
                        : 'text-white group-hover:text-[#FF4D00]'
                      }`}
                  >
                    {device.name}
                  </p>
                  <p
                    className={`text-xs transition-colors duration-300 ${selectedDevices.find((d) => d.name === device.name)
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-white'
                      }`}
                  >
                    {device.type}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>

        <div className="flex justify-between border-t border-[#2B2B2B] pt-4 p-6">
          <button
            onClick={handleClose}
            className="px-8 py-4 text-gray-400 text-base font-medium bg-[#1C1C1C] rounded-lg transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
            style={{
              width: '45%',
              fontSize: '16px',
              padding: '16px',
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              if (selectedDevices.length > 0) {
                handleClose();
              }
            }}
            disabled={selectedDevices.length === 0}
            className={`px-8 py-4 text-base font-medium rounded-lg transition-all duration-300 ${selectedDevices.length > 0
                ? 'text-white bg-[#FF4D00] hover:bg-[#FF6A00]'
                : 'text-gray-400 bg-[#2B2B2B] cursor-not-allowed'
              }`}
            style={{
              width: '45%',
              fontSize: '16px',
              padding: '16px',
            }}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceModal;
