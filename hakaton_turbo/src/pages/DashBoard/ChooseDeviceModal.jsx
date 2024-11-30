import React from "react";

const ChooseDeviceModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white w-[400px] rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Choose a device</h2>
                <div className="mb-4">
                    <label className="block mb-2">Device Type</label>
                    <select className="w-full bg-gray-700 p-2 rounded">
                        <option>All types</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Device Location</label>
                    <select className="w-full bg-gray-700 p-2 rounded">
                        <option>All locations</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="bg-gray-700 p-3 rounded">Device 1</button>
                    <button className="bg-gray-700 p-3 rounded">Device 2</button>
                </div>
                <div className="flex justify-between mt-4">
                    <button className="bg-gray-600 px-4 py-2 rounded">Close</button>
                    <button className="bg-orange-600 px-4 py-2 rounded">Choose</button>
                </div>
            </div>
        </div>
    );
};

export default ChooseDeviceModal;
