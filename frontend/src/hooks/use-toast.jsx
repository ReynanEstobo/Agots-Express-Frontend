import { X } from "lucide-react";
import { createContext, useContext, useRef, useState } from "react";

const ToastContext = createContext();
const TOAST_REMOVE_DELAY = 3000; // 3 seconds
let toastCount = 0;

function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

// Notification sound (only for toast popups)
const notificationSound = new Audio("/preview.mp3"); // must be in public folder

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastTimeouts = useRef({});

  const addToast = (toast) => {
    const id = genId();
    const newToast = {
      ...toast,
      id,
      duration: toast.duration || TOAST_REMOVE_DELAY,
      isVisible: true,
    };

    // Play sound only if toast.playSound !== false
    if (toast.playSound !== false) {
      notificationSound.currentTime = 0;
      notificationSound.play().catch(() => {});
    }

    // Show only one toast at a time
    setToasts([newToast]);

    // Auto remove with fade-out
    toastTimeouts.current[id] = setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isVisible: false } : t))
      );
      setTimeout(() => removeToast(id), 500); // remove after fade-out
    }, newToast.duration);

    return id;
  };

  const removeToast = (id) => {
    setToasts([]);
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

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
                     text-gray-900 rounded-lg shadow-lg p-4 flex items-start justify-between w-80 max-w-full
                     border-l-4 border-yellow-600
                     transition-opacity duration-700
                     ${toast.isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex-1">
            {toast.title && (
              <div className="font-semibold text-sm mb-1">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm text-gray-800">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
