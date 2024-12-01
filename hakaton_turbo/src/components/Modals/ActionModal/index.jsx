import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '../../../assets/email.svg';
import SMSIcon from '../../../assets/sms.svg';

const ACTION_TYPES = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
};

const ACTION_DETAILS = {
  EMAIL: { title: 'Email', description: 'Send an email notification', recipientPlaceholder: 'Enter email address' },
  SMS: { title: 'SMS', description: 'Send an SMS notification', recipientPlaceholder: 'Enter phone number' },
};

const ACTION_ICONS = {
  EMAIL: <img src={EmailIcon} className="w-15 h-15" alt="Email icon" />,
  SMS: <img src={SMSIcon} className="w-15 h-15" alt="SMS icon" />,
};

const ActionModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Инициализация useNavigate
  const [selectedAction, setSelectedAction] = useState(null);
  const [showActionForm, setShowActionForm] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isForward, setIsForward] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setShowActionForm(false);
      setSelectedAction(null);
      setRecipient('');
      setMessage('');
      setIsForward(true);
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleBackClick = () => {
    setIsForward(false);
    setTimeout(() => {
      setShowActionForm(false);
      setRecipient('');
      setMessage('');
      setIsForward(true);
    }, 300);
  };

  const handleSaveAction = () => {
    if (recipient && message) {
      console.log('Saving action:', { type: selectedAction, recipient, message });

      // Редирект на /add-rule/canvas
      navigate('/add-rule/canvas');

      handleClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderActionSelection = () => (
    <div className="p-6 space-y-6">
      <div className="space-y-1 animate-fadeIn">
        <h2 className="text-[#F5F5F5] text-xl font-medium text-center">Select action type</h2>
        <p className="text-gray-400 text-sm text-center">
          Select the action you want to end the rule with.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-3">
        {Object.entries(ACTION_TYPES).map(([key, value], index) => (
          <button
            key={key}
            onClick={() => setSelectedAction(value)}
            className={`group flex items-center gap-4 px-4 py-3 rounded-lg bg-[#2B2B2B] transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#323232] ${
              selectedAction === value
                ? 'ring-2 ring-[#FF4D00] shadow-lg shadow-[#FF4D00]/20'
                : ''
            }`}
            style={{
              '--delay': `${0.1 + index * 0.1}s`,
              width: '90%',
              maxWidth: '600px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '16px',
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#1C1C1C] text-gray-400 group-hover:bg-[#2B2B2B] group-hover:text-white transition-all duration-300">
              {ACTION_ICONS[key]}
            </div>
            <div>
              <h3 className="text-sm font-medium text-white group-hover:text-[#FF4D00]">
                {ACTION_DETAILS[value].title}
              </h3>
              <p className="text-xs text-gray-400 group-hover:text-white">
                {ACTION_DETAILS[value].description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between border-t border-[#2B2B2B] pt-4">
        <button
          onClick={handleClose}
          className="px-8 py-4 text-gray-400 text-base font-medium bg-[#1C1C1C] rounded-lg transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
          style={{
            width: '45%',
            fontSize: '16px',
            padding: '16px',
          }}
        >
          Close
        </button>
        <button
          onClick={() => {
            if (selectedAction) {
              setIsForward(true);
              setShowActionForm(true);
            }
          }}
          className={`px-8 py-4 text-base font-medium rounded-lg transition-all duration-300 ${
            selectedAction
              ? 'text-white bg-[#FF4D00] hover:bg-[#FF6A00]'
              : 'text-gray-400 bg-[#2B2B2B] cursor-not-allowed'
          }`}
          style={{
            width: '45%',
            fontSize: '16px',
            padding: '16px',
          }}
        >
          Add action
        </button>
      </div>
    </div>
  );

  const renderActionForm = () => {
    const actionDetails = ACTION_DETAILS[selectedAction];
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-1 animate-fadeIn">
          <h2 className="text-[#F5F5F5] text-xl font-medium text-center">
            {`Send ${actionDetails.title}`}
          </h2>
          <p className="text-gray-400 text-sm text-center">
            {`Set up your ${actionDetails.title.toLowerCase()} notification`}
          </p>
        </div>

        <div className="space-y-4 animate-slideInRight" style={{ '--delay': '0.1s' }}>
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-400 mb-1">
              Recipient
            </label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-[#2B2B2B] text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]"
              placeholder={actionDetails.recipientPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#2B2B2B] text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D00] h-32"
              placeholder="Enter your message here"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6 animate-slideInLeft" style={{ '--delay': '0.2s' }}>
          <button
            onClick={handleBackClick}
            className="px-8 py-4 text-gray-400 text-base font-medium bg-[#1C1C1C] rounded-lg transition-all duration-300 hover:bg-[#2B2B2B] hover:text-white"
            style={{
              width: '45%',
              fontSize: '16px',
              padding: '16px',
            }}
          >
            Back
          </button>
          <button
            onClick={handleSaveAction}
            className={`px-8 py-4 text-base font-medium rounded-lg transition-all duration-300 ${
              recipient && message
                ? 'text-white bg-[#FF4D00] hover:bg-[#FF6A00]'
                : 'text-gray-400 bg-[#2B2B2B] cursor-not-allowed'
            }`}
            style={{
              width: '45%',
              fontSize: '16px',
              padding: '16px',
            }}
          >
            Save Action
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleOverlayClick}
    >
      <div
        className={`modal-content bg-[#1C1C1C] rounded-xl w-full max-w-md overflow-hidden transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        } ${
          showActionForm 
            ? (isForward ? 'animate-slideInRight' : 'animate-slideOutRight')
            : (isForward ? 'animate-slideInLeft' : 'animate-slideOutLeft')
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ '--delay': '0s' }}
      >
        {showActionForm ? renderActionForm() : renderActionSelection()}
      </div>
    </div>
  );
};

export default ActionModal;
