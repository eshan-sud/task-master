// frontend/src/components/common/Input.jsx

import { useState } from "react";
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { validateField } from "../../utils/FormValidation";

/**
 * Enhanced input component with built-in validation and error display
 */
export const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  validationRules = {},
  disabled = false,
  autoFocus = false,
  className = "",
  showValidation = true,
  icon: Icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const error =
    touched && showValidation
      ? validateField(name, value, { required, ...validationRules })
      : null;

  const isValid = touched && value && !error;
  const inputType = type === "password" && showPassword ? "text" : type;

  const handleBlur = (e) => {
    setTouched(true);
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`
            w-full px-4 py-2.5 
            ${Icon ? "pl-10" : ""}
            ${type === "password" ? "pr-10" : ""}
            border-2 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            transition-all duration-200
            focus:outline-none
            disabled:bg-gray-100 dark:disabled:bg-gray-900
            disabled:cursor-not-allowed
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                : isValid
                  ? "border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900"
                  : isFocused
                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                    : "border-gray-300 dark:border-gray-600"
            }
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}

        {showValidation && touched && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {error ? (
              <FiAlertCircle className="text-red-500" size={18} />
            ) : (
              isValid && <FiCheckCircle className="text-green-500" size={18} />
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <FiAlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Textarea component with validation
 */
export const TextArea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  validationRules = {},
  disabled = false,
  rows = 4,
  maxLength,
  className = "",
  showValidation = true,
}) => {
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const error =
    touched && showValidation
      ? validateField(name, value, { required, ...validationRules })
      : null;

  const isValid = touched && value && !error;

  const handleBlur = (e) => {
    setTouched(true);
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-2.5 
            border-2 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            transition-all duration-200
            focus:outline-none
            resize-vertical
            disabled:bg-gray-100 dark:disabled:bg-gray-900
            disabled:cursor-not-allowed
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                : isValid
                  ? "border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900"
                  : isFocused
                    ? "border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                    : "border-gray-300 dark:border-gray-600"
            }
          `}
        />
      </div>

      <div className="flex justify-between items-start mt-1">
        <div className="flex-1">
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <FiAlertCircle size={14} />
              {error}
            </p>
          )}
        </div>
        {maxLength && (
          <p
            className={`text-xs ${
              value?.length >= maxLength
                ? "text-red-500"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {value?.length || 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
