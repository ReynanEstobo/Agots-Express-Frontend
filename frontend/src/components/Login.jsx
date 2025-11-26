import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#323C4D] to-[#0F2247] px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-yellow-400 rounded-full p-3 sm:p-4">
            {/* Logo SVG */}
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-900">Agot's Express</h1>
        <p className="text-center text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Authentic Filipino Cuisine</p>

        {/* Tabs */}
        <div className="flex justify-center mb-4 sm:mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base ${activeTab === "login" ? "border-b-2 border-yellow-400 text-gray-900" : "text-gray-400"}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`px-3 sm:px-4 py-2 font-medium text-sm sm:text-base ${activeTab === "signup" ? "border-b-2 border-yellow-400 text-gray-900" : "text-gray-400"}`}
          >
            Sign Up
          </button>
        </div>

        {/* Sliding Forms */}
        <div className="overflow-hidden">
          <div className={`flex transition-transform duration-500 ${activeTab === "login" ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="w-full flex-shrink-0">
              <LoginForm loginEmail={loginEmail} setLoginEmail={setLoginEmail} loginPassword={loginPassword} setLoginPassword={setLoginPassword} />
            </div>
            <div className="w-full flex-shrink-0">
              <SignupForm
                signupName={signupName} setSignupName={setSignupName}
                signupEmail={signupEmail} setSignupEmail={setSignupEmail}
                signupPhone={signupPhone} setSignupPhone={setSignupPhone}
                signupUsername={signupUsername} setSignupUsername={setSignupUsername}
                signupPassword={signupPassword} setSignupPassword={setSignupPassword}
                signupConfirmPassword={signupConfirmPassword} setSignupConfirmPassword={setSignupConfirmPassword}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <a href="/" className="text-gray-700 hover:text-gray-900 text-sm">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
