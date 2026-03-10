// frontend/src/components/Tasks/TasksContainer.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  archiveTask,
  bulkUpdateTasks,
  searchTasks,
} from "../../store/slices/tasksSlice";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import TaskFilters from "./TaskFilters";
import TaskSearch from "./TaskSearch";
import CreateTaskButton from "./CreateTaskButton";
import BulkActionsBar from "./BulkActionsBar";
import KanbanBoard from "./KanbanBoard";
import { FiGrid, FiList, FiPlus, FiColumns } from "react-icons/fi";

const TasksContainer = () => {
  const dispatch = useDispatch();
  const {
    items: tasks,
    loading,
    error,
    searchResults,
  } = useSelector((state) => state.tasks);
  const [viewMode, setViewMode] = useState("grid"); // 'grid', 'list', or 'kanban'
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Fetch tasks on mount
  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

  // Determine which tasks to display
  const displayTasks = searchResults.length > 0 ? searchResults : tasks;

  // Filter tasks based on current filters
  const filteredTasks = displayTasks.filter((task) => {
    if (filters.status !== "all" && task.status !== filters.status)
      return false;
    if (filters.priority !== "all" && task.priority !== filters.priority)
      return false;
    if (filters.category !== "all" && task.category?._id !== filters.category)
      return false;
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const order = filters.sortOrder === "asc" ? 1 : -1;
    if (filters.sortBy === "dueDate") {
      return order * (new Date(a.dueDate) - new Date(b.dueDate));
    }
    if (filters.sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (
        order *
        ((priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0))
      );
    }
    return order * (new Date(a.createdAt) - new Date(b.createdAt));
  });

  // Separate pinned and unpinned tasks
  const pinnedTasks = sortedTasks.filter((task) => task.pinned);
  const unpinnedTasks = sortedTasks.filter((task) => !task.pinned);

  const handleCreateTask = async (taskData) => {
    await dispatch(createTask(taskData));
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = async (taskId, updates) => {
    await dispatch(updateTask({ taskId, updates }));
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await dispatch(deleteTask(taskId));
    }
  };

  const handleArchiveTask = async (taskId) => {
    await dispatch(archiveTask(taskId));
  };

  const handleToggleSelect = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  const handleBulkAction = async (action, data) => {
    await dispatch(bulkUpdateTasks({ taskIds: selectedTasks, updates: data }));
    setSelectedTasks([]);
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      dispatch(searchTasks({ query }));
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Tasks
        </h1>
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-white dark:bg-gray-600 text-blue-500" : "text-gray-600 dark:text-gray-400"}`}
              title="Grid view"
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-white dark:bg-gray-600 text-blue-500" : "text-gray-600 dark:text-gray-400"}`}
              title="List view"
            >
              <FiList />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-2 rounded ${viewMode === "kanban" ? "bg-white dark:bg-gray-600 text-blue-500" : "text-gray-600 dark:text-gray-400"}`}
              title="Kanban board"
            >
              <FiColumns />
            </button>
          </div>

          {/* Create Task Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiPlus /> New Task
          </button>
        </div>
      </div>

      {/* Search */}
      <TaskSearch onSearch={handleSearch} />

      {/* Filters */}
      <TaskFilters filters={filters} onFilterChange={setFilters} />

      {/* Bulk Actions Bar */}
      {selectedTasks.length > 0 && (
        <BulkActionsBar
          selectedCount={selectedTasks.length}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedTasks([])}
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tasks Display */}
      {viewMode === "kanban" ? (
        <KanbanBoard
          tasks={sortedTasks}
          onTaskClick={(task) => setEditingTask(task)}
        />
      ) : (
        <div className="space-y-8">
          {/* Pinned Tasks */}
          {pinnedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                📌 Pinned
              </h2>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-2"
                }
              >
                {pinnedTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    viewMode={viewMode}
                    isSelected={selectedTasks.includes(task._id)}
                    onToggleSelect={handleToggleSelect}
                    onEdit={() => setEditingTask(task)}
                    onDelete={handleDeleteTask}
                    onArchive={handleArchiveTask}
                    onUpdate={handleUpdateTask}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Tasks */}
          {unpinnedTasks.length > 0 && (
            <div>
              {pinnedTasks.length > 0 && (
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  All Tasks
                </h2>
              )}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-2"
                }
              >
                {unpinnedTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    viewMode={viewMode}
                    isSelected={selectedTasks.includes(task._id)}
                    onToggleSelect={handleToggleSelect}
                    onEdit={() => setEditingTask(task)}
                    onDelete={handleDeleteTask}
                    onArchive={handleArchiveTask}
                    onUpdate={handleUpdateTask}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {sortedTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 text-6xl mb-4">
                📝
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first task to get started
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Task
              </button>
            </div>
          )}
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <TaskModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateTask}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updates) => handleUpdateTask(editingTask._id, updates)}
        />
      )}
    </div>
  );
};

export default TasksContainer;
