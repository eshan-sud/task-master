// frontend/src/utils/DateFormatter.jsx

/**
 * Utility functions for better date formatting and display
 */

export const formatRelativeTime = (date) => {
  if (!date) return "";

  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
};

export const formatDate = (date, format = "short") => {
  if (!date) return "";

  const d = new Date(date);

  const formats = {
    short: { month: "short", day: "numeric" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
    time: { hour: "numeric", minute: "2-digit" },
    datetime: {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  };

  return d.toLocaleDateString("en-US", formats[format] || formats.medium);
};

export const formatTime = (date) => {
  if (!date) return "";

  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatDateTime = (date) => {
  if (!date) return "";

  return `${formatDate(date, "medium")} at ${formatTime(date)}`;
};

export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (date) => {
  if (!date) return false;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const d = new Date(date);
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
};

export const isOverdue = (date) => {
  if (!date) return false;
  const now = new Date();
  const d = new Date(date);
  return d < now;
};

export const getDaysUntil = (date) => {
  if (!date) return null;
  const now = new Date();
  const d = new Date(date);
  const diffInMs = d - now;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

export const formatDueDate = (date) => {
  if (!date) return "";

  if (isToday(date)) {
    return `Today at ${formatTime(date)}`;
  }

  if (isTomorrow(date)) {
    return `Tomorrow at ${formatTime(date)}`;
  }

  if (isOverdue(date)) {
    return `Overdue ${formatRelativeTime(date)}`;
  }

  const daysUntil = getDaysUntil(date);
  if (daysUntil <= 7) {
    return `In ${daysUntil} ${daysUntil === 1 ? "day" : "days"}`;
  }

  return formatDate(date, "medium");
};

export const getDateRangeText = (startDate, endDate) => {
  if (!startDate && !endDate) return "";

  if (startDate && !endDate) {
    return `From ${formatDate(startDate)}`;
  }

  if (!startDate && endDate) {
    return `Until ${formatDate(endDate)}`;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.getDate()}-${end.getDate()} ${formatDate(start, "short")}`;
  }

  return `${formatDate(startDate, "short")} - ${formatDate(endDate, "short")}`;
};
