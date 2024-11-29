import React from 'react';

const ActionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()} // Остановка всплытия клика
            >
                <h3 className="modal-title">Complete Actions</h3>
                <p className="modal-subtitle">Add actions for your rule.</p>
                {/* Добавьте контент для действий */}
                <button className="btn-close" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ActionModal;
