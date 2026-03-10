// frontend/src/store/slices/categoriesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api.service";

// Async thunks
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/categories/getCategories");
      return response.data.categories || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch categories" },
      );
    }
  },
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        "/categories/createCategory",
        categoryData,
      );
      return response.data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to create category" },
      );
    }
  },
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, updates }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(
        `/categories/updateCategory/${categoryId}`,
        updates,
      );
      return response.data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to update category" },
      );
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await apiService.delete(`/categories/deleteCategory/${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to delete category" },
      );
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch categories";
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to create category";
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload._id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to update category";
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload,
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to delete category";
      });
  },
});

export const { clearCategoriesError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
