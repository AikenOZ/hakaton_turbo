import React, { useState } from 'react';

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
                                className={`flex items-center justify-between px-4 py-2 bg-[#3A3A3A] rounded-lg ${selectedDevice === device ? 'border-2 border-orange-500' : ''}`}
                            >
                                <span className="text-[#F5F5F5]">{device.name}</span>
                                <span className="text-[#808080] text-sm">{device.type}</span>
                            </button>
                        ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button onClick={onClose} className="bg-[#FF4D00] text-white px-6 py-2 rounded">
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

export default DeviceModal;
