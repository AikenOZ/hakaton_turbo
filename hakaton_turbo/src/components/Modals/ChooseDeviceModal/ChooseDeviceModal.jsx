import React from 'react';
import Modal from 'react-modal';
import './ChooseDeviceModal.css'; // Подключите стили

Modal.setAppElement('#root');

const ChooseDeviceModal = ({ isOpen, onClose, selectedDevices, onSelectDevice }) => {
    const [isWithAnd, setIsWithAnd] = useState(false);

    const handleSelectDevice = (device) => {
        onSelectDevice(device); // Вызов функции для выбора устройства
        onClose(); // Закрыть модальное окно после выбора
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className={`modal ${isWithAnd ? 'with-and' : ''}`}>
            <h2 className="modal-title">Add conditions to the device</h2>

            <div className="modal-content">
                {!isWithAnd ? (
                    <div className="default-container">
                        <div className="action-container">
                            {selectedDevices.map((device, index) => (
                                <div 
                                    key={index} 
                                    className="action" 
                                    onClick={() => handleSelectDevice(device)}
                                >
                                    {device} {/* Здесь может быть отображение свойств устройства */}
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
                    </div>
                ) : (
                    <div className="and-container">
                        <div className="measurement">
                            <select>
                                <option>Temperature</option>
                            </select>
                            <input type="number" placeholder="0" />
                            <select>
                                <option>Greater than</option>
                            </select>
                        </div>
                        <div className="measurement">
                            <select>
                                <option>Humidity</option>
                            </select>
                            <input type="number" placeholder="0" />
                            <select>
                                <option>Greater than</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="modal-buttons">
                <button onClick={onClose}>Back</button>
                <button onClick={onClose} className="add-button">
                    {isWithAnd ? "Add Device" : "Add Devices"}
                </button>
            </div>
        </Modal>
    );
};

export default ChooseDeviceModal;