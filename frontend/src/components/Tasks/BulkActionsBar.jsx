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
import { IconButton } from "../common/Button";
import { ConfirmDialog } from "../common/ConfirmDialog";

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [showActions, setShowActions] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: "",
    message: "",
  });

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
        setConfirmDialog({
          isOpen: true,
          action: "archive",
          title: "Archive Tasks",
          message: `Are you sure you want to archive ${selectedCount} task(s)?`,
        });
      },
      color: "text-gray-500",
    },
    {
      label: "Delete",
      icon: FiTrash2,
      action: () => {
        setConfirmDialog({
          isOpen: true,
          action: "delete",
          title: "Delete Tasks",
          message: `Are you sure you want to permanently delete ${selectedCount} task(s)? This action cannot be undone.`,
        });
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
            <IconButton
              icon={FiCheck}
              label="Mark as completed"
              variant="success"
              size="sm"
              onClick={() => onBulkAction("update", { status: "completed" })}
            />
            <IconButton
              icon={FiArchive}
              label="Archive"
              variant="ghost"
              size="sm"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  action: "archive",
                  title: "Archive Tasks",
                  message: `Are you sure you want to archive ${selectedCount} task(s)?`,
                });
              }}
            />
            <IconButton
              icon={FiTrash2}
              label="Delete"
              variant="danger"
              size="sm"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  action: "delete",
                  title: "Delete Tasks",
                  message: `Are you sure you want to permanently delete ${selectedCount} task(s)? This action cannot be undone.`,
                });
              }}
            />
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
          <IconButton
            icon={FiX}
            label="Clear selection"
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({
            isOpen: false,
            action: null,
            title: "",
            message: "",
          })
        }
        onConfirm={() => {
          if (confirmDialog.action) {
            onBulkAction(confirmDialog.action);
          }
          setConfirmDialog({
            isOpen: false,
            action: null,
            title: "",
            message: "",
          });
        }}
        title={confirmDialog.title}
        message={confirmDialog.message}
        variant={confirmDialog.action === "delete" ? "danger" : "warning"}
      />
    </div>
  );
};

export default BulkActionsBar;
