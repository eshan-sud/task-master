// frontend/src/components/Dashboard/StatCard.jsx

import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

/**
 * StatCard Component
 *
 * Displays a statistic with an icon, title, value, and optional trend indicator.
 * Used in Analytics/Dashboard to show key metrics at a glance.
 *
 * @param {Object} props
 * @param {string} props.title - The card title (e.g., "Total Tasks")
 * @param {number|string} props.value - The main statistic value
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.iconBgColor - Background color for icon (Tailwind class)
 * @param {string} props.iconColor - Icon color (Tailwind class)
 * @param {number} props.trend - Percentage change (positive or negative)
 * @param {string} props.trendLabel - Label for trend (e.g., "vs last week")
 */
export const StatCard = ({
  title,
  value,
  icon,
  iconBgColor = "bg-blue-100 dark:bg-blue-900/30",
  iconColor = "text-blue-600 dark:text-blue-400",
  trend,
  trendLabel,
}) => {
  const isPositiveTrend = trend >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className={`${iconBgColor} ${iconColor} p-3 rounded-lg`}>
          <div className="text-2xl">{icon}</div>
        </div>

        {/* Trend Indicator */}
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
              isPositiveTrend
                ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            }`}
          >
            {isPositiveTrend ? (
              <FiTrendingUp className="text-lg" />
            ) : (
              <FiTrendingDown className="text-lg" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-4 mb-1">
        {title}
      </h3>

      {/* Value */}
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </p>

      {/* Trend Label */}
      {trendLabel && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {trendLabel}
        </p>
      )}
    </div>
  );
};

export default StatCard;
