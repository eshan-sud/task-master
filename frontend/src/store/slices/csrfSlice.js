// frontend/src/store/slices/csrfSlice.js

import { createSlice } from "@reduxjs/toolkit";

const csrfSlice = createSlice({
  name: "csrf",
  initialState: {
    token: null,
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.lastFetched = Date.now();
      state.error = null;
    },
    clearToken: (state) => {
      state.token = null;
      state.lastFetched = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setToken, clearToken, setLoading, setError } = csrfSlice.actions;
export default csrfSlice.reducer;
