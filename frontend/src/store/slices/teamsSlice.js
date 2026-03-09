// frontend/src/store/slices/teamsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../ApiEndpoints";

// Async thunks
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.getTeams, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch teams");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.createTeam, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(teamData),
      });
      if (!response.ok) throw new Error("Failed to create team");
      const data = await response.json();
      return data.team;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ teamId, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.updateTeam(teamId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update team");
      const data = await response.json();
      return data.team;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.deleteTeam(teamId), {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete team");
      return teamId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addTeamMember = createAsyncThunk(
  "teams/addMember",
  async ({ teamId, email, role }, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.addTeamMember(teamId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, role }),
      });
      if (!response.ok) throw new Error("Failed to add member");
      const data = await response.json();
      return data.team;
    } catch (error) {
      return rejectWithValue(error.message);
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
    memberAdded: (state, action) => {
      const { teamId, member } = action.payload;
      const team = state.items.find((t) => t._id === teamId);
      if (team) {
        team.members.push(member);
      }
    },
    memberRemoved: (state, action) => {
      const { teamId, memberId } = action.payload;
      const team = state.items.find((t) => t._id === teamId);
      if (team) {
        team.members = team.members.filter((m) => m.userId._id !== memberId);
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
  teamUpdated,
  teamDeleted,
  memberAdded,
  memberRemoved,
} = teamsSlice.actions;

export default teamsSlice.reducer;
