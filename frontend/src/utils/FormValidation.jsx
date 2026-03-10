// frontend/src/utils/FormValidation.jsx

/**
 * Enhanced form validation utilities with user-friendly error messages
 */

export const ValidationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message:
      "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
    weakMessage: "Password is too weak. Consider adding more variety.",
  },
  username: {
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_-]+$/,
    message:
      "Username must be 3-30 characters and contain only letters, numbers, hyphens, or underscores",
  },
  fullName: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message:
      "Full name must be 2-100 characters and contain only letters, spaces, hyphens, or apostrophes",
  },
  phone: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    message: "Please enter a valid phone number",
  },
  url: {
    pattern:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
    message: "Please enter a valid URL",
  },
  required: {
    message: "This field is required",
  },
};

export const validateField = (fieldName, value, rules = {}) => {
  // Required validation
  if (rules.required && (!value || value.trim() === "")) {
    return ValidationRules.required.message;
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim() === "") {
    return null;
  }

  // Email validation
  if (fieldName === "email" || rules.email) {
    if (!ValidationRules.email.pattern.test(value)) {
      return ValidationRules.email.message;
    }
  }

  // Password validation
  if (fieldName === "password" || rules.password) {
    if (value.length < ValidationRules.password.minLength) {
      return `Password must be at least ${ValidationRules.password.minLength} characters`;
    }
    if (rules.strong && !ValidationRules.password.pattern.test(value)) {
      return ValidationRules.password.message;
    }
  }

  // Username validation
  if (fieldName === "username" || rules.username) {
    if (value.length < ValidationRules.username.minLength) {
      return `Username must be at least ${ValidationRules.username.minLength} characters`;
    }
    if (value.length > ValidationRules.username.maxLength) {
      return `Username must be less than ${ValidationRules.username.maxLength} characters`;
    }
    if (!ValidationRules.username.pattern.test(value)) {
      return ValidationRules.username.message;
    }
  }

  // Full name validation
  if (fieldName === "fullName" || rules.fullName) {
    if (value.length < ValidationRules.fullName.minLength) {
      return `Name must be at least ${ValidationRules.fullName.minLength} characters`;
    }
    if (value.length > ValidationRules.fullName.maxLength) {
      return `Name must be less than ${ValidationRules.fullName.maxLength} characters`;
    }
    if (!ValidationRules.fullName.pattern.test(value)) {
      return "Name contains invalid characters";
    }
  }

  // Phone validation
  if (fieldName === "phone" || rules.phone) {
    if (!ValidationRules.phone.pattern.test(value)) {
      return ValidationRules.phone.message;
    }
  }

  // URL validation
  if (fieldName === "url" || rules.url) {
    if (!ValidationRules.url.pattern.test(value)) {
      return ValidationRules.url.message;
    }
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be less than ${rules.maxLength} characters`;
  }

  // Custom pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message || "Invalid format";
  }

  // Custom validation function
  if (rules.validate && typeof rules.validate === "function") {
    const customError = rules.validate(value);
    if (customError) return customError;
  }

  return null;
};

export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const error = validateField(
      fieldName,
      formData[fieldName],
      validationRules[fieldName],
    );
    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: "No password" };

  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  strength = Object.values(checks).filter(Boolean).length;

  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["red", "orange", "yellow", "blue", "green"];

  return {
    strength,
    label: labels[strength - 1] || "Very Weak",
    color: colors[strength - 1] || "red",
    checks,
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  // Remove leading/trailing whitespace
  let sanitized = input.trim();

  // Remove multiple spaces
  sanitized = sanitized.replace(/\s+/g, " ");

  // Remove potential XSS attempts (basic)
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, "");
  sanitized = sanitized.replace(/<[^>]+>/g, "");

  return sanitized;
};

export const formatErrorMessage = (error) => {
  if (typeof error === "string") return error;

  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;

  return "An unexpected error occurred. Please try again.";
};
