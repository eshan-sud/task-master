// frontend/src/store/slices/commentsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../ApiEndpoints";

// Async thunks
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.getComments(taskId), {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      return data.comments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ taskId, text, mentions, parentComment }, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.createComment(taskId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text, mentions, parentComment }),
      });
      if (!response.ok) throw new Error("Failed to create comment");
      const data = await response.json();
      return data.comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, text }, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.updateComment(commentId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error("Failed to update comment");
      const data = await response.json();
      return data.comment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.deleteComment(commentId), {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete comment");
      return commentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addReaction = createAsyncThunk(
  "comments/addReaction",
  async ({ commentId, emoji }, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.addReaction(commentId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emoji }),
      });
      if (!response.ok) throw new Error("Failed to add reaction");
      const data = await response.json();
      return data.comment;
    } catch (error) {
      return rejectWithValue(error.message);
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
