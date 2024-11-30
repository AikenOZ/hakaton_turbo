import React from "react";

const AddConditionModalMultiple = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white w-[500px] rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Add Conditions to the Device</h2>
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src="/device-icon.png"
                        alt="Device"
                        className="w-12 h-12 bg-gray-700 rounded-full"
                    />
                    <div>
                        <h3>QingPing1</h3>
                        <p className="text-sm text-gray-400">Weather Station</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <select className="w-1/3 bg-gray-700 p-2 rounded">
                        <option>Temperature</option>
                    </select>
                    <select className="w-1/3 bg-gray-700 p-2 rounded">
                        <option>&gt; Greater than</option>
                    </select>
                    <input
                        type="text"
                        className="w-1/3 bg-gray-700 p-2 rounded"
                        placeholder="12°"
                    />
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <select className="w-1/3 bg-gray-700 p-2 rounded">
                        <option>Humidity</option>
                    </select>
                    <select className="w-1/3 bg-gray-700 p-2 rounded">
                        <option>&gt; Greater than</option>
                    </select>
                    <input
                        type="text"
                        className="w-1/3 bg-gray-700 p-2 rounded"
                        placeholder="58%"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="bg-gray-700 px-4 py-2 rounded">+ And</button>
                    <button className="bg-gray-700 px-4 py-2 rounded">+ Or</button>
                </div>
                <div className="flex justify-between mt-6">
                    <button className="bg-gray-600 px-4 py-2 rounded">Back</button>
                    <button className="bg-orange-600 px-4 py-2 rounded">Add Device</button>
                </div>
            </div>
        </div>
    );
};

export default AddConditionModalMultiple;
