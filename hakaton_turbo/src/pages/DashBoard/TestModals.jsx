import React, { useState } from "react";
import ChooseDeviceModalWithFilter from "./ChooseDeviceModalWithFilter";
import AddConditionModalSingle from "./AddConditionModalSingle";
import AddConditionModalMultiple from "./AddConditionModalMultiple";

const TestModals = () => {
    const [showChooseDevice, setShowChooseDevice] = useState(false);
    const [showConditionSingle, setShowConditionSingle] = useState(false);
    const [showConditionMultiple, setShowConditionMultiple] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-8">Test Modals</h1>
            <div className="flex gap-4">
                <button
                    className="bg-orange-600 px-4 py-2 rounded"
                    onClick={() => setShowChooseDevice(true)}
                >
                    Show Choose Device Modal
                </button>
                <button
                    className="bg-orange-600 px-4 py-2 rounded"
                    onClick={() => setShowConditionSingle(true)}
                >
                    Show Add Condition (Single)
                </button>
                <button
                    className="bg-orange-600 px-4 py-2 rounded"
                    onClick={() => setShowConditionMultiple(true)}
                >
                    Show Add Condition (Multiple)
                </button>
            </div>

            {showChooseDevice && (
                <ChooseDeviceModalWithFilter
                    onClose={() => setShowChooseDevice(false)}
                />
            )}

            {showConditionSingle && (
                <AddConditionModalSingle onClose={() => setShowConditionSingle(false)} />
            )}

            {showConditionMultiple && (
                <AddConditionModalMultiple
                    onClose={() => setShowConditionMultiple(false)}
                />
            )}
        </div>
    );
};

export default TestModals;
