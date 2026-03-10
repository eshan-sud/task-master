// frontend/src/store/slices/tasksSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api.service";

// Helper function to normalize backend task to frontend format
const normalizeTask = (task) => ({
  ...task,
  title: task.title || task.text, // Support old 'text' field if present
});

// Async thunks for API calls
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ status, category }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (category) params.append("category", category);

      const response = await apiService.get(`/tasks/list?${params.toString()}`);
      const tasks = response.data.tasks || response.data || [];
      return tasks.map(normalizeTask);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch tasks" },
      );
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/tasks/create", {
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        status: taskData.status || "pending",
      });
      return normalizeTask(response.data.task);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to create task" },
      );
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updates }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch("/tasks/update", {
        taskId,
        title: updates.title,
        description: updates.description,
        category: updates.category,
        dueDate: updates.dueDate,
        priority: updates.priority,
        status: updates.status,
         pinned: updates.pinned,
      });
      return normalizeTask(response.data.task);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to update task" },
      );
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await apiService.delete("/tasks/delete", { taskId });
      return taskId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to delete task" },
      );
    }
  },
);

export const archiveTask = createAsyncThunk(
  "tasks/archiveTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(`/tasks/${taskId}/archive`);
      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to archive task" },
      );
    }
  },
);

export const fetchArchivedTasks = createAsyncThunk(
  "tasks/fetchArchivedTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/tasks/archived");
      return response.data.tasks || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch archived tasks" },
      );
    }
  },
);

export const unarchiveTask = createAsyncThunk(
  "tasks/unarchiveTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(`/tasks/${taskId}/unarchive`);
      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to unarchive task" },
      );
    }
  },
);

export const bulkUpdateTasks = createAsyncThunk(
  "tasks/bulkUpdateTasks",
  async ({ taskIds, updates }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch("/tasks/bulk-update", {
        taskIds,
        updates,
      });
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to bulk update tasks" },
      );
    }
  },
);

export const searchTasks = createAsyncThunk(
  "tasks/searchTasks",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await apiService.get(
        `/tasks/search?query=${encodeURIComponent(query)}`,
      );
      return response.data.tasks || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to search tasks" },
      );
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    archivedItems: [],
    selectedTask: null,
    searchResults: [],
    filters: {
      status: null,
      category: null,
      search: "",
    },
    loading: false,
    archiveLoading: false,
    error: null,
  },
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { status: null, category: null, search: "" };
    },
    // Optimistic update for real-time sync
    taskUpdated: (state, action) => {
      const index = state.items.findIndex(
        (task) => task._id === action.payload._id,
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    taskAdded: (state, action) => {
      state.items.unshift(action.payload);
    },
    taskRemoved: (state, action) => {
      state.items = state.items.filter((task) => task._id !== action.payload);
    },
    taskArchived: (state, action) => {
      state.items = state.items.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch tasks";
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to create task";
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedTask?._id === action.payload._id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to update task";
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
        if (state.selectedTask?._id === action.payload) {
          state.selectedTask = null;
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to delete task";
      })
      // Archive task
      .addCase(archiveTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (task) => task._id !== action.payload._id,
        );
      })
      .addCase(archiveTask.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to archive task";
      })
      // Fetch archived tasks
      .addCase(fetchArchivedTasks.pending, (state) => {
        state.archiveLoading = true;
        state.error = null;
      })
      .addCase(fetchArchivedTasks.fulfilled, (state, action) => {
        state.archiveLoading = false;
        state.archivedItems = action.payload;
      })
      .addCase(fetchArchivedTasks.rejected, (state, action) => {
        state.archiveLoading = false;
        state.error = action.payload?.error || "Failed to fetch archived tasks";
      })
      // Unarchive task
      .addCase(unarchiveTask.pending, (state) => {
        state.error = null;
      })
      .addCase(unarchiveTask.fulfilled, (state, action) => {
        state.archivedItems = state.archivedItems.filter(
          (task) => task._id !== action.payload._id,
        );
        state.items.unshift(action.payload);
      })
      .addCase(unarchiveTask.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to unarchive task";
      })
      // Bulk update tasks
      .addCase(bulkUpdateTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkUpdateTasks.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((updatedTask) => {
          const index = state.items.findIndex(
            (task) => task._id === updatedTask._id,
          );
          if (index !== -1) {
            state.items[index] = updatedTask;
          }
        });
      })
      .addCase(bulkUpdateTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to bulk update tasks";
      })
      // Search tasks
      .addCase(searchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to search tasks";
      });
  },
});

export const {
  setSelectedTask,
  setFilters,
  clearFilters,
  taskUpdated,
  taskAdded,
  taskRemoved,
  taskArchived,
} = tasksSlice.actions;

export default tasksSlice.reducer;
