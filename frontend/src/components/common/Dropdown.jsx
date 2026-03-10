// frontend/src/components/common/Dropdown.jsx

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

/**
 * Reusable dropdown menu component with keyboard navigation
 */
export const Dropdown = ({
  trigger,
  items = [],
  align = "left",
  width = "w-56",
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const alignments = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 transform -translate-x-1/2",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < items.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          event.preventDefault();
          if (focusedIndex >= 0 && items[focusedIndex]) {
            items[focusedIndex].onClick?.();
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, focusedIndex, items]);

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (!item.keepOpen) {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div onClick={() => !disabled && setIsOpen(!isOpen)}>
        {trigger || (
          <button
            type="button"
            disabled={disabled}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Options</span>
            <FiChevronDown
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 ${width} ${alignments[align]} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          <div className="py-1">
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${index}`}
                    className="my-1 border-t border-gray-200 dark:border-gray-700"
                  />
                );
              }

              if (item.header) {
                return (
                  <div
                    key={`header-${index}`}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {item.label}
                  </div>
                );
              }

              const Icon = item.icon;
              const isFocused = focusedIndex === index;
              const isActive = item.active;

              return (
                <button
                  key={item.id || index}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm
                    transition-colors
                    ${
                      item.danger
                        ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                    ${isFocused ? "bg-gray-100 dark:bg-gray-700" : ""}
                    ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {Icon && (
                    <Icon
                      size={16}
                      className={item.danger ? "text-red-500" : ""}
                    />
                  )}
                  <span className="flex-1">{item.label}</span>
                  {isActive && <FiCheck size={16} className="text-blue-500" />}
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Simple select dropdown
 */
export const Select = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  error,
  className = "",
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  const items = options.map((option) => ({
    id: option.value,
    label: option.label,
    icon: option.icon,
    active: option.value === value,
    onClick: () => onChange(option.value),
  }));

  return (
    <div className={className}>
      <Dropdown
        trigger={
          <button
            type="button"
            disabled={disabled}
            className={`
              w-full inline-flex items-center justify-between gap-2 px-4 py-2.5
              bg-white dark:bg-gray-800 border-2 rounded-lg
              transition-all
              ${
                error
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }
              ${!disabled && "hover:border-gray-400 dark:hover:border-gray-500"}
              ${disabled && "opacity-50 cursor-not-allowed"}
            `}
          >
            <span
              className={
                selectedOption
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-400 dark:text-gray-500"
              }
            >
              {selectedOption?.label || placeholder}
            </span>
            <FiChevronDown size={16} className="text-gray-400" />
          </button>
        }
        items={items}
        width="w-full"
        disabled={disabled}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;
