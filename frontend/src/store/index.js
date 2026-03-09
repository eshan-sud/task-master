// frontend/src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import uiReducer from "./slices/uiSlice";
import notificationsReducer from "./slices/notificationsSlice";
import teamsReducer from "./slices/teamsSlice";
import commentsReducer from "./slices/commentsSlice";
import messagesReducer from "./slices/messagesSlice";
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
    notifications: notificationsReducer,
    teams: teamsReducer,
    comments: commentsReducer,
    messages: messagesReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["socket/connected"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["socket.connection"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
