// frontend/src/components/common/Toast.jsx

import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

/** Enhanced toast notification utilities with custom styling */

const toastConfig = {
  duration: 4000,
  position: "top-right",
  style: {
    borderRadius: "10px",
    padding: "12px 16px",
    maxWidth: "420px",
  },
};

export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      ...toastConfig,
      ...options,
      icon: <FiCheckCircle className="text-green-500" />,
      style: {
        ...toastConfig.style,
        background: "#10b981",
        color: "#fff",
      },
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      ...toastConfig,
      ...options,
      icon: <FiAlertCircle className="text-red-500" />,
      style: {
        ...toastConfig.style,
        background: "#ef4444",
        color: "#fff",
      },
    });
  },

  warning: (message, options = {}) => {
    return toast(message, {
      ...toastConfig,
      ...options,
      icon: <FiAlertTriangle className="text-yellow-500" />,
      style: {
        ...toastConfig.style,
        background: "#f59e0b",
        color: "#fff",
      },
    });
  },

  info: (message, options = {}) => {
    return toast(message, {
      ...toastConfig,
      ...options,
      icon: <FiInfo className="text-blue-500" />,
      style: {
        ...toastConfig.style,
        background: "#3b82f6",
        color: "#fff",
      },
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      ...toastConfig,
      ...options,
    });
  },

  promise: (promise, messages) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || "Loading...",
        success: messages.success || "Success!",
        error: messages.error || "Something went wrong",
      },
      toastConfig,
    );
  },

  custom: (Component, options = {}) => {
    return toast.custom(Component, {
      ...toastConfig,
      ...options,
    });
  },

  dismiss: (toastId) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },
};

/**
 * Themed toast notifications that respect dark mode
 */
export const themedToast = {
  success: (message, isDark = false) => {
    return toast.success(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: isDark ? "#065f46" : "#10b981",
        color: "#fff",
      },
    });
  },

  error: (message, isDark = false) => {
    return toast.error(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: isDark ? "#7f1d1d" : "#ef4444",
        color: "#fff",
      },
    });
  },

  info: (message, isDark = false) => {
    return toast(message, {
      ...toastConfig,
      icon: <FiInfo />,
      style: {
        ...toastConfig.style,
        background: isDark ? "#1e3a8a" : "#3b82f6",
        color: "#fff",
      },
    });
  },
};

/**
 * Action toast with custom buttons
 */
export const actionToast = (message, onAction, actionLabel = "Undo") => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              onAction();
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus:outline-none"
          >
            {actionLabel}
          </button>
        </div>
        <div className="flex items-center pr-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>
    ),
    { duration: 5000 },
  );
};

export default showToast;
