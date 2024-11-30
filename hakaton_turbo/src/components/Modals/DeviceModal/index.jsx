import React, { useState } from 'react';
import { MODAL_OVERLAY_STYLES } from '@/utils/modalConstants';
import { DEVICE_LIST, DEVICE_TYPES, DEVICE_LOCATIONS } from '@/utils/deviceConstants';

const DeviceModal = ({ isOpen, onClose }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deviceType, setDeviceType] = useState('All types');
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'Device':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2M8 4v4h8V4M8 4h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'Smart USB':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m-6-4h12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'Online camera':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'Tracker':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 12l4 4m-4-4v6m-4-10v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'Weather Station':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      case 'Smart plug':
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
      default:
        return <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
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

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        className={`modal-content bg-[#1C1C1C] rounded-xl w-[480px] overflow-hidden transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-1 animate-fadeIn">
            <h2 className="text-white text-xl font-medium text-center">Choose a device</h2>
            <p className="text-gray-400 text-sm text-center">
              Select the device you want to apply the rule to
            </p>
          </div>

          <div className="flex gap-4 animate-slideInRight" style={{ '--delay': '0.1s' }}>
            <div className="flex-1 group">
              <p className="text-gray-400 text-sm mb-2 transition-colors group-hover:text-white">Device type</p>
              <select 
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full bg-[#2B2B2B] text-white rounded-lg px-4 py-3 text-sm appearance-none cursor-pointer transition-all duration-300 outline-none hover:bg-[#323232] focus:ring-2 focus:ring-[#FF4D00] transform hover:-translate-y-0.5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center'
                }}
              >
                {DEVICE_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 group">
              <p className="text-gray-400 text-sm mb-2 transition-colors group-hover:text-white">Device Location</p>
              <select 
                className="w-full bg-[#2B2B2B] text-white rounded-lg px-4 py-3 text-sm appearance-none cursor-pointer transition-all duration-300 outline-none hover:bg-[#323232] focus:ring-2 focus:ring-[#FF4D00] transform hover:-translate-y-0.5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center'
                }}
              >
                {DEVICE_LOCATIONS.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative animate-slideInLeft" style={{ '--delay': '0.2s' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2B2B2B] text-white rounded-lg px-4 py-3 pl-11 text-sm placeholder-gray-400 transition-all duration-300 outline-none hover:bg-[#323232] focus:ring-2 focus:ring-[#FF4D00] transform hover:-translate-y-0.5"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 transition-colors duration-300"
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
            {filteredDevices.map((device, index) => (
              <button
                key={device.name}
                onClick={() => setSelectedDevice(device)}
                className={`group flex items-center gap-4 p-4 rounded-lg bg-[#2B2B2B] transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#323232] animate-fadeInScale ${
                  selectedDevice?.name === device.name ? 'ring-2 ring-[#FF4D00] shadow-lg shadow-[#FF4D00]/20' : ''
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

        <div className="grid grid-cols-2 border-t border-[#2B2B2B]">
          <button
            onClick={handleClose}
            className="p-4 text-gray-400 text-sm transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white transform hover:scale-105"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (selectedDevice) {
                alert(`Selected: ${selectedDevice.name}`);
                handleClose();
              }
            }}
            className="p-4 text-white text-sm bg-[#FF4D00] transition-all duration-300 hover:bg-[#E64500] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg hover:shadow-[#FF4D00]/20 disabled:hover:scale-100 disabled:hover:shadow-none"
            disabled={!selectedDevice}
          >
            Choose
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideInRight {
          opacity: 0;
          animation: slideInRight 0.5s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }

        .animate-slideInLeft {
          opacity: 0;
          animation: slideInLeft 0.5s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }

        .animate-fadeInScale {
          opacity: 0;
          animation: fadeInScale 0.5s ease-out forwards;
          animation-delay: var(--delay, 0s);
        }

        .modal-exit {
          transform: scale(0.95) translateY(10px);
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default DeviceModal;