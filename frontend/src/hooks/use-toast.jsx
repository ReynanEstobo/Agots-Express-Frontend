// use-toast.jsx
import { X } from "lucide-react";
import { createContext, useContext, useRef, useState } from "react";

// Toast context
const ToastContext = createContext();

const TOAST_REMOVE_DELAY = 4000; // 4 seconds
let toastCount = 0;

// Generate unique ID for each toast
function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

// ToastProvider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastTimeouts = useRef({});

  // Add a new toast
  const addToast = (toast) => {
    const id = genId();
    const newToast = {
      ...toast,
      id,
      duration: toast.duration || TOAST_REMOVE_DELAY,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    toastTimeouts.current[id] = setTimeout(
      () => removeToast(id),
      newToast.duration
    );

    return id;
  };

  // Remove a toast manually
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (toastTimeouts.current[id]) {
      clearTimeout(toastTimeouts.current[id]);
      delete toastTimeouts.current[id];
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

// Toast container UI
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-gray-900 text-white rounded-md shadow-md p-4 flex items-start justify-between w-80 animate-slide-in"
        >
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && (
              <div className="text-sm text-gray-200">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-3 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

/* Tailwind Animation (Add to your CSS or Tailwind config)
.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}
@keyframes slideIn {
  0% { opacity: 0; transform: translateX(100%) translateY(-10px); }
  100% { opacity: 1; transform: translateX(0) translateY(0); }
}
*/
