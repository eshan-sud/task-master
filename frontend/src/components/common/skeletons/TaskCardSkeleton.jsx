// frontend/src/components/common/skeletons/TaskCardSkeleton.jsx

/**
 * TaskCardSkeleton Component
 *
 * Animated skeleton loader for task cards. Displays while task data is being fetched.
 * Supports both grid and list view layouts via viewMode prop.
 *
 * @param {Object} props
 * @param {string} props.viewMode - 'grid' or 'list' layout mode
 */
export const TaskCardSkeleton = ({ viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-gray-300 dark:border-gray-600 animate-pulse">
        {/* Status Circle Skeleton */}
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        {/* Task Content Skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>

        {/* Task Info Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Action Icons Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Grid view skeleton
  return (
    <div className="group relative p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow animate-pulse">
      {/* Priority Badge Skeleton */}
      <div className="absolute top-4 right-4 w-16 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>

      {/* Task Title Skeleton */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
      </div>

      {/* Category Badge Skeleton */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>

      {/* Footer with Icons */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
