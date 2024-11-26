import { UsersTable } from "./UsersTable.jsx";
import Icons from "./Icons.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Navbar = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
            <Icons.Shield />
          </div>
          <h1 className="lg font-medium dark:text-white">RBAC Dashboard</h1>
        </div>
        <LogoutButton />
      </div>
    </div>

    <div className="container mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Users Details
          </h2>
        </div>
        <UsersTable />
      </div>
    </div>
  </div>
);

export default Navbar;
