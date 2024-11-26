import { Data } from "../store/Data";
import Icons from "./Icons.jsx";

const LogoutButton = () => {
  const { currentUser, logout } = Data();

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-3 bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <Icons.User />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {currentUser?.name || "User"}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {currentUser?.email}
          </span>
        </div>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
      >
        <Icons.Logout />
        <span className="hidden md:inline">Logout</span>
      </button>
    </div>
  );
};

export default LogoutButton;
