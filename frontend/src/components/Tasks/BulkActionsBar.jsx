// frontend/src/components/Tasks/BulkActionsBar.jsx
import { useState } from "react";
import {
  FiX,
  FiCheck,
  FiArchive,
  FiTrash2,
  FiTag,
  FiStar,
} from "react-icons/fi";

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showActions, setShowActions] = useState(false);

  const actions = [
    {
      label: "Mark as Completed",
      icon: FiCheck,
      action: () => onBulkAction("update", { status: "completed" }),
      color: "text-green-500",
    },
    {
      label: "Mark as In Progress",
      icon: FiCheck,
      action: () => onBulkAction("update", { status: "in-progress" }),
      color: "text-blue-500",
    },
    {
      label: "Set High Priority",
      icon: FiStar,
      action: () => onBulkAction("update", { priority: "high" }),
      color: "text-red-500",
    },
    {
      label: "Set Medium Priority",
      icon: FiStar,
      action: () => onBulkAction("update", { priority: "medium" }),
      color: "text-yellow-500",
    },
    {
      label: "Set Low Priority",
      icon: FiStar,
      action: () => onBulkAction("update", { priority: "low" }),
      color: "text-green-500",
    },
    {
      label: "Archive",
      icon: FiArchive,
      action: () => {
        if (window.confirm(`Archive ${selectedCount} tasks?`)) {
          onBulkAction("archive");
        }
      },
      color: "text-gray-500",
    },
    {
      label: "Delete",
      icon: FiTrash2,
      action: () => {
        if (window.confirm(`Delete ${selectedCount} tasks permanently?`)) {
          onBulkAction("delete");
        }
      },
      color: "text-red-500",
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Selection Count */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedCount} selected
            </span>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBulkAction("update", { status: "completed" })}
              className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-500 transition-colors"
              title="Mark as completed"
            >
              <FiCheck size={18} />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Archive ${selectedCount} tasks?`)) {
                  onBulkAction("archive");
                }
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
              title="Archive"
            >
              <FiArchive size={18} />
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(`Delete ${selectedCount} tasks permanently?`)
                ) {
                  onBulkAction("delete");
                }
              }}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
              title="Delete"
            >
              <FiTrash2 size={18} />
            </button>
          </div>

          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              More Actions
            </button>

            {showActions && (
              <div className="absolute bottom-full mb-2 right-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        action.action();
                        setShowActions(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${action.color}`}
                    >
                      <Icon size={16} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

          {/* Clear Selection */}
          <button
            onClick={onClearSelection}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-colors"
            title="Clear selection"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;
