import React from 'react';
import { motion } from 'framer-motion';
import {
  BOTTOM_BUTTON_CONTAINER_VARIANTS,
  LEFT_BUTTON_VARIANTS,
  RIGHT_BUTTON_VARIANTS,
} from '@/utils/modalConstants';

const deviceIconSvg = "data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='48'%20height='48'%20rx='8'%20fill='%23353535'/%3e%3cg%20clip-path='url(%23clip0_26_760)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M20.5%2012C20.7761%2012%2021%2012.2239%2021%2012.5V15H27V12.5C27%2012.2239%2027.2239%2012%2027.5%2012C27.7761%2012%2028%2012.2239%2028%2012.5V15H29.2619C31.3264%2015%2033%2016.6736%2033%2018.7381V20H35.5C35.7761%2020%2036%2020.2239%2036%2020.5C36%2020.7761%2035.7761%2021%2035.5%2021H33V27H35.5C35.7761%2027%2036%2027.2239%2036%2027.5C36%2027.7761%2035.7761%2028%2035.5%2028H33V29.2619C33%2031.3264%2031.3264%2033%2029.2619%2033H28V35.5C28%2035.7761%2027.7761%2036%2027.5%2036C27.2239%2036%2027%2035.7761%2027%2035.5V33H21V35.5C21%2035.7761%2020.7761%2036%2020.5%2036C20.2239%2036%2020%2035.7761%2020%2035.5V33H18.7381C16.6736%2033%2015%2031.3264%2015%2029.2619V28H12.5C12.2239%2028%2012%2027.7761%2012%2027.5C12%2027.2239%2012.2239%2027%2012.5%2027H15V21H12.5C12.2239%2021%2012%2020.7761%2012%2020.5C12%2020.2239%2012.2239%2020%2012.5%2020H15V18.7381C15%2016.6736%2016.6736%2015%2018.7381%2015H20V12.5C20%2012.2239%2020.2239%2012%2020.5%2012ZM16%2027.5V29.2619C16%2030.7741%2017.2259%2032%2018.7381%2032H20.5H27.5H29.2619C30.7741%2032%2032%2030.7741%2032%2029.2619V27.5V20.5V18.7381C32%2017.2259%2030.7741%2016%2029.2619%2016H27.5H20.5H18.7381C17.2259%2016%2016%2017.2259%2016%2018.7381V20.5V27.5Z'%20fill='%23BABABA'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_26_760'%3e%3crect%20width='24'%20height='24'%20fill='white'%20transform='translate(12%2012)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const actionIconSvg = "data:image/svg+xml,%3csvg%20width='185'%20height='185'%20viewBox='0%200%20185%20185'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='185'%20height='185'%20rx='32'%20fill='%23353535'/%3e%3cpath%20d='M129.5%2090C129.5%20105.727%20112.682%20119.5%2090.5%20119.5C68.3177%20119.5%2051.5%20105.727%2051.5%2090C51.5%2074.273%2068.3177%2060.5%2090.5%2060.5C112.682%2060.5%20129.5%2074.273%20129.5%2090Z'%20stroke='%23BABABA'%20stroke-width='5'/%3e%3c/svg%3e";

function BottomButtons({ bottomButtonsControls, onDeviceClick, onActionClick, handleImageLoad }) {
  return (
    <motion.div
      className="flex items-center justify-center w-full h-[80px] px-4"
      style={{
        position: 'fixed',
        bottom: '20px',
        zIndex: 1000
      }}
      variants={BOTTOM_BUTTON_CONTAINER_VARIANTS}
      initial="hidden"
      animate={bottomButtonsControls}
    >
      <div className="flex items-center justify-between w-[120px]">
        <motion.div
          className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
          onClick={onDeviceClick}
          variants={LEFT_BUTTON_VARIANTS}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <img
            src={deviceIconSvg}
            alt="Device Icon"
            className="w-[52px] h-[52px]"
            onLoad={handleImageLoad}
          />
        </motion.div>

        <motion.div
          className="flex items-center justify-center w-[60px] h-[60px] cursor-pointer"
          onClick={onActionClick}
          variants={RIGHT_BUTTON_VARIANTS}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <img
            src={actionIconSvg}
            alt="Action Icon"
            className="w-[52px] h-[52px]"
            onLoad={handleImageLoad}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BottomButtons;