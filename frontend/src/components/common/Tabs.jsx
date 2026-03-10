// frontend/src/components/common/Tabs.jsx

import { useState } from "react";

/**
 * Reusable tabs component with keyboard navigation
 */
export const Tabs = ({
  tabs = [],
  defaultTab = 0,
  onChange,
  variant = "line",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(nextIndex);
      if (onChange) onChange(nextIndex);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(prevIndex);
      if (onChange) onChange(prevIndex);
    }
  };

  const variants = {
    line: "border-b border-gray-200 dark:border-gray-700",
    pills: "bg-gray-100 dark:bg-gray-900 p-1 rounded-lg",
    enclosed: "border-b border-gray-200 dark:border-gray-700",
  };

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        className={`flex ${variants[variant]}`}
        role="tablist"
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          const Icon = tab.icon;

          const baseClasses =
            "flex items-center gap-2 px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

          const variantClasses = {
            line: `border-b-2 ${
              isActive
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300"
            }`,
            pills: `rounded-md ${
              isActive
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`,
            enclosed: `border-t border-l border-r rounded-t-lg -mb-px ${
              isActive
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-gray-200 dark:border-gray-700"
                : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200"
            }`,
          };

          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={tab.disabled}
              className={`
                ${baseClasses}
                ${variantClasses[variant]}
                ${tab.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {Icon && <Icon size={16} />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={activeTab !== index}
          >
            {activeTab === index && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
