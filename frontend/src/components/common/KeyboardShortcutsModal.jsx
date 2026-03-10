// frontend/src/components/common/KeyboardShortcutsModal.jsx

import { FiX, FiCommand } from "react-icons/fi";

/**
 * Modal to display available keyboard shortcuts
 */
export const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      category: "General",
      items: [
        { keys: ["Ctrl", "K"], description: "Open global search" },
        { keys: ["Ctrl", "N"], description: "Create new task" },
        { keys: ["Ctrl", "Shift", "T"], description: "Toggle dark mode" },
        { keys: ["Ctrl", "B"], description: "Toggle sidebar" },
        { keys: ["Ctrl", "/"], description: "Show keyboard shortcuts" },
        { keys: ["Esc"], description: "Close modal/dialog" },
      ],
    },
    {
      category: "Tasks",
      items: [
        { keys: ["Ctrl", "Enter"], description: "Complete task" },
        { keys: ["Ctrl", "E"], description: "Edit task" },
        { keys: ["Ctrl", "D"], description: "Delete task" },
        { keys: ["Ctrl", "S"], description: "Save task" },
      ],
    },
    {
      category: "Navigation",
      items: [
        { keys: ["↑"], description: "Move up" },
        { keys: ["↓"], description: "Move down" },
        { keys: ["Home"], description: "Go to first item" },
        { keys: ["End"], description: "Go to last item" },
        { keys: ["Enter"], description: "Select/Open item" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FiCommand className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Keyboard Shortcuts
              </h2>
              <p className="text-sm text-white/80">
                Speed up your workflow with these shortcuts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {shortcuts.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded"></div>
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, keyIdx) => (
                        <span key={keyIdx} className="flex items-center gap-1">
                          <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
                            {key}
                          </kbd>
                          {keyIdx < item.keys.length - 1 && (
                            <span className="text-gray-400 text-xs">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <p>
              Press{" "}
              <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                Ctrl
              </kbd>{" "}
              +{" "}
              <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                /
              </kbd>{" "}
              to view this help anytime
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
