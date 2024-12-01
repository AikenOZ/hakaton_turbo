import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Import components
import DeviceModal from '@/components/Modals/DeviceModal';
import ActionModal from '@/components/Modals/ActionModal';
import SaveRuleModal from '@/components/Modals/SaveRuleModal';
import LogicModal from '@/components/Modals/LogicModal';

// Import assets and data
import deviceNotif from '@/assets/Device Notif.svg';
import actionButton from '@/assets/actionbutton.svg';
import triggerIcon from '@/assets/Trigger Alert.svg';
import editIcon from '@/assets/Edit.svg';
import deleteIcon from '@/assets/Trash Delete.svg';
import storageData from '@/utils/storage.json';
import canvasData from '@/pages/canvas.json';

const menuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
};

const menuItemVariants = {
  hover: {
    scale: 1.02,
    backgroundColor: 'rgba(75, 75, 75, 0.8)',
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};


// Animation variants
const LEFT_BUTTON_VARIANTS = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
  whileHover: { 
    scale: 1.1,
    rotate: -10,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

const RIGHT_BUTTON_VARIANTS = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
  whileHover: { 
    scale: 1.1,
    rotate: 10,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

const BOTTOM_BUTTON_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  }
};

const pageVariants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
  }
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut"
};

const hideWatermark = `
  .react-flow__attribution {
    display: none !important;
  }
  .react-flow__controls {
    display: none !important;
  }
`;

