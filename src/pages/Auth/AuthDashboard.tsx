import { Outlet } from "react-router-dom";
import zawaLogo from "../../assets/image/zawa-logo.png";

const AuthDashboard = () => {
  return (
    <div>
      <style>
        {`
          @keyframes earthSpin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }

          .earth-rotate {
            animation: earthSpin 20s linear infinite;
            transform-style: preserve-3d;
            transform-origin: center;
          }

          .perspective {
            perspective: 1200px;
          }
        `}
      </style>

      <div className="bg-slate-400 text-white text-lg font-semibold py-2 px-4">
        Zanzibar Water Authority
      </div>

      <div className="grid grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center bg-blue-100 h-full perspective">
          <img
            src={zawaLogo}
            alt="ZAWA Logo"
            className="earth-rotate w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[400px] max-w-full h-auto"
          />
        </div>
        <div className="bg-white h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthDashboard;
