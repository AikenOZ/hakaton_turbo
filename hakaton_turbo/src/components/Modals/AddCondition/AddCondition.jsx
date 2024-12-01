import React from 'react';
import Modal from 'react-modal';
import './AddCondition.css'; // Подключите стили

Modal.setAppElement('#root');

const AddCondition = ({ isOpen, onClose, selectedDevices }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
        >
            <h2 className="modal-title">Add conditions to the device</h2>
            <div className="modal-content">
                <h3>Select the conditions under which the trigger should occur:</h3>
                <div className="action-container">
                    {selectedDevices.map((device, index) => (
                        <div key={index} className="action">
                            {device} {/* Здесь можно добавить иконку устройства */}
                        </div>
                    ))}
                </div>
                <div className="measurement">
                    <select>
                        <option>Temperature</option>
                    </select>
                    <input type="number" placeholder="0" />
                    <select>
                        <option>Greater than</option>
                    </select>
                </div>
                <div className="modal-buttons">
                    <button onClick={onClose}>Back</button>
                    <button onClick={onClose} className="add-button">
                        Add device
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AddCondition;