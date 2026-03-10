// frontend/src/components/Dashboard/CategoryDistributionChart.jsx

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * CategoryDistributionChart Component
 *
 * Horizontal bar chart showing task distribution by category.
 * Displays task count and completion rate for each category.
 *
 * @param {Object} props
 * @param {Array} props.data - Array of objects with category, total, and completed counts
 * @param {boolean} props.isDarkMode - Whether dark mode is active
 */
export const CategoryDistributionChart = ({
  data = [],
  isDarkMode = false,
}) => {
  const labels = data.map((item) => item.category);
  const totalTasks = data.map((item) => item.total || 0);
  const completedTasks = data.map((item) => item.completed || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Tasks",
        data: totalTasks,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
      {
        label: "Completed Tasks",
        data: completedTasks,
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
          usePointStyle: true,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Tasks by Category",
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
            const label = context.dataset.label || "";
            const value = context.parsed.x || 0;
            return `${label}: ${value} tasks`;
          },
          afterLabel: function (context) {
            if (context.datasetIndex === 0) {
              const total = context.parsed.x;
              const completed = completedTasks[context.dataIndex] || 0;
              const percentage =
                total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
              return `Completion: ${percentage}%`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? "#374151" : "#f3f4f6",
        },
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
          stepSize: 1,
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "#374151" : "#f3f4f6",
          display: false,
        },
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div style={{ height: "350px" }}>
        {data.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>No category data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
