import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Position,
  Handle
} from 'reactflow';
import { defaultEdgeStyles, edgeVariants } from './line';
import 'reactflow/dist/style.css';
import canvasData from './canvas.json';

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

const nodeHandleStyles = {
  background: '#FF4D00',
  width: 5,
  height: 5,
  borderRadius: '50%',
  border: 'none'
};

const invisibleHandleStyles = {
  background: 'transparent',
  width: 18,
  height: 18,
  border: 'none'
};

const CustomNode = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top */}
      <Handle
        type="target"
        position={Position.Top}
        style={invisibleHandleStyles}
        id="top-target"
      />
      <Handle
        type="source"
        position={Position.Top}
        style={{
          ...nodeHandleStyles,
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.2s',
        }}
        id="top-source"
      />

      {/* Right */}
      <Handle
        type="target"
        position={Position.Right}
        style={invisibleHandleStyles}
        id="right-target"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          ...nodeHandleStyles,
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.2s',
        }}
        id="right-source"
      />

      {/* Bottom */}
      <Handle
        type="target"
        position={Position.Bottom}
        style={invisibleHandleStyles}
        id="bottom-target"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          ...nodeHandleStyles,
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.2s',
        }}
        id="bottom-source"
      />

      {/* Left */}
      <Handle
        type="target"
        position={Position.Left}
        style={invisibleHandleStyles}
        id="left-target"
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{
          ...nodeHandleStyles,
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.2s',
        }}
        id="left-source"
      />

      <div className="bg-[#2B2B2B] rounded-lg">
        {data.label}
      </div>
    </div>
  );
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

  // Modal states
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isSaveRuleModalOpen, setSaveRuleModalOpen] = useState(false);
  const [isLogicModalOpen, setLogicModalOpen] = useState(false);

  // Node types definition
  const nodeTypes = {
    custom: CustomNode,
  };

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
      type: 'custom',
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
      type: 'custom',
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

  const customEdgeStyles = {
    ...defaultEdgeStyles,
    stroke: '#FF4D00',
    strokeWidth: 2,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#FF4D00',
      width: 20,
      height: 20,
    },
  };

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        ...customEdgeStyles,
        animated: true,
        id: `edge-${params.source}-${params.target}-${params.sourceHandle}-${params.targetHandle}`,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const isValidConnection = useCallback((connection) => {
    if (connection.source === connection.target) {
      return false;
    }

    return !edges.some(
      edge =>
        edge.source === connection.source &&
        edge.target === connection.target &&
        edge.sourceHandle === connection.sourceHandle &&
        edge.targetHandle === connection.targetHandle
    );
  }, [edges]);

  useEffect(() => {
    if (ruleId) {
      setCurrentRule(canvasData.rules.find(r => r.id === ruleId));
    }

    const style = document.createElement('style');
    style.textContent = hideWatermark;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [ruleId]);

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
            nodeTypes={nodeTypes}
            isValidConnection={isValidConnection}
            fitView
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={customEdgeStyles}
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