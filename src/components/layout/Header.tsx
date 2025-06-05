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
    <div className="bg-gray-200 p-3 fixed top-0 right-0 left-0 shadow flex justify-between items-center">
      <div className="text-center w-full">This time Tomorrow</div>

      <div className="relative mr-4">
        <AccountCircle
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-700 hover:text-blue-600 cursor-pointer"
          fontSize="large"
        />

        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white rounded shadow w-48 text-sm">
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
  );
}

export default Header;