import { useState } from "react";

const SignupForm = ({
  signupName,
  setSignupName,
  signupEmail,
  setSignupEmail,
  signupPhone,
  setSignupPhone,
  signupUsername,
  setSignupUsername,
  signupPassword,
  setSignupPassword,
  signupConfirmPassword,
  setSignupConfirmPassword,
  handleSignup, // passed from Login.jsx
}) => {
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] =
    useState(false);

  return (
    <form onSubmit={handleSignup}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Full Name:
          </label>
          <input
            type="text"
            placeholder="Juan Dela Cruz"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Email:
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Phone Number:
          </label>
          <input
            type="tel"
            placeholder="+63 912 345 6789"
            value={signupPhone}
            onChange={(e) => setSignupPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Username:
          </label>
          <input
            type="text"
            placeholder="yourusername"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Password:
          </label>
          <input
            type={showSignupPassword ? "text" : "password"}
            placeholder="********"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
            required
          />
          <button
            type="button"
            onClick={() => setShowSignupPassword(!showSignupPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
          >
            {showSignupPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Confirm Password:
          </label>
          <input
            type={showSignupConfirmPassword ? "text" : "password"}
            placeholder="********"
            value={signupConfirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
            required
          />
          <button
            type="button"
            onClick={() =>
              setShowSignupConfirmPassword(!showSignupConfirmPassword)
            }
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
          >
            {showSignupConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base mt-4"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
