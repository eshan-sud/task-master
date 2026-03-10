// frontend/src/store/slices/presenceSlice.js

import { createSlice } from "@reduxjs/toolkit";

const presenceSlice = createSlice({
  name: "presence",
  initialState: {
    onlineUsers: {}, // { userId: { username, lastSeen } }
  },
  reducers: {
    userOnline: (state, action) => {
      const { userId, username } = action.payload;
      state.onlineUsers[userId] = {
        username,
        lastSeen: new Date().toISOString(),
        isOnline: true,
      };
    },
    userOffline: (state, action) => {
      const { userId } = action.payload;
      if (state.onlineUsers[userId]) {
        state.onlineUsers[userId].isOnline = false;
        state.onlineUsers[userId].lastSeen = new Date().toISOString();
      }
    },
    clearPresence: (state) => {
      state.onlineUsers = {};
    },
  },
});

export const { userOnline, userOffline, clearPresence } = presenceSlice.actions;

export default presenceSlice.reducer;
