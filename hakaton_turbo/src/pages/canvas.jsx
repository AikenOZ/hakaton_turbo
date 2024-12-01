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
import { defaultEdgeStyles, edgeVariants } from './line';
import 'reactflow/dist/style.css';

// Import components
import DeviceModal from '@/components/Modals/DeviceModal';
import ActionModal from '@/components/Modals/ActionModal';
import SaveRuleModal from '@/components/Modals/SaveRuleModal';
import LogicModal from '@/components/Modals/LogicModal';

// Import assets 
import deviceNotif from '@/assets/Device Notif.svg';
import actionButton from '@/assets/actionbutton.svg';
import triggerIcon from '@/assets/Trigger Alert.svg';
import editIcon from '@/assets/Edit.svg';
import deleteIcon from '@/assets/Trash Delete.svg';

// Import styles
import {
  menuVariants,
  menuItemVariants,
  LEFT_BUTTON_VARIANTS,
  RIGHT_BUTTON_VARIANTS,
  BOTTOM_BUTTON_CONTAINER_VARIANTS,
  pageVariants,
  pageTransition,
  hideWatermark,
  nodeStyles,
  edgeStyles
} from './styles';

const defaultCanvasData = {
  defaultNodes: {
    device: {
      defaultPosition: { x: 250, y: 200 },
      defaultData: {
        label: "DeviceName",
        type: "Weather Station",
        conditions: [
          { field: "Temperature", operator: ">", value: "0°C" },
          { field: "Humidity", operator: ">", value: "18%" }
        ]
      },
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
      defaultData: {
        label: "Send e-mail to",
        recipient: "address@gmail.com",
        type: "email"
      },
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
      {[
        { icon: triggerIcon, text: 'Trigger' },
        { icon: editIcon, text: 'Edit' },
        { icon: deleteIcon, text: 'Delete' }
      ].map(({ icon, text }) => (
        <motion.li
          key={text}
          className="flex items-center px-4 py-3 cursor-pointer"
          variants={menuItemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img src={icon} alt={text} className="w-5 h-5 mr-3" />
          <span className="text-sm leading-tight text-left">{text}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

function Canvas() {
  const navigate = useNavigate();
  const { ruleId } = useParams();
  const navControls = useAnimation();
  const [openNodeMenuId, setOpenNodeMenuId] = useState(null);
  
  // Flow states
  const [currentRule, setCurrentRule] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [canvasData, setCanvasData] = useState(defaultCanvasData);
  
  // Modal states
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isSaveRuleModalOpen, setSaveRuleModalOpen] = useState(false);
  const [isLogicModalOpen, setLogicModalOpen] = useState(false);

  // Load canvas data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('canvasData');
    if (storedData) {
      setCanvasData(JSON.parse(storedData));
    } else {
      localStorage.setItem('canvasData', JSON.stringify(defaultCanvasData));
    }
  }, []);

  const getInitialFlowData = () => {
    const getConditionsText = (conditions, logic = 'or') => (
      conditions.map((condition, idx) => (
        <React.Fragment key={idx}>
          <div>{`${condition.field} ${condition.operator} ${condition.value}`}</div>
          {idx < conditions.length - 1 && (
            <div className="text-gray-400">{logic}</div>
          )}
        </React.Fragment>
      ))
    );
  
    const createDeviceNode = (deviceData) => ({
      id: 'device-1',
      type: 'default',
      position: canvasData.defaultNodes.device.defaultPosition,
      data: {
        label: (
          <div className="text-left p-2 relative">
            <div className="flex items-center gap-3 mb-4">
                <div>
                <div className="font-medium text-[15px]">{deviceData.label}</div>
                <div className="text-sm text-gray-400">{deviceData.type}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm">If:</div>
              <div className="text-sm space-y-1">
                {getConditionsText(deviceData.conditions)}
              </div>
            </div>
          </div>
        ),
      },
      style: canvasData.defaultNodes.device.styles,
    });
    
    const createActionNode = (actionData) => ({
      id: 'action-1',
      type: 'default',
      position: canvasData.defaultNodes.action.defaultPosition,
      data: {
        label: (
          <div className="text-left p-2 relative">
            <div className="font-medium text-[15px] mb-2">{actionData.label}</div>
            <div className="text-sm text-gray-400">{actionData.recipient}</div>
          </div>
        ),
      },
      style: canvasData.defaultNodes.action.styles,
    });
    
    if (ruleId) {
      const rule = canvasData.rules.find(r => r.id === ruleId);
      if (rule) {
        return {
          nodes: [
            createDeviceNode(rule.device),
            createActionNode(rule.action)
          ],
          edges: []
        };
      }
    }
  
    return {
      nodes: [
        createDeviceNode(canvasData.defaultNodes.device.defaultData),
        createActionNode(canvasData.defaultNodes.action.defaultData)
      ],
      edges: []
    };
  };

  const flowData = getInitialFlowData();
  const [nodes, setNodes, onNodesChange] = useNodesState(flowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowData.edges);

  const onEdgeDoubleClick = useCallback((event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, [setEdges]);

  const onConnect = useCallback(
    (params, variant = 'default') => {
      const edgeStyle = variant === 'default' 
        ? defaultEdgeStyles 
        : edgeVariants[variant] || defaultEdgeStyles;
        
      const newEdge = {
        ...params,
        ...edgeStyle,
        id: `edge-${params.source}-${params.target}`,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    if (ruleId && canvasData) {
      const rule = canvasData.rules.find(r => r.id === ruleId);
      setCurrentRule(rule || null);
    }

    const style = document.createElement('style');
    style.textContent = hideWatermark;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [ruleId, canvasData]);

  useEffect(() => {
    navControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  }, [navControls]);

  useEffect(() => {
    setIsAnyModalOpen(isDeviceModalOpen || isActionModalOpen || 
                     isSaveRuleModalOpen || isLogicModalOpen);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openNodeMenuId]);

  const handleBackClick = async () => {
    setIsExiting(true);
    await navControls.start({
      y: -20,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    });
  };

  const handleModalOpen = (setModalState) => setModalState(true);
  const handleModalClose = (setModalState) => setModalState(false);

  const handleSaveRule = (formData) => {
    const updatedRule = currentRule 
      ? { ...currentRule, ...formData }
      : { id: `rule-${Date.now()}`, ...formData, status: 'active' };

    const newCanvasData = { ...canvasData };
    if (currentRule) {
      const ruleIndex = newCanvasData.rules.findIndex(r => r.id === currentRule.id);
      if (ruleIndex !== -1) {
        newCanvasData.rules[ruleIndex] = updatedRule;
      }
    } else {
      newCanvasData.rules.push(updatedRule);
    }

    setCanvasData(newCanvasData);
    localStorage.setItem('canvasData', JSON.stringify(newCanvasData));

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
            onEdgeDoubleClick={onEdgeDoubleClick}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#808080" gap={16} size={1} />
          </ReactFlow>
        </div>

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
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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