// frontend/src/components/profile/Archive.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPackage, FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";
import { Background } from "./Background.jsx";
import TaskCard from "../Tasks/TaskCard.jsx";
import { fetchArchivedTasks, unarchiveTask, deleteTask } from "../../store/slices/tasksSlice.js";

const Archive = () => {
  const dispatch = useDispatch();
  const { archivedItems, archiveLoading, error } = useSelector(
    (state) => state.tasks,
  );
  const viewMode = "grid";

  useEffect(() => {
    dispatch(fetchArchivedTasks());
  }, [dispatch]);

  const handleUnarchive = async (taskId) => {
    try {
      await dispatch(unarchiveTask(taskId)).unwrap();
      toast.success("Task unarchived successfully");
    } catch (error) {
      toast.error(error.error || "Failed to unarchive task");
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to permanently delete this task?")) {
      try {
        await dispatch(deleteTask(taskId)).unwrap();
        toast.success("Task deleted permanently");
        dispatch(fetchArchivedTasks());
      } catch (error) {
        toast.error(error.error || "Failed to delete task");
      }
    }
  };

  const handleRefresh = () => {
    dispatch(fetchArchivedTasks());
    toast.success("Refreshed archived tasks");
  };

  return (
    <div className="relative min-h-screen">
      <Background>
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Archived Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {archivedItems.length} archived {archivedItems.length === 1 ? "task" : "tasks"}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                disabled={archiveLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <FiRefreshCw className={archiveLoading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          {/* Loading State */}
          {archiveLoading && archivedItems.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading archived tasks...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !archiveLoading && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!archiveLoading && archivedItems.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <FiPackage className="text-6xl text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Archived Tasks
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Archived tasks will appear here. You can archive tasks from your main task list to keep them out of sight.
              </p>
            </div>
          )}

          {/* Tasks Grid */}
          {!archiveLoading && archivedItems.length > 0 && (
            <div className={`
              ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}
            `}>
              {archivedItems.map((task) => (
                <div key={task._id} className="relative group">
                  <TaskCard
                    task={task}
                    viewMode={viewMode}
                    onEdit={() => {}}
                    onDelete={() => handleDelete(task._id)}
                    onArchive={() => {}}
                    onUpdate={() => {}}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleUnarchive(task._id)}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-colors flex items-center gap-2"
                      title="Unarchive task"
                    >
                      <FiRefreshCw size={16} />
                      <span className="text-sm">Unarchive</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Background>
    </div>
  );
};

export default Archive;
