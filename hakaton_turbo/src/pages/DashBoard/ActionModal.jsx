import React, { useState } from 'react';

const ActionModal = ({ isOpen, onClose }) => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const renderContent = () => {
        if (!selectedAction) {
            return (
                <div>
                    <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">
                        Select action type
                    </h3>
                    <p className="text-[#808080] text-sm font-light mb-6">
                        Select the action you want to end the rule with.
                    </p>
                    <div className="grid gap-4 mb-4">
                        <button
                            onClick={() => setSelectedAction('email')}
                            className={`flex items-center justify-between px-4 py-2 bg-[#3A3A3A] rounded-lg ${selectedAction === 'email' ? 'border-2 border-orange-500' : ''}`}
                        >
                            <span className="text-[#F5F5F5]">E-mail</span>
                            <span className="text-[#808080] text-sm">
                                Send notifications via e-mail to one or multiple recipients.
                            </span>
                        </button>
                        <button
                            onClick={() => setSelectedAction('sms')}
                            className={`flex items-center justify-between px-4 py-2 bg-[#3A3A3A] rounded-lg ${selectedAction === 'sms' ? 'border-2 border-orange-500' : ''}`}
                        >
                            <span className="text-[#F5F5F5]">SMS</span>
                            <span className="text-[#808080] text-sm">
                                Send notifications via SMS to one or multiple recipients.
                            </span>
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={onClose} className="bg-[#FF4D00] text-white px-6 py-2 rounded">
                            Close
                        </button>
                        <button
                            onClick={() => selectedAction && setSelectedAction(selectedAction)}
                            className={`bg-[#FF6F00] text-white px-6 py-2 rounded ${!selectedAction && 'opacity-50 pointer-events-none'}`}
                        >
                            Add action
                        </button>
                    </div>
                </div>
            );
        }

        if (selectedAction === 'email' || selectedAction === 'sms') {
            const isEmail = selectedAction === 'email';
            return (
                <div>
                    <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">
                        {isEmail ? 'Send E-mail' : 'Send SMS'}
                    </h3>
                    <p className="text-[#808080] text-sm font-light mb-6">
                        {isEmail
                            ? 'Set up your email notification'
                            : 'Select the recipient and set the message text.'}
                    </p>
                    <div className="flex flex-col gap-4 mb-4">
                        <input
                            type="text"
                            placeholder={isEmail ? 'Recipient email' : 'Recipient phone number'}
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
                        />
                        <textarea
                            placeholder={isEmail ? 'Type your email message here' : 'Type your SMS text here'}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-[#3A3A3A] text-[#F5F5F5] px-4 py-2 rounded"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setSelectedAction(null)}
                            className="bg-[#FF4D00] text-white px-6 py-2 rounded"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => {
                                if (recipient && message) {
                                    alert(`Action added: ${selectedAction} to ${recipient}`);
                                    onClose();
                                }
                            }}
                            className={`bg-[#FF6F00] text-white px-6 py-2 rounded ${(!recipient || !message) && 'opacity-50 pointer-events-none'}`}
                        >
                            Save
                        </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#2B2B2B] p-8 rounded-lg w-[600px]">{renderContent()}</div>
        </div>
    );
};

export default ActionModal;
