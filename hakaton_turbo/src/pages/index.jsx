import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/ui/AnimatedPage';
import birdIcon from '@/assets/Vector.svg';

const IndexPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1E1E1E] h-screen overflow-hidden">
      {/* Навбар вне AnimatedPage */}
      <div className="px-8 py-6 bg-[#2B2B2B] flex justify-between items-center border-b border-[#3A3A3A]">
        <h1 className="text-[#F5F5F5] text-2xl font-light tracking-wide">
          Rules Engine
        </h1>
        <button
          onClick={() => navigate('/add-rule')}
          className="bg-[#FF4D00] hover:bg-[#cc3d00] text-white px-6 py-2.5 rounded-lg flex items-center transition-colors duration-200"
        >
          <span className="text-2xl font-normal leading-none translate-y-[-2px] mr-3">+</span>
          <span className="font-normal text-[15px]">Add Rule</span>
        </button>
      </div>

      {/* AnimatedPage оборачивает только основной контент */}
      <AnimatedPage>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-82px)] text-[#808080]">
          <img src={birdIcon} alt="Empty state" className="w-14 h-14 mb-5 object-contain opacity-70" />
          <p className="mb-2 text-[15px] font-extralight">
            You have not added any rules
          </p>
          <p className="text-sm opacity-80 font-light">
            To create your first rule, click the "Add Rule" button
          </p>
        </div>
      </AnimatedPage>
    </div>
  );
};

export default IndexPage;