function Canvas() {
  const navigate = useNavigate();
  const { ruleId } = useParams();
  const navControls = useAnimation();
  const [openNodeMenuId, setOpenNodeMenuId] = useState(null);

  const getInitialFlowData = () => {
    // Преобразование данных условий в текст
    const getConditionsText = (conditions, logic = 'or') => {
      return conditions.map((condition, idx) => (
        <React.Fragment key={idx}>
          <div>{`${condition.field} ${condition.operator} ${condition.value}`}</div>
          {idx < conditions.length - 1 && (
            <div className="text-gray-400">{logic}</div>
          )}
        </React.Fragment>
      ));
    };
  
    // Создание узла устройства
    const createDeviceNode = (data) => ({
      id: 'device-1',
      type: 'default',
      position: { x: 250, y: 200 },
      data: {
        label: (
          <div className="text-left p-2 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-gray-600 rounded-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="font-medium text-[15px]">{data.label}</div>
                <div className="text-sm text-gray-400">{data.type}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm">If:</div>
              <div className="text-sm space-y-1">
                {getConditionsText(data.conditions)}
              </div>
            </div>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="6" r="1"/>
                <circle cx="12" cy="18" r="1"/>
              </svg>
            </button>
          </div>
        ),
      },
      style: {
        background: '#2B2B2B',
        color: '#F5F5F5',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        padding: '12px',
        minWidth: '280px',
      },
    });
  
    // Создание узла действия
    const createActionNode = (data) => ({
  id: 'action-1',
  type: 'default',
  position: { x: 700, y: 200 },
  data: {
    label: (
      <div className="text-left p-2 relative">
        <div className="font-medium text-[15px] mb-2">{data.label}</div>
        <div className="text-sm text-gray-400">{data.recipient}</div>
        <button 
          id={`burger-action-1`}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            setOpenNodeMenuId(openNodeMenuId === 'action-1' ? null : 'action-1');
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="6" r="1"/>
            <circle cx="12" cy="18" r="1"/>
          </svg>
        </button>
        <AnimatePresence>
          {openNodeMenuId === 'action-1' && <NodeBurgerMenu nodeId="action-1" />}
        </AnimatePresence>
      </div>
    ),
  },
  style: {
    background: '#2B2B2B',
    color: '#F5F5F5',
    border: 'none',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '12px',
    minWidth: '240px',
  },
});

if (ruleId) {
  const rule = storageData.user.rules.find(r => r.id === ruleId);
  if (rule) {
    return {
      nodes: [
        createDeviceNode({
          label: rule.connectedDevices[0],
          type: rule.connectedDevices[1],
          conditions: rule.conditions || []
        }),
        createActionNode({
          label: 'Send e-mail to',
          recipient: rule.email || 'email@example.com',
          type: 'email'
        })
      ],
      edges: [{
        id: 'e1-2',
        source: 'device-1',
        target: 'action-1',
        animated: true,
        style: { stroke: '#00FF00' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#00FF00',
        },
        label: 'then',
        labelStyle: { fill: '#F5F5F5', fontFamily: 'sans-serif' },
        labelBgStyle: { fill: 'transparent' },
        type: 'smoothstep'
      }]
    };
  }
}

// Дефолтное состояние для нового правила
const defaultDeviceData = {
  label: 'DeviceName',
  type: 'Weather Station',
  conditions: [
    { field: 'Temp', operator: '>', value: '0°C' },
    { field: 'Humidity', operator: '>', value: '18%' }
  ]
};

const defaultActionData = {
  label: 'Send e-mail to',
  recipient: 'address@gmail.com',
  type: 'email'
};

return {
  nodes: [
    createDeviceNode(defaultDeviceData),
    createActionNode(defaultActionData)
  ],
  edges: [{
    id: 'e1-2',
    source: 'device-1',
    target: 'action-1',
    animated: true,
    style: { stroke: '#00FF00' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#00FF00',
    },
    label: 'then',
    labelStyle: { fill: '#F5F5F5', fontFamily: 'sans-serif' },
    labelBgStyle: { fill: 'transparent' },
    type: 'smoothstep'
  }]
};
  };

  const flowData = getInitialFlowData();
  const [nodes, setNodes, onNodesChange] = useNodesState(flowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowData.edges);
  const [currentRule, setCurrentRule] = useState(null);

  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const imagesToLoad = 2;

  // Modal states
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isSaveRuleModalOpen, setSaveRuleModalOpen] = useState(false);
  const [isLogicModalOpen, setLogicModalOpen] = useState(false);

  const NodeBurgerMenu = ({ nodeId }) => (
    <motion.div
      id={`menu-${nodeId}`}
      className="fixed transform translate-x-[calc(100%-270px)] translate-y-[-20px] w-52 bg-[#2B2B2B]/90 rounded-lg shadow-lg text-white backdrop-blur-sm"
      style={{ zIndex: 9999 }}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col py-2">
        <motion.li
          className="flex items-center px-4 py-3 cursor-pointer"
          variants={menuItemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img src={triggerIcon} alt="Trigger" className="w-5 h-5 mr-3" />
          <span className="text-sm leading-tight text-left">Trigger</span>
        </motion.li>
        
        <motion.li
          className="flex items-center px-4 py-3 cursor-pointer"
          variants={menuItemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img src={editIcon} alt="Edit" className="w-5 h-5 mr-3" />
          <span className="text-sm leading-tight text-left">Edit</span>
        </motion.li>
        
        <motion.li
          className="flex items-center px-4 py-3 cursor-pointer"
          variants={menuItemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img src={deleteIcon} alt="Delete" className="w-5 h-5 mr-3" />
          <span className="text-sm leading-tight text-left">Delete</span>
        </motion.li>
      </ul>
    </motion.div>
  );

  useEffect(() => {
    if (ruleId) {
      const rule = storageData.user.rules.find(r => r.id === ruleId);
      setCurrentRule(rule);
    }

    const style = document.createElement('style');
    style.textContent = hideWatermark;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [ruleId]);

  useEffect(() => {
    navControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  }, [navControls]);

  useEffect(() => {
    const anyModalOpen = isDeviceModalOpen || isActionModalOpen || isSaveRuleModalOpen || isLogicModalOpen;
    setIsAnyModalOpen(anyModalOpen);
  }, [isDeviceModalOpen, isActionModalOpen, isSaveRuleModalOpen, isLogicModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openNodeMenuId !== null) {
        const menuElement = document.getElementById(`menu-${openNodeMenuId}`);
        const burgerButton = document.getElementById(`burger-${openNodeMenuId}`);
        
        if (menuElement && !menuElement.contains(event.target) && 
            burgerButton && !burgerButton.contains(event.target)) {
          setOpenNodeMenuId(null);
        }
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openNodeMenuId]);

  const handleBackClick = async () => {
    setIsExiting(true);
    await navControls.start({
      y: -20,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    });
  };

  const handleImageLoad = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  const handleModalOpen = (setModalState) => {
    setModalState(true);
  };

  const handleModalClose = (setModalState) => {
    setModalState(false);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#FF4D00' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#FF4D00',
      },
      label: 'then',
      labelStyle: { fill: '#F5F5F5', fontFamily: 'sans-serif' },
      labelBgStyle: { fill: 'transparent' },
    }, eds)),
    [setEdges]
  );

  const handleSaveRule = (formData) => {
    const updatedRule = currentRule ? {
      ...currentRule,
      ...formData
    } : {
      id: `rule-${Date.now()}`,
      ...formData,
      status: 'active'
    };

    console.log('Saving rule:', updatedRule);
    handleModalClose(setSaveRuleModalOpen);
    navigate('/');
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="bg-[#1E1E1E] min-h-screen font-sans"
        variants={pageVariants}
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        exit="exit"
        transition={pageTransition}
        onAnimationComplete={() => isExiting && navigate('/')}
      >
        <div className="relative border-b border-white/50">
          <motion.div
            className="px-6 py-6 bg-transparent flex justify-between items-center"
            initial={{ y: -20, opacity: 0 }}
            animate={navControls}
          >
            <motion.button
              onClick={handleBackClick}
              className="flex items-center gap-4 text-[#F5F5F5] text-2xl font-light tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-[#F5F5F5] text-xl">←</span>
              <span>New Rule</span>
            </motion.button>
            <motion.button
              className="bg-[#FF4D00] text-white px-6 py-2.5 rounded-lg text-[15px] font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModalOpen(setSaveRuleModalOpen)}
            >
              Save Rule
            </motion.button>
          </motion.div>
        </div>

        <div style={{ width: '100%', height: 'calc(100vh - 85px)' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#808080" gap={16} size={1} />
          </ReactFlow>
        </div>

        {/* Bottom Buttons */}
        <AnimatePresence mode="wait">
          {!isAnyModalOpen && (
            <motion.div
              className="fixed bottom-5 left-0 right-0 flex items-center justify-center w-full h-[80px] px-4"
              style={{ zIndex: 1000 }}
              variants={BOTTOM_BUTTON_CONTAINER_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center justify-between w-[120px]">
                <motion.div
                  className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
                  onClick={() => handleModalOpen(setDeviceModalOpen)}
                  variants={LEFT_BUTTON_VARIANTS}
                  whileHover="whileHover"
                  whileTap="whileTap"
                >
                  <img
                    src={deviceNotif}
                    alt="Device Icon"
                    className="w-[52px] h-[52px]"
                    onLoad={handleImageLoad}
                  />
                </motion.div>

                <motion.div
                  className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
                  onClick={() => handleModalOpen(setActionModalOpen)}
                  variants={RIGHT_BUTTON_VARIANTS}
                  whileHover="whileHover"
                  whileTap="whileTap"
                >
                  <img
                    src={actionButton}
                    alt="Action Icon"
                    className="w-[52px] h-[52px]"
                    onLoad={handleImageLoad}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal components */}
        <DeviceModal 
          isOpen={isDeviceModalOpen} 
          onClose={() => handleModalClose(setDeviceModalOpen)}
          currentRule={currentRule}
        />
        <ActionModal 
          isOpen={isActionModalOpen} 
          onClose={() => handleModalClose(setActionModalOpen)}
          currentRule={currentRule}
        />
        <SaveRuleModal 
          isOpen={isSaveRuleModalOpen} 
          onClose={() => handleModalClose(setSaveRuleModalOpen)}
          onSave={handleSaveRule}
          currentRule={currentRule}
        />
        <LogicModal 
          isOpen={isLogicModalOpen} 
          onClose={() => handleModalClose(setLogicModalOpen)}
          currentRule={currentRule}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default Canvas;