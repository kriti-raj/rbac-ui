/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Data } from "../store/Data";

// Custom hook for cached localStorage management
const useCachedStorage = (key, getData) => {
  // Get initial data from localStorage or fetch it
  const [data, setData] = useState(() => {
    try {
      const cachedData = window.localStorage.getItem(key);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      console.log("Fetching initial data");
      const initialData = getData();
      window.localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    } catch (error) {
      console.error("Error with data management:", error);
      return [];
    }
  });

  // Update localStorage when data changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, data]);

  return [data, setData];
};

// Modal Component for Role Editing
const EditRoleModal = ({ user, roles, onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = useState(String(user.roleId));
  const [isActive, setIsActive] = useState(user.isActive);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
  };

  const handleSave = () => {
    const updates = {
      roleId: parseInt(selectedRole, 10),
      isActive,
    };
    onSave(updates);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit User Role
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Assign Role
              <span className="ml-2 text-xs text-gray-500">
                (Current:{" "}
                {roles.find((r) => r.id === Number(user.roleId))?.name})
              </span>
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg 
                  px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  hover:border-gray-300 transition-all duration-200 cursor-pointer text-gray-700"
              >
                {roles.map((role) => (
                  <option
                    key={role.id}
                    value={String(role.id)}
                    className="py-2"
                  >
                    {role.name}
                  </option>
                ))}
              </select>

              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Status Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              User Status
            </span>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActive ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this new modal component near the top of the file
const AddUserModal = ({ roles, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleId: roles[0]?.id || "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation (minimum 6 characters)
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    onSave({
      ...formData,
      roleId: Number(formData.roleId),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Active Status
            </span>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                formData.isActive ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function UsersTable() {
  const { currentUser, roles } = Data();
  const [users, setUsers] = useCachedStorage("users", () => {
    const { users: initialUsers } = Data.getState();
    // Sort users initially
    return initialUsers.sort((a, b) => a.name.localeCompare(b.name));
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Get current user's role
  const userRole = roles.find((role) => role.id === currentUser?.roleId);
  const isAdmin = userRole?.name.toLowerCase() === "admin";
  const isModerator = userRole?.name.toLowerCase() === "moderator";

  const canEdit = isAdmin;
  const canDelete = isAdmin;
  const canAddUser = isAdmin || isModerator;

  const handleEditSave = (userId, updates) => {
    const updatedData = {
      ...updates,
      roleId: parseInt(updates.roleId, 10),
    };

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
    setEditingUser(null);
  };

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: crypto.randomUUID(),
    };
    setUsers((currentUsers) => [...currentUsers, newUser]);
    setShowAddModal(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId)
    );
  };

  // Add sorting function
  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header with conditional Add User button */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Users Count
            <span className="ml-2 px-2.5 py-0.5 text-sm bg-blue-50 text-blue-600 rounded-full">
              {users.length} total
            </span>
          </h2>
          {canAddUser && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New User
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
                <span className="ml-1 text-gray-400">↓</span>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {(canEdit || canDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedUsers.map((user) => {
              const userRole = roles.find((role) => role.id === user.roleId);
              const isUserAdmin = userRole?.name.toLowerCase() === "admin";

              return (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        isUserAdmin
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {userRole?.name || "No Role"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  {(canEdit || canDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {canEdit && (
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors duration-200"
                        >
                          Edit Role
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors duration-200"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {editingUser && canEdit && (
        <EditRoleModal
          user={editingUser}
          roles={roles}
          onClose={() => setEditingUser(null)}
          onSave={(updates) => handleEditSave(editingUser.id, updates)}
        />
      )}

      {showAddModal && canAddUser && (
        <AddUserModal
          roles={roles.filter((role) => {
            const roleName = role.name.toLowerCase();
            // Moderators can only add users and moderators
            if (isModerator) {
              return roleName === "user" || roleName === "moderator";
            }
            // Admins can add users with any role
            return true;
          })}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
}
