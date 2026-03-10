// frontend/src/components/Dashboard/TasksTrendChart.jsx

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

/**
 * TasksTrendChart Component
 *
 * Line chart showing task completion trends over time.
 * Displays completed vs. created tasks with area fill.
 *
 * @param {Object} props
 * @param {Array} props.data - Array of data points with labels, completed, and created counts
 * @param {boolean} props.isDarkMode - Whether dark mode is active
 */
export const TasksTrendChart = ({ data = [], isDarkMode = false }) => {
  const labels = data.map((item) => item.label);
  const completedData = data.map((item) => item.completed || 0);
  const createdData = data.map((item) => item.created || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: completedData,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Created Tasks",
        data: createdData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
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
        text: "Task Activity Trend",
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
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} tasks`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? "#374151" : "#f3f4f6",
          display: true,
        },
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? "#374151" : "#f3f4f6",
        },
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div style={{ height: "350px" }}>
        {data.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>No trend data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksTrendChart;
