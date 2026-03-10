// frontend/src/components/profile/Dashboard.jsx

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiList,
  FiPlus,
} from "react-icons/fi";
import { format, isToday, isTomorrow, isPast, startOfDay } from "date-fns";
import Calendar from "react-calendar";
import toast from "react-hot-toast";
import "react-calendar/dist/Calendar.css";
import { Background } from "./Background.jsx";
import { fetchTasks, createTask } from "../../store/slices/tasksSlice.js";
import { fetchCategories } from "../../store/slices/categoriesSlice.js";
import apiService from "../../services/api.service.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: tasks } = useSelector((state) => state.tasks);
  const { categories } = useSelector((state) => state.categories);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showQuickCategoryForm, setShowQuickCategoryForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "medium",
    category: "",
  });
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(fetchCategories());
  }, [dispatch]);

  // Calculate statistics
  const stats = useMemo(() => {
    const activeTasks = tasks.filter(
      (task) => !task.isDeleted && !task.isArchived,
    );

    return {
      total: activeTasks.length,
      completed: activeTasks.filter((t) => t.status === "completed").length,
      inProgress: activeTasks.filter((t) => t.status === "in-progress").length,
      overdue: activeTasks.filter(
        (t) =>
          t.dueDate && isPast(new Date(t.dueDate)) && t.status !== "completed",
      ).length,
      dueToday: activeTasks.filter(
        (t) =>
          t.dueDate && isToday(new Date(t.dueDate)) && t.status !== "completed",
      ).length,
      dueTomorrow: activeTasks.filter(
        (t) =>
          t.dueDate &&
          isTomorrow(new Date(t.dueDate)) &&
          t.status !== "completed",
      ).length,
    };
  }, [tasks]);

  // Get tasks for selected date
  const tasksForDate = useMemo(() => {
    const dateStr = format(startOfDay(selectedDate), "yyyy-MM-dd");
    return tasks.filter((task) => {
      if (!task.dueDate || task.isDeleted || task.isArchived) return false;
      const taskDateStr = format(
        startOfDay(new Date(task.dueDate)),
        "yyyy-MM-dd",
      );
      return taskDateStr === dateStr;
    });
  }, [tasks, selectedDate]);

  // Tile content for calendar - show dots for tasks
  const tileContent = ({ date }) => {
    const dateStr = format(startOfDay(date), "yyyy-MM-dd");
    const tasksOnDate = tasks.filter((task) => {
      if (!task.dueDate || task.isDeleted || task.isArchived) return false;
      const taskDateStr = format(
        startOfDay(new Date(task.dueDate)),
        "yyyy-MM-dd",
      );
      return taskDateStr === dateStr;
    });

    if (tasksOnDate.length === 0) return null;

    return (
      <div className="flex justify-center gap-1 mt-1">
        {tasksOnDate.length > 0 && (
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
        )}
      </div>
    );
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    if (!newTask.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      await dispatch(createTask(newTask)).unwrap();
      toast.success("Task created successfully");
      setNewTask({
        title: "",
        description: "",
        dueDate: selectedDate,
        priority: "medium",
        category: "",
      });
      setShowTaskForm(false);
    } catch (error) {
      toast.error(error.error || "Failed to create task");
    }
  };

  const handleQuickAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await apiService.post(
        "/categories/createCategory",
        categoryForm,
      );
      toast.success("Category added successfully");
      const newCategory = response.data.category;
      // Set the newly created category in the task form
      setNewTask({ ...newTask, category: newCategory._id });
      setCategoryForm({ name: "", description: "" });
      setShowQuickCategoryForm(false);
      // Refresh categories list
      await dispatch(fetchCategories()).unwrap();
    } catch (error) {
      toast.error(error.error || "Failed to add category");
    }
  };

  return (
    <div className="relative min-h-screen">
      <Background>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back! Here's your task overview
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Tasks"
              value={stats.total}
              icon={<FiList />}
              bgColor="bg-blue-100 dark:bg-blue-900/30"
              textColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              icon={<FiCheckCircle />}
              bgColor="bg-green-100 dark:bg-green-900/30"
              textColor="text-green-600 dark:text-green-400"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              icon={<FiClock />}
              bgColor="bg-yellow-100 dark:bg-yellow-900/30"
              textColor="text-yellow-600 dark:text-yellow-400"
            />
            <StatCard
              title="Overdue"
              value={stats.overdue}
              icon={<FiAlertCircle />}
              bgColor="bg-red-100 dark:bg-red-900/30"
              textColor="text-red-600 dark:text-red-400"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Calendar
              </h2>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                className="w-full border-none shadow-sm rounded-lg"
              />

              {/* Tasks for Selected Date */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Tasks for {format(selectedDate, "MMM dd, yyyy")}
                  </h3>
                  <button
                    onClick={() => setShowTaskForm(!showTaskForm)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                  >
                    <FiPlus size={16} />
                    Add Task
                  </button>
                </div>

                {/* Quick Task Form */}
                {showTaskForm && (
                  <form
                    onSubmit={handleCreateTask}
                    className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <input
                      type="text"
                      placeholder="Task title..."
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      autoFocus
                    />
                    <textarea
                      placeholder="Description (optional)..."
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                      className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <select
                        value={newTask.priority}
                        onChange={(e) =>
                          setNewTask({ ...newTask, priority: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                          Category *
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setShowQuickCategoryForm(!showQuickCategoryForm)
                          }
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {showQuickCategoryForm ? "- Hide" : "+ New"}
                        </button>
                      </div>

                      {showQuickCategoryForm ? (
                        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-2 mb-2 bg-gray-50 dark:bg-gray-900">
                          <input
                            type="text"
                            value={categoryForm.name}
                            onChange={(e) =>
                              setCategoryForm({
                                ...categoryForm,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1.5 mb-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="Category name *"
                          />
                          <input
                            type="text"
                            value={categoryForm.description}
                            onChange={(e) =>
                              setCategoryForm({
                                ...categoryForm,
                                description: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1.5 mb-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="Description (optional)"
                          />
                          <button
                            type="button"
                            onClick={handleQuickAddCategory}
                            className="w-full px-2 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm"
                          >
                            Create Category
                          </button>
                        </div>
                      ) : (
                        <select
                          value={newTask.category}
                          onChange={(e) =>
                            setNewTask({ ...newTask, category: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    {categories.length === 0 && !showQuickCategoryForm && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        No categories available. Click "+ New" to create one.
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                      >
                        Create Task
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowTaskForm(false)}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Task List */}
                {tasksForDate.length > 0 ? (
                  <ul className="space-y-2">
                    {tasksForDate.map((task) => (
                      <li
                        key={task._id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {task.description}
                              </p>
                            )}
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              task.status === "completed"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : task.status === "in-progress"
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                  : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No tasks scheduled for this date
                  </p>
                )}
              </div>
            </div>

            {/* Quick Overview */}
            <div className="space-y-4">
              {/* Due Today */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Due Today
                </h3>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.dueToday}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Tasks requiring attention
                </p>
              </div>

              {/* Due Tomorrow */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Due Tomorrow
                </h3>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.dueTomorrow}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Plan ahead
                </p>
              </div>

              {/* Completion Rate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Completion Rate
                </h3>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.total > 0
                    ? Math.round((stats.completed / stats.total) * 100)
                    : 0}
                  %
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {stats.completed} of {stats.total} completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, bgColor, textColor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <div className={`text-2xl ${textColor}`}>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
