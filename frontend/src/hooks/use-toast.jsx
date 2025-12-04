import { X } from "lucide-react";
import { createContext, useContext, useRef, useState } from "react";

const ToastContext = createContext();
const TOAST_REMOVE_DELAY = 3000; // 3 seconds
let toastCount = 0;

function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

// Notification sound (must be in public folder)
const notificationSound = new Audio("/preview.mp3");

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); // only one toast
  const toastTimeout = useRef(null);

  const addToast = (newToast) => {
    const id = genId();
    const toastObj = {
      ...newToast,
      id,
      duration: newToast.duration || TOAST_REMOVE_DELAY,
      isVisible: true,
    };

    // Play sound
    if (newToast.playSound !== false) {
      notificationSound.currentTime = 0;
      notificationSound.play().catch(() => {});
    }

    // Replace any existing toast
    setToast(toastObj);

    // Auto-remove with fade-out
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, isVisible: false } : null));
      setTimeout(() => removeToast(id), 500); // remove after fade-out
    }, toastObj.duration);

    return id;
  };

  const removeToast = (id) => {
    setToast(null);
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
      toastTimeout.current = null;
    }
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      {toast && <ToastContainer toast={toast} removeToast={removeToast} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

const ToastContainer = ({ toast, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      <div
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
    </div>
  );
};
