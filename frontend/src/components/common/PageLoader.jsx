// frontend/src/components/common/PageLoader.jsx

/**
 * PageLoader Component
 *
 * Fallback component displayed while lazy-loaded pages are loading.
 * Shows a centered loading spinner with smooth animations.
 */
export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
