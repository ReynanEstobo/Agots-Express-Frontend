import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = ({ userRole = "Admin" }) => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const navigate = useNavigate();

  const toggleAdminMenu = () => setShowAdminMenu(!showAdminMenu);

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/");
  };

  // Dynamically set title
  const headerTitle =
    userRole === "Staff"
      ? "Agot's Staff"
      : userRole === "Rider"
      ? "Agot's Rider"
      : "Agot's Admin";

  return (
    <header className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
      {/* LEFT SIDE */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight pl-2 drop-shadow-sm">
        {headerTitle}
      </h1>

      {/* RIGHT SIDE PROFILE */}
      <div className="flex items-center gap-6 ml-4 relative">
        <div className="relative">
          <button
            onClick={toggleAdminMenu}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="text-sm">
              <p className="font-semibold">{userRole}</p>
              <p className="text-gray-500">Manager</p>
            </div>
          </button>

          {showAdminMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 text-sm z-20">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-gray-900 w-full transition"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
