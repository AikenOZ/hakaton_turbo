import React from "react";

const SaveRuleModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 text-white w-[400px] rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Save Rule</h2>
                <div className="mb-4">
                    <label className="block mb-2">Rule Name</label>
                    <input
                        type="text"
                        className="w-full bg-gray-700 p-2 rounded"
                        placeholder="Type rule name here"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        className="w-full bg-gray-700 p-2 rounded"
                        placeholder="Type rule description here"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button className="bg-gray-600 px-4 py-2 rounded">Cancel</button>
                    <button className="bg-orange-600 px-4 py-2 rounded">Create Rule</button>
                </div>
            </div>
        </div>
    );
};

export default SaveRuleModal;
