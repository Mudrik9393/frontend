import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-200 p-3 pl-6 fixed top-0 right-0 left-0 shadow-lg mb-4 flex items-center justify-between">
      <div className="text-center w-full">This time Tomorrow</div>
      <Link to="/login" className="absolute right-4">
        <AccountCircle className="text-gray-700 hover:text-blue-600 cursor-pointer" fontSize="large" />
      </Link>
    </div>
  );
};

export default Header;
