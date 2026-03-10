// frontend/src/store/slices/teamsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api.service";

// Async thunks
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get("/teams");
      return response.data.teams || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to fetch teams" },
      );
    }
  },
);

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await apiService.post("/teams/create", teamData);
      return response.data.team;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to create team" },
      );
    }
  },
);

export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ teamId, updates }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(`/teams/${teamId}`, updates);
      return response.data.team;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to update team" },
      );
    }
  },
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId, { rejectWithValue }) => {
    try {
      await apiService.delete(`/teams/${teamId}`);
      return teamId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to delete team" },
      );
    }
  },
);

export const addTeamMember = createAsyncThunk(
  "teams/addMember",
  async ({ teamId, email, role }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/teams/${teamId}/members`, {
        email,
        role,
      });
      return response.data.team;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: "Failed to add member" },
      );
    }
  },
);

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    items: [],
    selectedTeam: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    clearSelectedTeam: (state) => {
      state.selectedTeam = null;
    },
    // Real-time updates
    teamAdded: (state, action) => {
      state.items.unshift(action.payload);
    },
    teamUpdated: (state, action) => {
      const index = state.items.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    teamDeleted: (state, action) => {
      state.items = state.items.filter((t) => t._id !== action.payload);
      if (state.selectedTeam?._id === action.payload) {
        state.selectedTeam = null;
      }
    },
    teamRemoved: (state, action) => {
      state.items = state.items.filter((t) => t._id !== action.payload);
      if (state.selectedTeam?._id === action.payload) {
        state.selectedTeam = null;
      }
    },
    memberAdded: (state, action) => {
      const { teamId, member } = action.payload;
      const team = state.items.find((t) => t._id === teamId);
      if (team) {
        team.members.push(member);
      }
    },
    memberRemoved: (state, action) => {
      const { teamId, userId } = action.payload;
      const team = state.items.find((t) => t._id === teamId);
      if (team) {
        team.members = team.members.filter((m) => m.userId._id !== userId);
      }
    },
    memberRoleUpdated: (state, action) => {
      const { teamId, userId, role } = action.payload;
      const team = state.items.find((t) => t._id === teamId);
      if (team) {
        const member = team.members.find((m) => m.userId._id === userId);
        if (member) {
          member.role = role;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.teams || [];
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create team
      .addCase(createTeam.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update team
      .addCase(updateTeam.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete team
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      })
      // Add member
      .addCase(addTeamMember.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const {
  setSelectedTeam,
  clearSelectedTeam,
  teamAdded,
  teamUpdated,
  teamDeleted,
  teamRemoved,
  memberAdded,
  memberRemoved,
  memberRoleUpdated,
} = teamsSlice.actions;

export default teamsSlice.reducer;
