import { useState } from "react";

const Login = () => {
  const [role, setRole] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log({ role, email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#323C4D] to-[#0F2247]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-400 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.38 0 2.5 1.12 2.5 2.5S13.38 13 12 13s-2.5-1.12-2.5-2.5S10.62 8 12 8zM12 13v8m0-8H8m4 0h4"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Agot's Express
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Authentic Filipino Cuisine
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 border-b border-gray-200">
          <button className="px-4 py-2 font-medium border-b-2 border-yellow-400 text-gray-900">
            Login
          </button>
          <button className="px-4 py-2 text-gray-400">Sign Up</button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-gray-700 mb-1">Username:</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Password input with toggle */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 pr-10" // Added pr-10 for icon space
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6" // Positioned at top for label offset
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {showPassword ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                )}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2"
          >
            <span>Login</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>

        {/* Back to home */}
        <div className="text-center mt-4">
          <a href="/" className="text-gray-700 hover:text-gray-900 text-sm">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
