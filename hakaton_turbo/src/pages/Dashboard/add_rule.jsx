import React from 'react';
import { useNavigate } from 'react-router-dom';
import touchBar from '@/assets/touch_bar.svg';
import AnimatedPage from '@/components/ui/AnimatedPage';

function AddRule() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="bg-[#1E1E1E] min-h-screen overflow-hidden">
        <div className="px-8 py-6 bg-[#2B2B2B] flex justify-between items-center border-b border-[#3A3A3A]">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-4"
          >
            <span className="text-[#F5F5F5] text-xl">←</span>
            <span className="text-[#F5F5F5] text-2xl font-light tracking-wide">
              New Rule
            </span>
          </button>
          <button className="bg-[#FF4D00] hover:bg-[#cc3d00] text-white px-6 py-2.5 rounded-lg text-[15px] transition-colors duration-200">
            Save Rule
          </button>
        </div>

        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <div className="flex gap-32">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 border-2 border-[#3A3A3A] rounded flex items-center justify-center mb-5">
                <div className="w-7 h-7 bg-[#3A3A3A]"></div>
              </div>
              <h3 className="text-[#F5F5F5] text-lg font-light mb-2">
                Choose your device
              </h3>
              <p className="text-[#808080] text-sm font-extralight max-w-[280px] leading-relaxed">
                Select the device to which you will apply the rule and set the
                necessary parameters for it
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 border-2 border-[#3A3A3A] rounded-full flex items-center justify-center mb-5">
                <div className="w-7 h-7 bg-[#3A3A3A] rounded-full"></div>
              </div>
              <h3 className="text-[#F5F5F5] text-lg font-light mb-2">
                Complete with the actions
              </h3>
              <p className="text-[#808080] text-sm font-extralight max-w-[280px] leading-relaxed">
                Add one or multiple actions to your rule to act based on the
                result of your logic block
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <img src={touchBar} alt="Touch bar" className="h-16 w-auto" />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default AddRule;
