import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Body layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/5 bg-white shadow">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="w-4/5 flex flex-col bg-slate-50">
          <Header />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
};

export default Main;
