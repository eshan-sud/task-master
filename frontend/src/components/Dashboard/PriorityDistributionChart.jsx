// frontend/src/components/Dashboard/PriorityDistributionChart.jsx

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * PriorityDistributionChart Component
 *
 * Doughnut chart showing task distribution by priority level.
 * Color-coded: High (red), Medium (yellow), Low (green).
 *
 * @param {Object} props
 * @param {Object} props.data - Object with high, medium, low counts
 * @param {boolean} props.isDarkMode - Whether dark mode is active
 */
export const PriorityDistributionChart = ({
  data = {},
  isDarkMode = false,
}) => {
  const { high = 0, medium = 0, low = 0 } = data;
  const total = high + medium + low;

  const chartData = {
    labels: ["High Priority", "Medium Priority", "Low Priority"],
    datasets: [
      {
        label: "Tasks",
        data: [high, medium, low],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)", // red-500
          "rgba(251, 191, 36, 0.8)", // amber-400
          "rgba(34, 197, 94, 0.8)", // green-500
        ],
        borderColor: [
          "rgb(239, 68, 68)",
          "rgb(251, 191, 36)",
          "rgb(34, 197, 94)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Priority Distribution",
        color: isDarkMode ? "#f3f4f6" : "#111827",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
        titleColor: isDarkMode ? "#f3f4f6" : "#111827",
        bodyColor: isDarkMode ? "#e5e7eb" : "#374151",
        borderColor: isDarkMode ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} tasks (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div style={{ height: "350px" }}>
        {total > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>No priority data available</p>
          </div>
        )}
      </div>

      {/* Center label showing total */}
      {total > 0 && (
        <div className="text-center mt-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {total}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Tasks
          </p>
        </div>
      )}
    </div>
  );
};

export default PriorityDistributionChart;
