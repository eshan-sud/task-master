// frontend/src/pages/Profile.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiPlus, FiFolder } from "react-icons/fi";

import { Background } from "../components/profile/Background.jsx";
import { useRememberMe } from "../utils/RememberMeContext.jsx";
import TaskCard from "../components/Tasks/TaskCard.jsx";
import TaskModal from "../components/Tasks/TaskModal.jsx";

import {
  createTask,
  fetchTasks,
  updateTask,
  deleteTask,
  archiveTask,
} from "../store/slices/tasksSlice.js";
import { fetchCategories } from "../store/slices/categoriesSlice.js";
import apiService from "../services/api.service.js";

export default function Profile() {
  const dispatch = useDispatch();
  const { isRememberMe } = useRememberMe();
  const storage = isRememberMe ? window.localStorage : window.sessionStorage;
  const { categories } = useSelector((state) => state.categories);
  const { items: tasks, loading: tasksLoading } = useSelector(
    (state) => state.tasks,
  );

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showQuickCategoryForm, setShowQuickCategoryForm] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
    category: "",
  });
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTasks({}));
  }, [dispatch]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;
      if (showTaskModal) setShowTaskModal(false);
      if (showCategoryModal) setShowCategoryModal(false);
      if (editingTask) setEditingTask(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showTaskModal, showCategoryModal, editingTask]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    if (!taskForm.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      await dispatch(createTask(taskForm)).unwrap();
      toast.success("Task added successfully");
      setTaskForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        status: "pending",
        category: "",
      });
      setShowTaskModal(false);
    } catch (error) {
      toast.error(error.error || "Failed to add task");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await apiService.post("/categories/createCategory", categoryForm);
      toast.success("Category added successfully");
      setCategoryForm({ name: "", description: "" });
      setShowCategoryModal(false);
      // Refresh categories list
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error.error || "Failed to add category");
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
      setTaskForm({ ...taskForm, category: newCategory._id });
      setCategoryForm({ name: "", description: "" });
      setShowQuickCategoryForm(false);
      // Refresh categories list
      await dispatch(fetchCategories()).unwrap();
    } catch (error) {
      toast.error(error.error || "Failed to add category");
    }
  };

  return (
    <Background>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl shadow-md backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Profile
          </h1>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p className="text-lg">
              <strong className="text-gray-900 dark:text-gray-100">
                Name:
              </strong>{" "}
              {storage.getItem("fullName") || "Guest User"}
            </p>
            <p className="text-lg">
              <strong className="text-gray-900 dark:text-gray-100">
                Email:
              </strong>{" "}
              {storage.getItem("email") || "Not available"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl shadow-md backdrop-blur-sm">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              <FiPlus size={20} />
              Add Task
            </button>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
            >
              <FiFolder size={20} />
              Add Category
            </button>
          </div>
        </div>

        {/* My Tasks Container (Categories + Pinned + All) */}
        <div className="mb-8 space-y-6">
          {/* Categories Overview */}
          <div className="p-6 bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-md backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Categories
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategoryId === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-200 hover:bg-gray-300/70 dark:hover:bg-gray-600/70"
                  }`}
                >
                  All categories
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories?.map((cat) => {
                const count = (tasks || []).filter(
                  (t) =>
                    !t.isDeleted &&
                    !t.isArchived &&
                    (t.category?._id || t.category) === cat._id,
                ).length;
                const isActive = selectedCategoryId === cat._id;
                return (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat._id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/20 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {cat.name}
                        </p>
                        {cat.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                      </div>
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                        title="Active tasks count"
                      >
                        {count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pinned */}
          <div className="p-6 bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-md backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Pinned
            </h2>
            {(() => {
              const pinned = (tasks || []).filter(
                (t) => !t.isDeleted && !t.isArchived && t.pinned,
              );
              if (tasksLoading && pinned.length === 0) {
                return (
                  <div className="text-gray-500 dark:text-gray-400">
                    Loading tasks...
                  </div>
                );
              }
              if (pinned.length === 0) {
                return (
                  <div className="text-gray-500 dark:text-gray-400">
                    No pinned tasks yet.
                  </div>
                );
              }
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pinned.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      viewMode="grid"
                      isSelected={false}
                      onToggleSelect={() => {}}
                      onEdit={(t) => setEditingTask(t)}
                      onDelete={(taskId) => dispatch(deleteTask(taskId))}
                      onArchive={(taskId) => dispatch(archiveTask(taskId))}
                      onUpdate={(taskId, updates) =>
                        dispatch(updateTask({ taskId, updates }))
                      }
                    />
                  ))}
                </div>
              );
            })()}
          </div>

          {/* All Tasks */}
          <div className="p-6 bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-md backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                All Tasks
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCategoryId === "all"
                  ? "Showing all categories"
                  : "Filtered by category"}
              </div>
            </div>

            {(() => {
              const filtered = (tasks || [])
                .filter((t) => !t.isDeleted && !t.isArchived)
                .filter((t) =>
                  selectedCategoryId === "all"
                    ? true
                    : (t.category?._id || t.category) === selectedCategoryId,
                )
                .filter((t) => !t.pinned); // avoid duplicating pinned section

              if (tasksLoading && filtered.length === 0) {
                return (
                  <div className="text-gray-500 dark:text-gray-400">
                    Loading tasks...
                  </div>
                );
              }
              if (filtered.length === 0) {
                return (
                  <div className="text-gray-500 dark:text-gray-400">
                    No tasks found for this view.
                  </div>
                );
              }
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      viewMode="grid"
                      isSelected={false}
                      onToggleSelect={() => {}}
                      onEdit={(t) => setEditingTask(t)}
                      onDelete={(taskId) => dispatch(deleteTask(taskId))}
                      onArchive={(taskId) => dispatch(archiveTask(taskId))}
                      onUpdate={(taskId, updates) =>
                        dispatch(updateTask({ taskId, updates }))
                      }
                    />
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Task Modal */}
        {showTaskModal && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowTaskModal(false);
            }}
          >
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Create New Task
              </h2>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter task title"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, dueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category *
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setShowQuickCategoryForm(!showQuickCategoryForm)
                      }
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {showQuickCategoryForm ? "- Hide" : "+ New Category"}
                    </button>
                  </div>

                  {showQuickCategoryForm ? (
                    <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3 mb-2 bg-gray-50 dark:bg-gray-900">
                      <input
                        type="text"
                        value={categoryForm.name}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                        className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Description (optional)"
                      />
                      <button
                        type="button"
                        onClick={handleQuickAddCategory}
                        className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm"
                      >
                        Create Category
                      </button>
                    </div>
                  ) : (
                    <select
                      value={taskForm.category}
                      onChange={(e) =>
                        setTaskForm({ ...taskForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  )}

                  {categories.length === 0 && !showQuickCategoryForm && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      No categories available. Click "+ New Category" to create
                      one.
                    </p>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
                  >
                    Create Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTaskModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 font-semibold rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCategoryModal(false);
            }}
          >
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Create New Category
              </h2>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter category name"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={categoryForm.description}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter category description"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors"
                  >
                    Create Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 font-semibold rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Task Modal */}
        {editingTask && (
          <TaskModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onSave={(updates) =>
              dispatch(updateTask({ taskId: editingTask._id, updates }))
            }
          />
        )}
      </div>
    </Background>
  );
}
