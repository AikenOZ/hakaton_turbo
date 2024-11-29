import React from 'react';
import { useNavigate } from 'react-router-dom';

function AddRule() {
   const navigate = useNavigate();

   return (
     <div className="bg-[#1E1E1E] h-screen overflow-hidden">
       <div className="px-8 py-6 bg-[#2B2B2B] flex justify-between items-center border-b border-[#3A3A3A]">
         <button 
           onClick={() => navigate('/')}
           className="text-[#F5F5F5] text-base font-light flex items-center gap-3"
         >
           <span className="text-lg">←</span>
           <span>New Rule</span>
         </button>
         <button className="bg-[#5A392E] text-[#FF4D00] px-6 py-2 rounded-lg text-sm">
           Save Rule
         </button>
       </div>
       
       <div className="flex flex-col items-center justify-center gap-32 h-[calc(100vh-82px)]">
         <div className="flex flex-col items-center text-center">
           <div className="w-14 h-14 border-2 border-[#3A3A3A] rounded flex items-center justify-center mb-5">
             <div className="w-7 h-7 bg-[#3A3A3A]"></div>
           </div>
           <h3 className="text-[#F5F5F5] text-lg font-light mb-2">Choose your device</h3>
           <p className="text-[#808080] text-sm font-extralight max-w-[280px] leading-relaxed">
             Select the device to which you will apply the rule and set the necessary parameters for it
           </p>
         </div>
  
         <div className="flex flex-col items-center text-center">
           <div className="w-14 h-14 border-2 border-[#3A3A3A] rounded-full flex items-center justify-center mb-5">
             <div className="w-7 h-7 bg-[#3A3A3A] rounded-full"></div>
           </div>
           <h3 className="text-[#F5F5F5] text-lg font-light mb-2">Complete with the actions</h3>
           <p className="text-[#808080] text-sm font-extralight max-w-[280px] leading-relaxed">
             Add one or multiple actions to your rule to act based on the result of your logic block
           </p>
         </div>
       </div>
  
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
         <div className="bg-[#1E1E1E] p-2 rounded-lg flex gap-4">
           <div className="w-8 h-8 border-2 border-[#3A3A3A] rounded flex items-center justify-center">
             <div className="w-4 h-4 bg-[#3A3A3A]"></div>
           </div>
           <div className="w-8 h-8 border-2 border-[#3A3A3A] rounded-full flex items-center justify-center">
             <div className="w-4 h-4 bg-[#3A3A3A] rounded-full"></div>
           </div>
         </div>
       </div>
     </div>
   );
}

export default AddRule;