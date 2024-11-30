import React, { useState } from 'react';
import { MODAL_OVERLAY_STYLES } from '@/utils/modalConstants';
import { ACTION_TYPES, ACTION_DETAILS } from '@/utils/actionConstants';
import { EmailIcon, SMSIcon } from '@/components/Icons/ActionIcons';

const ACTION_ICONS = {
  EMAIL: <EmailIcon />,
  SMS: <SMSIcon />
};

const ActionModal = ({ isOpen, onClose }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSaveAction = () => {
    if (recipient && message) {
      const actionData = {
        type: selectedAction,
        recipient,
        message,
      };

      fetch('http://localhost:5000/save-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actionData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Action saved successfully');
          onClose();
        })
        .catch((error) => {
          console.error('Error saving action:', error);
          alert('Failed to save action');
        });
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderActionSelection = () => (
    <div className="p-6">
      <h2 className="text-[#F5F5F5] text-xl font-medium text-center">Select action type</h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Select the action you want to end the rule with.
      </p>
      
      <div className="space-y-3">
        {Object.entries(ACTION_TYPES).map(([key, value]) => (
          <button 
            key={key}
            onClick={() => setSelectedAction(value)} 
            className="w-full bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-lg p-4 text-left flex items-start gap-4 transition-colors border border-transparent hover:border-gray-700"
          >
            <div className="bg-[#ffffff]">
              <span className="text-gray-400">
                {ACTION_ICONS[key]}
              </span>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">{ACTION_DETAILS[value].title}</h3>
              <p className="text-gray-400 text-sm">{ACTION_DETAILS[value].description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button 
          onClick={onClose} 
          className="flex-1 py-3 text-gray-300 bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-lg transition-colors"
        >
          Close
        </button>
        <button 
          onClick={() => selectedAction && setSelectedAction(selectedAction)} 
          className="flex-1 py-3 bg-[#FF4D00] hover:bg-[#cc3d00] text-white rounded-lg transition-colors"
        >
          Add action
        </button>
      </div>
    </div>
  );

  const renderActionForm = () => {
    const actionDetails = ACTION_DETAILS[selectedAction];
    return (
      <div className="p-6">
        <h2 className="text-[#F5F5F5] text-xl font-medium text-center">
          {`Send ${actionDetails.title}`}
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          {`Set up your ${actionDetails.title.toLowerCase()} notification`}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Recipient</label>
            <input
              type="text"
              placeholder={actionDetails.placeholder.recipient}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-[#2B2B2B] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-gray-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm block mb-2">Message</label>
            <textarea
              placeholder={actionDetails.placeholder.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#2B2B2B] text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-gray-600 focus:outline-none resize-none"
              rows="4"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => setSelectedAction(null)} 
            className="flex-1 py-3 text-gray-300 bg-[#2B2B2B] hover:bg-[#3A3A3A] rounded-lg transition-colors"
          >
            Back
          </button>
          <button 
            onClick={handleSaveAction} 
            className="flex-1 py-3 bg-[#FF4D00] hover:bg-[#cc3d00] text-white rounded-lg transition-colors"
            disabled={!recipient || !message}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={MODAL_OVERLAY_STYLES}>
      <div className="bg-[#1C1C1C] rounded-xl w-[400px] overflow-hidden">
        {selectedAction ? renderActionForm() : renderActionSelection()}
      </div>
    </div>
  );
};

export default ActionModal;