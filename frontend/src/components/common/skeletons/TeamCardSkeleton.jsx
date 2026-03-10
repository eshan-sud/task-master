// frontend/src/components/common/skeletons/TeamCardSkeleton.jsx

/**
 * TeamCardSkeleton Component
 *
 * Animated skeleton loader for team cards.
 * Displays while team data is being fetched.
 */
export const TeamCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 animate-pulse">
      {/* Team Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Team Name Skeleton */}
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

          {/* Team Description Skeleton */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>

        {/* Menu Button Skeleton */}
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Members Section */}
      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>

        {/* Member Avatars */}
        <div className="flex -space-x-2">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-800"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-800"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-800"></div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
            <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-6"></div>
          </div>
        </div>
      </div>

      {/* Footer with Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
        </div>

        {/* Online Status Indicator Skeleton */}
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
      </div>
    </div>
  );
};

/**
 * TeamGridSkeleton Component
 *
 * Renders multiple team card skeletons in a grid layout.
 *
 * @param {Object} props
 * @param {number} props.count - Number of skeleton cards to display (default: 6)
 */
export const TeamGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <TeamCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default TeamCardSkeleton;
