// frontend/src/store/slices/notificationsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api.service";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/notifications");
      return response.data.notifications || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch notifications" },
      );
    }
  },
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await apiService.patch(`/notifications/${notificationId}/read`);
      return notificationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to mark as read" },
      );
    }
  },
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    notificationReceived: (state, action) => {
      state.items.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch notifications";
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.items.find((n) => n._id === action.payload);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          state.unreadCount -= 1;
        }
      });
  },
});

export const { notificationReceived, clearNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
