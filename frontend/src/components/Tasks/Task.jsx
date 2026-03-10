// frontend/src/Tasks/Task.jsx

// import { SendButton, PinButton, ArchiveButton } from "../Buttons.jsx";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiStar, FiArchive, FiTrash2, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  archiveTask,
} from "../../store/slices/tasksSlice.js";

const Task = ({ task: initialTask, onUpdate, onDelete, onArchive, onSend }) => {
  const [task, setTask] = useState(initialTask);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePinClick = (e) => {
    e.stopPropagation();
    const updatedTask = { ...task, pinned: !task.pinned };
    setTask(updatedTask);
    if (onUpdate) onUpdate(updatedTask);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const handleShareTask = () => {};
  // const handleArchiveTask = () => {};
  // const handleDeleteTask = () => {};

  return (
    <>
      <div
        className="group relative p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={openModal}
      >
        {/* Pinned Icon */}
        {task.pinned && (
          <div className="absolute top-2 right-2 text-yellow-500">
            <FiStar fill="currentColor" />
          </div>
        )}

        {/* Task Title */}
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 pr-8">
          {task.title}
        </h3>

        {/* Task Content Preview */}
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
          {task.content}
        </p>

        {/* Hover Action Buttons */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handlePinClick}
            className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${
              task.pinned ? "text-yellow-500" : "text-gray-500"
            }`}
            title={task.pinned ? "Unpin task" : "Pin task"}
          >
            <FiStar fill={task.pinned ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onArchive?.(task.id);
            }}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Archive"
          >
            <FiArchive />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSend?.(task.id);
            }}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Send"
          >
            <FiSend />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(task.id);
            }}
            className="p-2 rounded-full text-gray-500 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-500"
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* The Modal for detailed view and editing */}
      {isModalOpen && (
        <TaskModal
          task={task}
          onClose={closeModal}
          onUpdate={(updatedTask) => {
            setTask(updatedTask);
            if (onUpdate) onUpdate(updatedTask);
          }}
        />
      )}
    </>
  );
};

const TaskModal = ({ task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleDone = () => {
    onUpdate({ ...task, title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col gap-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-2xl font-bold bg-transparent outline-none w-full text-gray-900 dark:text-gray-100"
        />

        {/* Editable Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Take a note..."
          className="w-full h-48 bg-transparent outline-none resize-none text-gray-700 dark:text-gray-300"
        />

        {/* Modal Footer */}
        <div className="flex justify-end">
          <button
            onClick={handleDone}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// --- TaskList Component with Redux Integration ---

const TaskList = () => {
  const dispatch = useDispatch();
  const { items: tasksFromStore, loading } = useSelector(
    (state) => state.tasks,
  );

  // Filter to get active tasks only (not archived or deleted)
  const tasks = tasksFromStore
    .filter((task) => !task.isDeleted && !task.isArchived)
    .map((task) => ({
      id: task._id,
      title: task.title,
      content: task.description || "",
      pinned: task.isPinned || false,
      ...task,
    }));

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  const handleUpdateTask = async (updatedTask) => {
    try {
      await dispatch(
        updateTask({
          taskId: updatedTask.id,
          task: {
            title: updatedTask.title,
            description: updatedTask.content,
            isPinned: updatedTask.pinned,
          },
        }),
      ).unwrap();
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error(error.error || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await dispatch(deleteTask(id)).unwrap();
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error(error.error || "Failed to delete task");
      }
    }
  };

  const handleArchiveTask = async (id) => {
    try {
      await dispatch(archiveTask(id)).unwrap();
      toast.success("Task archived successfully");
    } catch (error) {
      toast.error(error.error || "Failed to archive task");
    }
  };

  const handleSendTask = () => {
    // TODO: Implement share/send task functionality
    toast("Share functionality coming soon!", { icon: "📤" });
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-transparent min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Tasks
      </h1>
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No tasks yet. Start by creating one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onArchive={handleArchiveTask}
              onSend={handleSendTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
