// frontend/src/components/profile/Analytics.jsx

import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { FiCheckCircle, FiClock, FiAlertCircle, FiList } from "react-icons/fi";
import { format, subDays } from "date-fns";
import ThemeContext from "../../utils/ThemeContext.jsx";
import { Background } from "./Background.jsx";

// Import Chart.js components
import {
  StatCard,
  TasksTrendChart,
  PriorityDistributionChart,
  CategoryDistributionChart,
} from "../Dashboard";

export const Analytics = () => {
  const { isTheme } = useContext(ThemeContext);
  const isDarkMode = isTheme; // isTheme = true means dark mode

  // Get tasks from Redux store (items is the array, not tasks)
  const tasks = useSelector((state) => state.tasks?.items || []);

  // Calculate statistics with useMemo to avoid recalculation on every render
  const stats = useMemo(() => {
    const activeTasks = tasks.filter((task) => !task.isDeleted);
    const now = new Date();

    const totalTasks = activeTasks.length;
    const completedTasks = activeTasks.filter(
      (task) => task.status === "completed",
    ).length;
    const pendingTasks = activeTasks.filter(
      (task) => task.status === "pending",
    ).length;
    const inProgressTasks = activeTasks.filter(
      (task) => task.status === "in-progress",
    ).length;

    const overdueTasks = activeTasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < now &&
        task.status !== "completed",
    ).length;

    const completionRate =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      completionRate,
    };
  }, [tasks]);

  // Generate trend data for the last 7 days with useMemo
  const trendData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, "MMM dd");

      // Count tasks created on this day
      const created = tasks.filter((task) => {
        const createdDate = new Date(task.createdAt);
        return format(createdDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
      }).length;

      // Count tasks completed on this day
      const completed = tasks.filter((task) => {
        if (!task.updatedAt || task.status !== "completed") return false;
        const updatedDate = new Date(task.updatedAt);
        return format(updatedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
      }).length;

      data.push({
        label: dateStr,
        created,
        completed,
      });
    }
    return data;
  }, [tasks]);

  // Generate priority distribution data with useMemo
  const priorityData = useMemo(
    () => ({
      high: tasks.filter((task) => task.priority === "high" && !task.isDeleted)
        .length,
      medium: tasks.filter(
        (task) => task.priority === "medium" && !task.isDeleted,
      ).length,
      low: tasks.filter((task) => task.priority === "low" && !task.isDeleted)
        .length,
    }),
    [tasks],
  );

  // Generate category distribution data with useMemo
  const categoryChartData = useMemo(() => {
    const categoryData = {};
    tasks
      .filter((task) => !task.isDeleted)
      .forEach((task) => {
        const categoryName = task.category?.name || "Uncategorized";
        if (!categoryData[categoryName]) {
          categoryData[categoryName] = { total: 0, completed: 0 };
        }
        categoryData[categoryName].total++;
        if (task.status === "completed") {
          categoryData[categoryName].completed++;
        }
      });

    return Object.keys(categoryData).map((category) => ({
      category,
      total: categoryData[category].total,
      completed: categoryData[category].completed,
    }));
  }, [tasks]);

  return (
    <div className="relative min-h-screen">
      <Background>
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your productivity and task completion trends
            </p>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Tasks"
              value={stats.totalTasks}
              icon={<FiList />}
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              title="Completed"
              value={stats.completedTasks}
              icon={<FiCheckCircle />}
              iconBgColor="bg-green-100 dark:bg-green-900/30"
              iconColor="text-green-600 dark:text-green-400"
              trend={stats.completionRate}
              trendLabel={`${stats.completionRate}% completion rate`}
            />
            <StatCard
              title="In Progress"
              value={stats.inProgressTasks}
              icon={<FiClock />}
              iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
              iconColor="text-yellow-600 dark:text-yellow-400"
            />
            <StatCard
              title="Overdue"
              value={stats.overdueTasks}
              icon={<FiAlertCircle />}
              iconBgColor="bg-red-100 dark:bg-red-900/30"
              iconColor="text-red-600 dark:text-red-400"
            />
          </div>

          {/* Trend Chart */}
          <TasksTrendChart data={trendData} isDarkMode={isDarkMode} />

          {/* Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PriorityDistributionChart
              data={priorityData}
              isDarkMode={isDarkMode}
            />
            <CategoryDistributionChart
              data={categoryChartData}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Performance Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Performance Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.completionRate}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Completion Rate
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.pendingTasks}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Pending Tasks
                </p>
              </div>
              <div className="text-center">
                <p
                  className={`text-4xl font-bold ${
                    stats.overdueTasks > 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {stats.overdueTasks}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Overdue Tasks
                </p>
              </div>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
};

export default Analytics;
