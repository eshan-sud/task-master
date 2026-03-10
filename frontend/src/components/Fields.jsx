// frontend/src/components/Fields.jsx

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CgSearch } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { FiFileText, FiUser, FiLoader } from "react-icons/fi";
import apiService from "../services/api.service";

import { CircularLabel } from "./Labels.jsx";
import { EmailValidator, isValidEmail } from "../utils/EmailValidator.jsx";

const base_resource_path = "/src/assets/images/";

export const SearchField = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState({ tasks: [], users: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Keyboard shortcut: Ctrl+K to focus search
  useEffect(() => {
    const handleGlobalKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsHovered(true);
        setIsFocused(true);
      }
    };

    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!inputValue || inputValue.trim() === "") {
      toast.error("Search value cannot be empty");
      return;
    }
    performSearch(inputValue);
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults({ tasks: [], users: [] });
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const response = await apiService.get(
        `/search/global?query=${encodeURIComponent(query)}`,
      );
      setSearchResults(response.data.results || { tasks: [], users: [] });
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed. Please try again.");
      setSearchResults({ tasks: [], users: [] });
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search - wait 300ms after user stops typing
    if (value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 300);
    } else {
      setSearchResults({ tasks: [], users: [] });
      setShowResults(false);
    }
  };

  const handleSelectTask = (task) => {
    setShowResults(false);
    setInputValue("");
    navigate("/tasks", { state: { selectedTask: task } });
  };

  const handleSelectUser = (user) => {
    setShowResults(false);
    setInputValue("");
    navigate("/chat", { state: { selectedUser: user } });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!inputValue && !isFocused) {
      setIsHovered(false);
    }
  };

  const handleReset = () => {
    setInputValue("");
    setSearchResults({ tasks: [], users: [] });
    setShowResults(false);
    setIsHovered(false);
    setIsFocused(false);
    inputRef.current.blur();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsHovered(true);
    if (
      inputValue.trim() &&
      (searchResults.tasks.length > 0 || searchResults.users.length > 0)
    ) {
      setShowResults(true);
    }
  };

  const handleBlur = (event) => {
    // Don't close if clicking inside results
    if (
      resultsRef.current &&
      resultsRef.current.contains(event.relatedTarget)
    ) {
      return;
    }

    if (!inputRef.current.contains(event.relatedTarget) && !inputValue) {
      setIsFocused(false);
      setIsHovered(false);
    }

    // Delay hiding results to allow clicks
    setTimeout(() => {
      if (
        !inputRef.current?.contains(document.activeElement) &&
        !resultsRef.current?.contains(document.activeElement)
      ) {
        setShowResults(false);
      }
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
        if (!inputValue) {
          setIsHovered(false);
          setIsFocused(false);
          inputRef.current.blur();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [inputValue]);

  const hasResults =
    searchResults.tasks.length > 0 || searchResults.users.length > 0;

  return (
    <div className="flex items-center relative">
      <form
        id="searchForm"
        onSubmit={handleSearch}
        className={`p-2 overflow-hidden h-10 ${
          isHovered || inputValue || isFocused ? "w-[270px]" : "w-10"
        } bg-gray-200 dark:bg-gray-700 rounded-full flex items-center duration-300 border-2 ${
          isFocused
            ? "border-blue-500"
            : "border-transparent dark:border-transparent"
        } placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-md`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button type="submit" className="text-gray-600 dark:text-gray-300">
          {isSearching ? <FiLoader className="animate-spin" /> : <CgSearch />}
        </button>
        <input
          ref={inputRef}
          type="text"
          className="outline-none text-[20px] bg-transparent w-full font-normal px-4 text-gray-900 dark:text-gray-100"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="reset"
          className="p-1 text-gray-600 dark:text-gray-300"
          onClick={handleReset}
        >
          <MdCancel />
        </button>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (isHovered || isFocused) && (
        <div
          ref={resultsRef}
          className="absolute top-12 left-0 w-[400px] max-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
        >
          {isSearching ? (
            <div className="p-8 text-center">
              <FiLoader
                className="animate-spin mx-auto text-blue-500 mb-2"
                size={32}
              />
              <p className="text-gray-500 dark:text-gray-400">Searching...</p>
            </div>
          ) : hasResults ? (
            <div className="overflow-y-auto max-h-[500px]">
              {/* Tasks Section */}
              {searchResults.tasks.length > 0 && (
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      Tasks ({searchResults.tasks.length})
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {searchResults.tasks.map((task) => (
                      <button
                        key={task._id}
                        onClick={() => handleSelectTask(task)}
                        className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors flex items-start gap-3"
                      >
                        <FiFileText className="mt-1 text-blue-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {task.text || task.title}
                          </p>
                          {task.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {task.category && (
                              <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                                {task.category.name}
                              </span>
                            )}
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {task.status}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Section */}
              {searchResults.users.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      Users ({searchResults.users.length})
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {searchResults.users.map((user) => (
                      <button
                        key={user._id}
                        onClick={() => handleSelectUser(user)}
                        className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <CgSearch
                className="mx-auto text-gray-400 dark:text-gray-500 mb-2"
                size={32}
              />
              <p className="text-gray-500 dark:text-gray-400">
                No results found for "{inputValue}"
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Try searching for tasks or users
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const EmailField = ({
  type,
  name,
  email,
  setEmail,
  className = "",
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <EmailValidator setEmail={setEmail} email={email}>
        <div className="relative">
          <input
            value={email}
            type={type}
            id={name}
            autoFocus={autoFocus}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(event) => setEmail(event.target.value.toLowerCase())}
            className={`peer border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-all duration-500 focus:bg-white ${className} ${
              isFocused
                ? email === ""
                  ? "border-[#4A9DEC] shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)]"
                  : isValidEmail(email)
                    ? "border-green-500 shadow-[0px_0px_0px_7px_rgba(34,197,94,0.2)]"
                    : "border-red-500 shadow-[0px_0px_0px_7px_rgba(239,68,68,0.2)]"
                : ""
            }`}
          />
          <label
            htmlFor={name}
            className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
              email
                ? "top-0 text-xs text-blue-500"
                : "top-4 text-sm text-gray-600"
            } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
          >
            {name}
          </label>
        </div>
      </EmailValidator>
    </div>
  );
};

export const Field = ({
  name,
  type,
  value,
  setValue,
  autoFocus = false,
  allowSpecialChars = true,
}) => {
  const handleChange = (event) => {
    let inputValue = event.target.value;
    if (!allowSpecialChars) {
      inputValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
    }
    setValue(inputValue.toLowerCase());
  };
  return (
    <div className="relative">
      <input
        value={value}
        type={type}
        id={name}
        onChange={handleChange}
        autoFocus={autoFocus}
        className="border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-all duration-500 focus:border-[#4A9DEC] focus:shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)] focus:bg-white peer"
      />
      <label
        htmlFor={name}
        className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
          value ? "top-0 text-xs text-blue-500" : "top-4 text-sm text-gray-600"
        } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
      >
        {name}
      </label>
    </div>
  );
};

const GenderField = ({ name, title, setGender }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={name}
        name="gender"
        value={name}
        className="hidden peer"
        onChange={() => setGender(name)}
      />
      <CircularLabel title={title} htmlFor={name}>
        <img
          src={`${base_resource_path}${name}.svg`}
          alt={title}
          className="absolute stroke-black"
        />
      </CircularLabel>
    </div>
  );
};

export const GenderInput = ({ setGender }) => {
  return (
    <div className="border-2 w-full p-3 pl-[0.8em] outline-none bg-[#F3F3F3] rounded-[10px]">
      <label className="block text-gray-500 cursor-text text-sm leading-[140%] font-normal mb-2">
        Gender
      </label>
      <div className="flex items-center align-middle gap-4">
        <GenderField name="male" title="Male" setGender={setGender} />
        <GenderField name="female" title="Female" setGender={setGender} />
        <GenderField
          name="non_binary"
          title="Non Binary"
          setGender={setGender}
        />
        <GenderField
          name="none"
          title="Don't Want to specify"
          setGender={setGender}
        />
      </div>
    </div>
  );
};

export const NewPasswordField = ({
  type = "password",
  name = "New Password",
  value,
  onChange,
  autoFocus = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        value={value}
        type={type}
        id={name}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => onChange(event.target.value)}
        className={`border-gray-300 dark:border-gray-600 peer border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none bg-[#F3F3F3] dark:bg-gray-800 shadow-md text-gray-900 dark:text-gray-100 rounded-[10px] transition-all duration-500 ${
          isFocused
            ? value === ""
              ? "border-[#4A9DEC] shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)]"
              : "border-green-500 shadow-[0px_0px_0px_7px_rgba(34,197,94,0.2)]"
            : ""
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
          value ? "top-0 text-xs text-blue-500" : "top-4 text-sm text-gray-600"
        } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
      >
        {name}
      </label>
    </div>
  );
};

export const DefaultInput = ({ ID, value, onChange, style }) => {
  return (
    <input
      id={ID}
      type="text"
      value={value}
      onChange={onChange}
      style={style}
      className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-[#F3F3F3] dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
  );
};
