import { useState } from "react";

const LoginForm = ({
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}) => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ Username: loginEmail, password: loginPassword });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
      <div>
        <label className="block text-gray-700 mb-1 text-sm sm:text-base">
          Username:
        </label>
        <input
          type="text"
          placeholder="Sample01"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
          required
        />
      </div>
      <div className="relative">
        <label className="block text-gray-700 mb-1 text-sm sm:text-base">
          Password:
        </label>
        <input
          type={showLoginPassword ? "text" : "password"}
          placeholder="********"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm sm:text-base"
          required
        />
        <button
          type="button"
          onClick={() => setShowLoginPassword(!showLoginPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 mt-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {showLoginPassword ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-0.584 1.859-2.009 3.43-3.742 4.527"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 9.879a3 3 0 104.242 4.242"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-2.1 0-4.03-.735-5.568-1.948"
                />
              </>
            )}
          </svg>
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
