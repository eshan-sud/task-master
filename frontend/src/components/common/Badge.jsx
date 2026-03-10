// frontend/src/components/common/Badge.jsx

/**
 * Reusable badge component for status, priority, and labels
 */
export const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  onRemove,
}) => {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    primary: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    info: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",

    // Status specific
    pending:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    "in-progress":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    completed:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",

    // Priority specific
    high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    medium:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    low: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        ${variants[variant] || variants.default}
        ${sizes[size]}
        ${onClick ? "cursor-pointer hover:opacity-80" : ""}
        ${className}
      `}
    >
      {children}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

/**
 * Preset badge components
 */
export const StatusBadge = ({ status, ...props }) => (
  <Badge variant={status?.toLowerCase()} {...props}>
    {status}
  </Badge>
);

export const PriorityBadge = ({ priority, ...props }) => (
  <Badge variant={priority?.toLowerCase()} {...props}>
    {priority}
  </Badge>
);

export const CategoryBadge = ({ category, ...props }) => (
  <Badge variant="primary" {...props}>
    {category}
  </Badge>
);

export const TagBadge = ({ tag, onRemove, ...props }) => (
  <Badge variant="default" onRemove={onRemove} {...props}>
    {tag}
  </Badge>
);

export default Badge;
