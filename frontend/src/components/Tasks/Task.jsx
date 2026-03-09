// frontend/src/Tasks/Task.jsx

import { SendButton, PinButton, ArchiveButton } from "../Buttons.jsx";

import { useState, useRef, useEffect } from "react";
import { FiStar, FiArchive, FiTrash2, FiSend } from "react-icons/fi";

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

  const handleShareTask = () => {};
  const handleArchiveTask = () => {};
  const handleDeleteTask = () => {};

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
              onArchive(task.id);
            }}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Archive"
          >
            <FiArchive />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSend(task.id);
            }}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Send"
          >
            <FiSend />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
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

// --- Example Usage ---
// You can place this in another component to display a list of tasks.
// For example, in your redesigned Profile.jsx.

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finalize Q3 report",
      content: "Review the numbers and add a conclusion section.",
      pinned: true,
    },
    {
      id: 2,
      title: "Team meeting agenda",
      content: "- Discuss project milestones\n- Brainstorm new features",
      pinned: false,
    },
    {
      id: 3,
      title: "Follow up with clients",
      content:
        "Email John about the contract.\nCall Sarah to confirm the meeting.",
      pinned: false,
    },
  ]);

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    console.log("Updated Task:", updatedTask);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    console.log("Deleted Task ID:", id);
  };

  const handleArchiveTask = (id) => {
    console.log("Archived Task ID:", id);
    // Add archive logic here
  };

  const handleSendTask = (id) => {
    console.log("Sent Task ID:", id);
    // Add send logic here
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Tasks
      </h1>
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
    </div>
  );
};

export default TaskList; // You can export Task directly if you prefer
