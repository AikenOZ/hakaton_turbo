import React from "react";

const ChooseDeviceModalWithFilter = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white w-[500px] rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Choose a Device</h2>
                <div className="mb-4 flex gap-4">
                    <select className="w-1/2 bg-gray-700 p-2 rounded">
                        <option>Weather Station</option>
                    </select>
                    <select className="w-1/2 bg-gray-700 p-2 rounded">
                        <option>Germany, Berlin, Office</option>
                    </select>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full bg-gray-700 p-2 rounded"
                        placeholder="Search..."
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-gray-700 p-3 rounded text-center border border-orange-500">
                        <span>QingPing1</span>
                        <p className="text-sm">Weather Station</p>
                    </button>
                    <button className="bg-gray-700 p-3 rounded text-center border border-orange-500">
                        <span>QingPing2</span>
                        <p className="text-sm">Weather Station</p>
                    </button>
                </div>
                <div className="flex justify-between mt-6">
                    <button className="bg-gray-600 px-4 py-2 rounded">Close</button>
                    <button className="bg-orange-600 px-4 py-2 rounded">Choose (2)</button>
                </div>
            </div>
        </div>
    );
};

export default ChooseDeviceModalWithFilter;
