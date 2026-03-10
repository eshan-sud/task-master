// frontend/src/store/slices/commentsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api.service";

// Async thunks
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/comments/task/${taskId}`);
      return response.data.comments || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch comments" },
      );
    }
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ taskId, text, mentions, parentComment }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/comments/task/${taskId}`, {
        text,
        mentions,
        parentComment,
      });
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to create comment" },
      );
    }
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, text }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(`/comments/${commentId}`, {
        text,
      });
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to update comment" },
      );
    }
  },
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await apiService.delete(`/comments/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to delete comment" },
      );
    }
  },
);

export const addReaction = createAsyncThunk(
  "comments/addReaction",
  async ({ commentId, emoji }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `/comments/${commentId}/reaction`,
        {
          emoji,
        },
      );
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to add reaction" },
      );
    }
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byTaskId: {}, // { [taskId]: { items: [], loading: false, error: null } }
  },
  reducers: {
    // Real-time updates
    commentAdded: (state, action) => {
      const { taskId, comment } = action.payload;
      if (!state.byTaskId[taskId]) {
        state.byTaskId[taskId] = { items: [], loading: false, error: null };
      }
      state.byTaskId[taskId].items.unshift(comment);
    },
    commentUpdated: (state, action) => {
      const comment = action.payload;
      const taskComments = state.byTaskId[comment.taskId];
      if (taskComments) {
        const index = taskComments.items.findIndex(
          (c) => c._id === comment._id,
        );
        if (index !== -1) {
          taskComments.items[index] = comment;
        }
      }
    },
    commentDeleted: (state, action) => {
      const { taskId, commentId } = action.payload;
      const taskComments = state.byTaskId[taskId];
      if (taskComments) {
        taskComments.items = taskComments.items.filter(
          (c) => c._id !== commentId,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state, action) => {
        const taskId = action.meta.arg;
        if (!state.byTaskId[taskId]) {
          state.byTaskId[taskId] = { items: [], loading: false, error: null };
        }
        state.byTaskId[taskId].loading = true;
        state.byTaskId[taskId].error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const taskId = action.meta.arg;
        state.byTaskId[taskId].loading = false;
        state.byTaskId[taskId].items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const taskId = action.meta.arg;
        state.byTaskId[taskId].loading = false;
        state.byTaskId[taskId].error = action.payload;
      })
      // Create comment
      .addCase(createComment.fulfilled, (state, action) => {
        const comment = action.payload;
        const taskId = comment.taskId;
        if (!state.byTaskId[taskId]) {
          state.byTaskId[taskId] = { items: [], loading: false, error: null };
        }
        state.byTaskId[taskId].items.unshift(comment);
      })
      // Update comment
      .addCase(updateComment.fulfilled, (state, action) => {
        const comment = action.payload;
        const taskComments = state.byTaskId[comment.taskId];
        if (taskComments) {
          const index = taskComments.items.findIndex(
            (c) => c._id === comment._id,
          );
          if (index !== -1) {
            taskComments.items[index] = comment;
          }
        }
      })
      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const commentId = action.payload;
        // Find and remove from all tasks (inefficient but works)
        Object.keys(state.byTaskId).forEach((taskId) => {
          state.byTaskId[taskId].items = state.byTaskId[taskId].items.filter(
            (c) => c._id !== commentId,
          );
        });
      })
      // Add reaction
      .addCase(addReaction.fulfilled, (state, action) => {
        const comment = action.payload;
        const taskComments = state.byTaskId[comment.taskId];
        if (taskComments) {
          const index = taskComments.items.findIndex(
            (c) => c._id === comment._id,
          );
          if (index !== -1) {
            taskComments.items[index] = comment;
          }
        }
      });
  },
});

export const { commentAdded, commentUpdated, commentDeleted } =
  commentsSlice.actions;

export default commentsSlice.reducer;
