// frontend/src/hooks/useTasks.js

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  setSelectedTask,
  setFilters,
  clearFilters,
} from "../store/slices/tasksSlice";

export const useTasks = () => {
  const dispatch = useDispatch();
  const { items, selectedTask, filters, loading, error } = useSelector(
    (state) => state.tasks,
  );

  const getTasks = useCallback(
    (filters) => {
      return dispatch(fetchTasks(filters));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (taskData) => {
      return dispatch(createTask(taskData));
    },
    [dispatch],
  );

  const editTask = useCallback(
    (taskId, updates) => {
      return dispatch(updateTask({ taskId, updates }));
    },
    [dispatch],
  );

  const removeTask = useCallback(
    (taskId) => {
      return dispatch(deleteTask(taskId));
    },
    [dispatch],
  );

  const selectTask = useCallback(
    (task) => {
      dispatch(setSelectedTask(task));
    },
    [dispatch],
  );

  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch],
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return {
    tasks: items,
    selectedTask,
    filters,
    loading,
    error,
    getTasks,
    addTask,
    editTask,
    removeTask,
    selectTask,
    updateFilters,
    resetFilters,
  };
};

export default useTasks;
