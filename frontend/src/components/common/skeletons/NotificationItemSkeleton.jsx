// frontend/src/components/common/skeletons/NotificationItemSkeleton.jsx

/**
 * NotificationItemSkeleton Component
 *
 * Animated skeleton loader for notification items.
 * Displays while notification data is being fetched.
 */
export const NotificationItemSkeleton = () => {
  return (
    <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Icon/Avatar Skeleton */}
      <div className="flex-shrink-0 w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

      {/* Content Skeleton */}
      <div className="flex-1 space-y-2">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Description Skeleton */}
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>

        {/* Timestamp Skeleton */}
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24 mt-2"></div>
      </div>

      {/* Mark as Read Button Skeleton */}
      <div className="flex-shrink-0 w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
    </div>
  );
};

/**
 * NotificationListSkeleton Component
 *
 * Renders multiple notification item skeletons for loading state.
 *
 * @param {Object} props
 * @param {number} props.count - Number of skeleton items to display (default: 5)
 */
export const NotificationListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-0">
      {Array.from({ length: count }).map((_, index) => (
        <NotificationItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default NotificationItemSkeleton;
