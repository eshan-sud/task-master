// frontend/src/hooks/useKeyboardShortcuts.jsx

import { useEffect } from "react";

/**
 * Custom hook for keyboard shortcuts
 *
 * Usage:
 * useKeyboardShortcuts({
 *   "ctrl+k": () => console.log("Search triggered"),
 *   "ctrl+n": () => console.log("New item"),
 *   "escape": () => console.log("Close modal")
 * });
 */
export const useKeyboardShortcuts = (shortcuts, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey; // Support both Ctrl and Cmd
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Build shortcut string
      let shortcut = "";
      if (ctrl) shortcut += "ctrl+";
      if (shift) shortcut += "shift+";
      if (alt) shortcut += "alt+";
      shortcut += key;

      // Check if this shortcut has a handler
      const handler = shortcuts[shortcut] || shortcuts[key];

      if (handler) {
        // Prevent default browser behavior for this shortcut
        event.preventDefault();
        event.stopPropagation();
        handler(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts, enabled]);
};

/**
 * Predefined keyboard shortcuts for common actions
 */
export const KeyboardShortcuts = {
  // Navigation
  SEARCH: "ctrl+k",
  NEW_TASK: "ctrl+n",
  SAVE: "ctrl+s",
  CLOSE: "escape",
  REFRESH: "ctrl+r",

  // Task actions
  COMPLETE_TASK: "ctrl+enter",
  DELETE_TASK: "ctrl+d",
  EDIT_TASK: "ctrl+e",

  // Navigation
  NEXT_ITEM: "arrowdown",
  PREV_ITEM: "arrowup",
  FIRST_ITEM: "home",
  LAST_ITEM: "end",

  // UI
  TOGGLE_SIDEBAR: "ctrl+b",
  TOGGLE_THEME: "ctrl+shift+t",
  OPEN_SETTINGS: "ctrl+,",

  // Help
  SHOW_SHORTCUTS: "ctrl+/",
};

/**
 * Hook for global keyboard shortcuts in the app
 */
export const useGlobalShortcuts = ({
  onSearch,
  onNewTask,
  onToggleTheme,
  onToggleSidebar,
  onShowShortcuts,
}) => {
  const shortcuts = {};

  if (onSearch) shortcuts["ctrl+k"] = onSearch;
  if (onNewTask) shortcuts["ctrl+n"] = onNewTask;
  if (onToggleTheme) shortcuts["ctrl+shift+t"] = onToggleTheme;
  if (onToggleSidebar) shortcuts["ctrl+b"] = onToggleSidebar;
  if (onShowShortcuts) shortcuts["ctrl+/"] = onShowShortcuts;

  useKeyboardShortcuts(shortcuts);
};

/**
 * Hook for modal keyboard shortcuts
 */
export const useModalShortcuts = ({ onClose, onSave }) => {
  const shortcuts = {};

  if (onClose) shortcuts["escape"] = onClose;
  if (onSave) shortcuts["ctrl+s"] = onSave;

  useKeyboardShortcuts(shortcuts);
};

/**
 * Hook for list navigation keyboard shortcuts
 */
export const useListNavigation = ({ items, onSelect, selectedIndex = 0 }) => {
  useEffect(() => {
    let currentIndex = selectedIndex;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      switch (key) {
        case "arrowdown":
          event.preventDefault();
          currentIndex = Math.min(currentIndex + 1, items.length - 1);
          if (onSelect) onSelect(items[currentIndex], currentIndex);
          break;

        case "arrowup":
          event.preventDefault();
          currentIndex = Math.max(currentIndex - 1, 0);
          if (onSelect) onSelect(items[currentIndex], currentIndex);
          break;

        case "home":
          event.preventDefault();
          currentIndex = 0;
          if (onSelect) onSelect(items[0], 0);
          break;

        case "end":
          event.preventDefault();
          currentIndex = items.length - 1;
          if (onSelect) onSelect(items[currentIndex], currentIndex);
          break;

        case "enter":
          event.preventDefault();
          if (items[currentIndex]) {
            // Trigger action on current item
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, onSelect, selectedIndex]);
};

export default useKeyboardShortcuts;
