import { useState } from "react";
import { Link } from "react-router-dom";
import { AccountCircle, Lock, Logout } from "@mui/icons-material";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gray-200 p-4 fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="relative flex items-center justify-center">
        {/* Centered ZACORE Title */}
        <h1 className="text-3xl font-bold tracking-widest text-blue-800 drop-shadow-sm absolute left-1/2 transform -translate-x-1/2">
          ZACORE
        </h1>

        {/* User Icon Menu on Right */}
        <div className="ml-auto">
          <AccountCircle
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-700 hover:text-blue-600 cursor-pointer"
            fontSize="large"
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow w-48 text-sm z-50">
              <Link
                to="/change-password"
                className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                <Lock className="mr-2" /> Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                <Logout className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
