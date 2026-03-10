// frontend/src/components/common/Card.jsx

import { forwardRef } from "react";

/**
 * Reusable card component with consistent styling
 */
export const Card = forwardRef(
  (
    {
      children,
      className = "",
      variant = "default",
      padding = "md",
      hover = false,
      onClick,
      shadow = true,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default:
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      primary:
        "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800",
      success:
        "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800",
      warning:
        "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800",
      danger:
        "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
      ghost: "bg-transparent border-0",
    };

    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    };

    const shadowClasses = shadow
      ? "shadow-sm hover:shadow-md transition-shadow"
      : "";

    const hoverClasses = hover
      ? "hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`
          rounded-lg
          ${variants[variant]}
          ${paddings[padding]}
          ${shadowClasses}
          ${hoverClasses}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

/**
 * Card header component
 */
export const CardHeader = ({
  children,
  className = "",
  action,
  divider = true,
}) => (
  <div
    className={`flex items-center justify-between ${divider ? "pb-4 mb-4 border-b border-gray-200 dark:border-gray-700" : ""} ${className}`}
  >
    <div className="flex-1">{children}</div>
    {action && <div className="ml-4">{action}</div>}
  </div>
);

/**
 * Card title component
 */
export const CardTitle = ({ children, className = "", subtitle }) => (
  <div className={className}>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </h3>
    {subtitle && (
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    )}
  </div>
);

/**
 * Card footer component
 */
export const CardFooter = ({ children, className = "", divider = true }) => (
  <div
    className={`${divider ? "pt-4 mt-4 border-t border-gray-200 dark:border-gray-700" : ""} ${className}`}
  >
    {children}
  </div>
);

export default Card;
