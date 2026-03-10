// frontend/src/components/common/Skeleton.jsx

/**
 * Reusable skeleton loading components for better UX during data fetching
 */

export const SkeletonCard = ({ count = 1 }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export const SkeletonTaskCard = ({ count = 3 }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-6 mb-4 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24"></div>
      </div>
    </div>
  ));
};

export const SkeletonList = ({ count = 5, height = "h-12" }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${height} rounded-lg mb-2`}
    ></div>
  ));
};

export const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg p-4 mb-2">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-300 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="bg-white dark:bg-gray-800 p-4 mb-1 border-b border-gray-200 dark:border-gray-700"
        >
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-3 bg-gray-300 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonText = ({ lines = 3, className = "" }) => {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-3 bg-gray-300 dark:bg-gray-700 rounded ${
            index === lines - 1 ? "w-2/3" : "w-full"
          }`}
        ></div>
      ))}
    </div>
  );
};

export const SkeletonCircle = ({ size = "w-12 h-12" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${size} rounded-full`}
    ></div>
  );
};

export const SkeletonButton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 h-10 rounded-lg ${className}`}
    ></div>
  );
};

export const SkeletonForm = () => {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
      <div className="h-10 bg-blue-300 dark:bg-blue-700 rounded w-full mt-6"></div>
    </div>
  );
};

export const SkeletonMessageList = ({ count = 6 }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} mb-4 animate-pulse`}
    >
      <div
        className={`max-w-[70%] ${
          index % 2 === 0
            ? "bg-gray-200 dark:bg-gray-700"
            : "bg-blue-200 dark:bg-blue-900"
        } rounded-lg p-3`}
      >
        <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-48 mb-2"></div>
        <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-32"></div>
      </div>
    </div>
  ));
};
