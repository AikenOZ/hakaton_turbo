import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DeviceModal.css";
import TempIcon from "../../../assets/temperature.svg";

const ConditionsModal = ({ isOpen, onClose, selectedDevices, onBack, onSubmit }) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [conditions, setConditions] = useState(
        selectedDevices.map(device => ({
            deviceId: device.name,
            conditions: [
                {
                    group: 0,
                    conditions: [
                        {
                            measurementField: "Temperature",
                            state: "> Greater than",
                            value: "0"
                        }
                    ]
                }
            ]
        }))
    );

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    const measurementOptions = ["Temperature", "Humidity", "Pressure", "Light", "Motion"];
    const stateOptions = ["> Greater than", "< Less than", "= Equals", "≠ Not equals"];

    const handleClose = () => {
        const modal = document.querySelector(".modal-content");
        modal.classList.add("modal-exit");
        setTimeout(onClose, 300);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleAddCondition = (deviceIndex, type = "and") => {
        const newConditions = [...conditions];
        const deviceConditions = newConditions[deviceIndex];
        if (type === "and") {
            const lastGroup = deviceConditions.conditions[deviceConditions.conditions.length - 1];
            lastGroup.conditions.push({
                measurementField: "Temperature",
                state: "> Greater than",
                value: "0"
            });
        } else if (type === "or") {
            deviceConditions.conditions.push({
                group: deviceConditions.conditions.length,
                conditions: [
                    {
                        measurementField: "Temperature",
                        state: "> Greater than",
                        value: "0"
                    }
                ]
            });
        }
        setConditions(newConditions);
    };

    const handleRemoveCondition = (deviceIndex, groupIndex, conditionIndex) => {
        const newConditions = [...conditions];
        const deviceConditions = newConditions[deviceIndex].conditions[groupIndex];
        if (deviceConditions.conditions.length > 1) {
            deviceConditions.conditions.splice(conditionIndex, 1);
        } else if (newConditions[deviceIndex].conditions.length > 1) {
            newConditions[deviceIndex].conditions.splice(groupIndex, 1);
        }
        setConditions(newConditions);
    };

    const handleConditionChange = (deviceIndex, groupIndex, conditionIndex, field, value) => {
        const newConditions = [...conditions];
        const condition = newConditions[deviceIndex].conditions[groupIndex].conditions[conditionIndex];
        condition[field] = value;
        setConditions(newConditions);
    };

    const handleSubmit = async () => {
        try {
            const formattedDevice = {
                label: selectedDevices[0]?.deviceId || "Unnamed Device",
                type: "Weather Station",
                conditions: conditions.flatMap(device =>
                    device.conditions.flatMap(group =>
                        group.conditions.map(condition => ({
                            field: condition.measurementField,
                            operator: condition.state,
                            value: condition.value
                        }))
                    )
                )
            };
    
            const storedData = localStorage.getItem("canvasData");
            const canvasData = storedData ? JSON.parse(storedData) : {
                defaultNodes: {
                    device: {
                        defaultPosition: { x: 250, y: 200 },
                        styles: {
                            background: "#2B2B2B",
                            color: "#F5F5F5",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                            minWidth: "280px"
                        }
                    },
                    action: {
                        defaultPosition: { x: 700, y: 200 },
                        styles: {
                            background: "#2B2B2B",
                            color: "#F5F5F5",
                            border: "none",
                            borderRadius: "16px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            padding: "12px",
                            minWidth: "240px"
                        }
                    }
                },
                rules: []
            };
    
            const newRule = {
                id: `rule-${Date.now()}`,
                name: formattedDevice.label,
                device: formattedDevice,
                action: {
                    label: "Send e-mail to",
                    recipient: "user@example.com",
                    type: "email"
                }
            };
    
            if (!canvasData.rules) {
                canvasData.rules = [];
            }
            canvasData.rules.push(newRule);
    
            localStorage.setItem("canvasData", JSON.stringify(canvasData));
            onSubmit(formattedDevice);
            console.log("Device successfully added:", formattedDevice);
    
            // Редирект на новый маршрут
            navigate("/add-rule/canvas");
        } catch (error) {
            console.error("Error while submitting conditions:", error);
        }
    };
    

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(4px)"
            }}
            onClick={handleOverlayClick}
        >
            <div
                className={`modal-content bg-[#1C1C1C] rounded-xl w-[480px] overflow-hidden transform transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 space-y-6">
                    <div className="space-y-1 animate-fadeIn">
                        <h2 className="text-white text-xl font-medium text-center">Add conditions to the device</h2>
                        <p className="text-gray-400 text-sm text-center">Select the conditions under which the trigger should occur</p>
                    </div>
                    {conditions.map((device, deviceIndex) => (
                        <div key={device.deviceId} className="space-y-4 animate-slideInRight" style={{ "--delay": `${0.1 + deviceIndex * 0.1}s` }}>
                            <div className="bg-[#2B2B2B] rounded-lg p-4 flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#323232] rounded-lg flex items-center justify-center">
                                    <img src={TempIcon} className="w-6 h-6" alt="Weather icon" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{device.deviceId}</p>
                                    <p className="text-gray-400 text-sm">Weather Station</p>
                                </div>
                            </div>
                            {device.conditions.map((group, groupIndex) => (
                                <div key={groupIndex} className="space-y-4">
                                    {group.conditions.map((condition, conditionIndex) => (
                                        <div key={conditionIndex} className="space-y-2 animate-slideInLeft" style={{ "--delay": `${0.2 + conditionIndex * 0.1}s` }}>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <span>{groupIndex === 0 && conditionIndex === 0 ? "If" : conditionIndex === 0 ? "Or" : "And"}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={condition.measurementField}
                                                    onChange={(e) => handleConditionChange(deviceIndex, groupIndex, conditionIndex, "measurementField", e.target.value)}
                                                    className="flex-1 bg-[#2B2B2B] text-white rounded-lg px-4 py-3 text-sm placeholder-gray-400 transition-all duration-300 outline-none hover:bg-[#323232] focus:ring-2 focus:ring-[#FF4D00]"
                                                >
                                                    {measurementOptions.map(option => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={condition.state}
                                                    onChange={(e) => handleConditionChange(deviceIndex, groupIndex, conditionIndex, "state", e.target.value)}
                                                    className="flex-1 bg-[#2B2B2B] text-white rounded-lg px-4 py-3 text-sm placeholder-gray-400 transition-all duration-300 outline-none hover:bg-[#323232] focus:ring-2 focus:ring-[#FF4D00]"
                                                >
                                                    {stateOptions.map(option => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="text"
                                                        value={condition.value}
                                                        onChange={(e) => handleConditionChange(deviceIndex, groupIndex, conditionIndex, "value", e.target.value)}
                                                        className="w-full bg-[#2B2B2B] text-white rounded-lg px-4 py-3 text-sm placeholder-gray-400 transition-all duration-300 outline-none hover:bg-[#323232] focus:ring-2 focus:ring-[#FF4D00]"
                                                    />
                                                </div>
                                                {(group.conditions.length > 1 || device.conditions.length > 1) && (
                                                    <button
                                                        onClick={() => handleRemoveCondition(deviceIndex, groupIndex, conditionIndex)}
                                                        className="p-3 text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <div className="flex gap-2 animate-fadeInScale" style={{ "--delay": "0.3s" }}>
                                <button
                                    onClick={() => handleAddCondition(deviceIndex, "and")}
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#2B2B2B] rounded-lg transition-all duration-300 hover:bg-[#323232] hover:-translate-y-1"
                                >
                                    + And
                                </button>
                                <button
                                    onClick={() => handleAddCondition(deviceIndex, "or")}
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#2B2B2B] rounded-lg transition-all duration-300 hover:bg-[#323232] hover:-translate-y-1"
                                >
                                    + Or
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between border-t border-[#2B2B2B] pt-4 p-6">
                    <button
                        onClick={onBack}
                        className="px-8 py-4 text-gray-400 text-base font-medium bg-[#1C1C1C] rounded-lg transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
                        style={{
                            width: "45%",
                            fontSize: "16px",
                            padding: "16px"
                        }}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-4 text-base font-medium rounded-lg transition-all duration-300 text-white bg-[#FF4D00] hover:bg-[#FF6A00]"
                        style={{
                            width: "45%",
                            fontSize: "16px",
                            padding: "16px"
                        }}
                    >
                        Add device
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConditionsModal;
