import { Outlet } from "react-router-dom";
import zawaLogo from "../../assets/image/zawa-logo.png";


const AuthDashboard = () => {
  return (
    <div>
      <div className="bg-slate-400 text-white text-lg font-semibold py-2 px-4">
        Zanzibar Water Authority
      </div>
      <div className="grid grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center bg-blue-100 h-full">
          <img src={zawaLogo} alt="ZAWA Logo" className="w-100 h-60" />
        </div>
        <div className="bg-white h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};



export default AuthDashboard;
