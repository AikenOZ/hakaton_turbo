import React, { useState } from 'react';
import { MODAL_OVERLAY_STYLES } from '@/utils/modalConstants';
import { SAVE_RULE_PLACEHOLDERS, SAVE_RULE_LABELS, SAVE_RULE_BUTTONS } from '@/utils/saveRuleConstants';

const SaveRuleModal = ({ isOpen, onClose }) => {
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');

  if (!isOpen) return null;

  const saveRuleToJson = () => {
    const ruleData = {
      name: ruleName,
      description: ruleDescription,
      createdAt: new Date().toISOString()
    };

    try {
      const existingRules = JSON.parse(localStorage.getItem('rules')) || [];
      existingRules.push(ruleData);
      localStorage.setItem('rules', JSON.stringify(existingRules));
      alert(`Rule saved: ${ruleName}\nDescription: ${ruleDescription}`);
    } catch (error) {
      console.error('Error saving rule:', error);
      alert('Failed to save rule');
    }
  };

  const downloadJsonFile = () => {
    try {
      const rulesData = JSON.parse(localStorage.getItem('rules')) || [];
      const dataStr = JSON.stringify(rulesData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'storage.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading rules:', error);
      alert('Failed to download rules');
    }
  };

  const handleSave = () => {
    if (ruleName.trim()) {
      saveRuleToJson();
      onClose();
    } else {
      alert('Please provide a rule name.');
    }
  };

  return (
    <div className={MODAL_OVERLAY_STYLES}>
      <div className="bg-[#2B2B2B] p-8 rounded-lg w-[400px]">
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4 text-center font-sans">
          Save Rule
        </h3>
        
        <div className="mb-4">
          <label className="text-[#656565] block mb-2">
            {SAVE_RULE_LABELS.NAME}
          </label>
          <input
            type="text"
            placeholder={SAVE_RULE_PLACEHOLDERS.NAME}
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full bg-[#3A3A3A] text-[#bababa] px-4 py-2 rounded-md mb-4"
          />
          
          <label className="text-[#656565] block mb-2">
            {SAVE_RULE_LABELS.DESCRIPTION}
          </label>
          <textarea
            placeholder={SAVE_RULE_PLACEHOLDERS.DESCRIPTION}
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
            className="w-full bg-[#3A3A3A] text-[#bababa] px-4 py-2 rounded-md"
            rows="4"
          />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onClose}
            className="bg-[#FF4D00] text-white px-6 py-2 rounded-md hover:bg-[#cc3d00] transition-colors"
          >
            {SAVE_RULE_BUTTONS.CANCEL}
          </button>
          <button
            onClick={handleSave}
            className="bg-[#FF6F00] text-white px-6 py-2 rounded-md hover:bg-[#cc5a00] transition-colors"
            disabled={!ruleName.trim()}
          >
            {SAVE_RULE_BUTTONS.CREATE}
          </button>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={downloadJsonFile}
            className="bg-[#FF6F00] text-white px-6 py-2 rounded-md hover:bg-[#cc5a00] transition-colors"
          >
            {SAVE_RULE_BUTTONS.DOWNLOAD}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveRuleModal;