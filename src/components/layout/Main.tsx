import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Main = () => {
  return (
    <div>
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 7fr" }}
      >
        <div>
          <Sidebar />
        </div>
        <div className="bg-slate-50">
          <Header />
          <div className="m-2 p-2">

            
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
