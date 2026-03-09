// frontend/src/components/Tasks/TaskSearch.jsx
import { useState, useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { debounce } from "../../utils/Debounce";

const TaskSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 300),
    [onSearch],
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks by title, description, or tags..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskSearch;
