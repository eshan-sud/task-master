// frontend/src/hooks/useAccessibility.jsx

import { useEffect } from "react";

/**
 * Hook to announce screen reader messages
 */
export const useAnnounce = (message, priority = "polite") => {
  useEffect(() => {
    if (!message) return;

    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only"; // Screen reader only
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    const timeout = setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    };
  }, [message, priority]);
};

/**
 * Hook for keyboard navigation in lists
 */
export const useListKeyboardNavigation = ({
  items,
  selectedIndex,
  onSelect,
  onEnter,
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled || !items || items.length === 0) return;

    const handleKeyDown = (e) => {
      let newIndex = selectedIndex;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          newIndex = Math.min(selectedIndex + 1, items.length - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          newIndex = Math.max(selectedIndex - 1, 0);
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = items.length - 1;
          break;
        case "Enter":
          e.preventDefault();
          if (onEnter) {
            onEnter(items[selectedIndex], selectedIndex);
          }
          return;
        default:
          return;
      }

      if (newIndex !== selectedIndex && onSelect) {
        onSelect(items[newIndex], newIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onSelect, onEnter, enabled]);
};

/**
 * Hook to trap focus within a modal/dialog
 */
export const useFocusTrap = (ref, active = true) => {
  useEffect(() => {
    if (!active || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);

    // Focus first element when activated
    firstElement?.focus();

    return () => {
      element.removeEventListener("keydown", handleTabKey);
    };
  }, [ref, active]);
};

/**
 * Hook to manage document title dynamically
 */
export const useDocumentTitle = (title, prefix = "Task Master") => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${prefix}` : prefix;

    return () => {
      document.title = previousTitle;
    };
  }, [title, prefix]);
};

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return prefersReducedMotion;
};

export default useAnnounce;
