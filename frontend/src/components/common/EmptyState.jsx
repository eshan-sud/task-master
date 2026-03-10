// frontend/src/components/common/EmptyState.jsx

import {
  FiInbox,
  FiFileText,
  FiUsers,
  FiMessageSquare,
  FiSearch,
  FiFilter,
} from "react-icons/fi";

/**
 * Reusable empty state component for better UX
 */
export const EmptyState = ({
  icon: Icon = FiInbox,
  title,
  description,
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  type = "default",
}) => {
  const iconMap = {
    tasks: FiFileText,
    users: FiUsers,
    messages: FiMessageSquare,
    search: FiSearch,
    filter: FiFilter,
    default: FiInbox,
  };

  const DisplayIcon = Icon || iconMap[type] || FiInbox;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Icon */}
      <div className="w-20 h-20 mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <DisplayIcon className="text-gray-400 dark:text-gray-500" size={40} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">
        {title || "No items found"}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
          {description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {action && (
          <button
            onClick={action}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {actionLabel || "Get Started"}
          </button>
        )}

        {secondaryAction && (
          <button
            onClick={secondaryAction}
            className="px-6 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {secondaryActionLabel || "Learn More"}
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Preset empty states for common scenarios
 */
export const EmptyTasksState = ({ onCreateTask }) => (
  <EmptyState
    type="tasks"
    title="No tasks yet"
    description="Get started by creating your first task. Stay organized and productive!"
    action={onCreateTask}
    actionLabel="Create Task"
  />
);

export const EmptySearchState = ({ searchQuery, onClearSearch }) => (
  <EmptyState
    type="search"
    title="No results found"
    description={`We couldn't find anything matching "${searchQuery}". Try adjusting your search terms.`}
    action={onClearSearch}
    actionLabel="Clear Search"
  />
);

export const EmptyFilterState = ({ onClearFilters }) => (
  <EmptyState
    type="filter"
    title="No items match your filters"
    description="Try adjusting or clearing your filters to see more results."
    action={onClearFilters}
    actionLabel="Clear Filters"
  />
);

export const EmptyMessagesState = ({ onNewChat }) => (
  <EmptyState
    type="messages"
    title="No messages yet"
    description="Start a conversation with your team members to collaborate effectively."
    action={onNewChat}
    actionLabel="New Chat"
  />
);

export const EmptyTeamsState = ({ onCreateTeam }) => (
  <EmptyState
    type="users"
    title="No teams yet"
    description="Create a team to collaborate with others and manage tasks together."
    action={onCreateTeam}
    actionLabel="Create Team"
  />
);

export default EmptyState;
