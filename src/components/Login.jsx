import { useState } from "react";
import { Data } from "../store/Data";
import { 
  FiLock, 
  FiAlertCircle, 
  FiEye, 
  FiEyeOff, 
  FiShield,
  FiCheck,
  FiLock as FiLockAlt
} from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const login = Data((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 shadow-lg mb-6">
            <FiLock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Enter your credentials to access the dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm flex items-center">
                <FiAlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <label className="inline-flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="hidden peer"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <FiEye className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                    <span className="absolute -top-8 right-0 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:translate-y-[-1px] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Test Accounts</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {[
                { email: "admin@example.com", password: "admin123" },
                { email: "mod1@example.com", password: "mod123" },
                { email: "user1@example.com", password: "user123" },
              ].map((account, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
                >
                  <span>{account.email}</span>
                  <span className="text-gray-400">{account.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 space-y-2">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <FiLockAlt className="w-4 h-4 text-green-500" />
              <span>SSL Encrypted</span>
            </div>

            <div className="flex items-center gap-1.5">
              <FiShield className="w-4 h-4 text-green-500" />
              <span>Secure Login</span>
            </div>

            <div className="flex items-center gap-1.5">
              <FiCheck className="w-4 h-4 text-green-500" />
              <span>HTTPS Protected</span>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} RBAC System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
