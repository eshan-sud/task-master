// frontend/src/components/chat/NewChatPopup.jsx

import { useEffect, useState } from "react";
import { FiX, FiSearch, FiUser, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import apiService from "../../services/api.service.js";
import { SkeletonList } from "../common/Skeleton.jsx";

export default function NewChatPopup({ onClose, onSelectUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.get(
        `/search/users?query=${encodeURIComponent(searchQuery)}`,
      );
      setSearchResults(result.data.users || []);
      if (result.data.users.length === 0) {
        toast("No users found", { icon: "🔍" });
      }
    } catch {
      toast.error("Failed to search users");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user) => {
    onSelectUser(user);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            New Chat
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <FiX size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-wait text-white rounded-md transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" size={16} />
                  <span>Searching...</span>
                </>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4">
              <SkeletonList count={5} height="h-16" />
            </div>
          ) : searchResults.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {searchResults.map((user) => (
                <li key={user._id}>
                  <button
                    onClick={() => handleSelectUser(user)}
                    className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <FiUser className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {user.fullName || user.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <FiSearch className="mx-auto text-gray-400 mb-2" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                Search for users to start a chat
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Enter a name or email above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
