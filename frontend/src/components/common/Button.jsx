// frontend/src/components/common/Button.jsx

import { forwardRef } from "react";
import { FiLoader } from "react-icons/fi";

/**
 * Reusable button component with consistent styling and variants
 */
export const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      fullWidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loadingText,
      onClick,
      type = "button",
      className = "",
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-sm",
      secondary:
        "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white shadow-sm",
      success:
        "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white shadow-sm",
      danger:
        "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white shadow-sm",
      warning:
        "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white shadow-sm",
      outline:
        "bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500",
      ghost:
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500",
      link: "bg-transparent hover:underline text-blue-600 dark:text-blue-400 focus:ring-blue-500 p-0",
    };

    const sizes = {
      xs: "px-2.5 py-1.5 text-xs",
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${isLoading ? "cursor-wait" : ""}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <FiLoader className="animate-spin" size={16} />
            {loadingText || children}
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon size={16} />}
            {children}
            {RightIcon && <RightIcon size={16} />}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

/**
 * Icon button component
 */
export const IconButton = forwardRef(
  (
    {
      icon: Icon,
      label,
      variant = "ghost",
      size = "md",
      isLoading = false,
      disabled = false,
      onClick,
      className = "",
      ...props
    },
    ref,
  ) => {
    const sizes = {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2",
      lg: "p-3",
      xl: "p-4",
    };

    const iconSizes = {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
    };

    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
      secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white",
      danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
      ghost:
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400 focus:ring-gray-500",
      outline:
        "bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500",
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        aria-label={label}
        title={label}
        className={`
          inline-flex items-center justify-center
          rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <FiLoader className="animate-spin" size={iconSizes[size]} />
        ) : (
          Icon && <Icon size={iconSizes[size]} />
        )}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

/**
 * Button group component
 */
export const ButtonGroup = ({ children, className = "" }) => (
  <div className={`inline-flex rounded-lg shadow-sm ${className}`} role="group">
    {children}
  </div>
);

export default Button;
