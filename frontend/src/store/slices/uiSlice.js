// frontend/src/store/slices/uiSlice.js

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modals: {
      createTask: false,
      editTask: false,
      shareTask: false,
      deleteConfirm: false,
    },
    sidebar: {
      isOpen: true,
      isCollapsed: false,
    },
    loading: {
      global: false,
      tasks: false,
      profile: false,
    },
    toasts: [],
  },
  reducers: {
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false;
      });
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    collapseSidebar: (state, action) => {
      state.sidebar.isCollapsed = action.payload;
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    addToast: (state, action) => {
      state.toasts.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const {
  openModal,
  closeModal,
  closeAllModals,
  toggleSidebar,
  collapseSidebar,
  setLoading,
  addToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;
