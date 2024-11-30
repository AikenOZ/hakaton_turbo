// modalConstants.js

export const BOTTOM_BUTTON_CONTAINER_VARIANTS = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };
  
  export const LEFT_BUTTON_VARIANTS = {
    hidden: {
      opacity: 0,
      x: -20,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    whileHover: {
      scale: 1.05,
      rotate: -15,
    },
    whileTap: {
      scale: 0.95,
      rotate: -30,
    },
  };
  
  export const RIGHT_BUTTON_VARIANTS = {
    hidden: {
      opacity: 0,
      x: 20,
      rotate: 180,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    whileHover: {
      scale: 1.05,
      rotate: 15,
    },
    whileTap: {
      scale: 0.95,
      rotate: 30,
    },
  };
  
  export const CENTER_CONTAINER_VARIANTS = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  export const LEFT_CENTER_ICON_VARIANTS = {
    hidden: {
      opacity: 0,
      x: -20,
      rotate: 180,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  
  export const RIGHT_CENTER_ICON_VARIANTS = {
    hidden: {
      opacity: 0,
      x: 20,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };