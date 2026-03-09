// frontend/src/store/slices/messagesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../ApiEndpoints";

// Async thunks
export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.getConversations, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch conversations");
      const data = await response.json();
      return data.conversations;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ receiverId, teamId, page = 1 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit: 50 });
      if (receiverId) params.append("receiverId", receiverId);
      if (teamId) params.append("teamId", teamId);

      const response = await fetch(`${endpoints.getMessages}?${params}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      return { messages: data.messages, conversationId: receiverId || teamId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ receiverId, teamId, text, replyTo }, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.sendMessage, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ receiverId, teamId, text, replyTo }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markMessageAsRead = createAsyncThunk(
  "messages/markAsRead",
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.markMessageRead(messageId), {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to mark message as read");
      return messageId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    conversations: [],
    byConversationId: {}, // { [conversationId]: { items: [], loading: false, error: null } }
    activeConversation: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    clearActiveConversation: (state) => {
      state.activeConversation = null;
    },
    // Real-time updates
    messageReceived: (state, action) => {
      const message = action.payload;
      const conversationId = message.receiverId || message.teamId;
      
      if (!state.byConversationId[conversationId]) {
        state.byConversationId[conversationId] = { items: [], loading: false, error: null };
      }
      
      // Add to messages
      state.byConversationId[conversationId].items.push(message);
      
      // Update conversations list
      const convIndex = state.conversations.findIndex(
        (c) => c.userId === conversationId
      );
      if (convIndex !== -1) {
        state.conversations[convIndex].lastMessage = message;
        state.conversations[convIndex].unreadCount += 1;
        // Move to top
        const conv = state.conversations.splice(convIndex, 1)[0];
        state.conversations.unshift(conv);
      }
    },
    messageSent: (state, action) => {
      const { tempId, message } = action.payload;
      const conversationId = message.receiverId || message.teamId;
      
      if (state.byConversationId[conversationId]) {
        // Replace temp message with real message
        const tempIndex = state.byConversationId[conversationId].items.findIndex(
          (m) => m.tempId === tempId
        );
        if (tempIndex !== -1) {
          state.byConversationId[conversationId].items[tempIndex] = message;
        } else {
          state.byConversationId[conversationId].items.push(message);
        }
      }
    },
    messageDeleted: (state, action) => {
      const messageId = action.payload;
      Object.keys(state.byConversationId).forEach((conversationId) => {
        state.byConversationId[conversationId].items = 
          state.byConversationId[conversationId].items.filter((m) => m._id !== messageId);
      });
    },
    addTempMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.byConversationId[conversationId]) {
        state.byConversationId[conversationId] = { items: [], loading: false, error: null };
      }
      state.byConversationId[conversationId].items.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch messages
      .addCase(fetchMessages.pending, (state, action) => {
        const { receiverId, teamId } = action.meta.arg;
        const conversationId = receiverId || teamId;
        
        if (!state.byConversationId[conversationId]) {
          state.byConversationId[conversationId] = { items: [], loading: false, error: null };
        }
        state.byConversationId[conversationId].loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { messages, conversationId } = action.payload;
        state.byConversationId[conversationId].loading = false;
        state.byConversationId[conversationId].items = messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        const { receiverId, teamId } = action.meta.arg;
        const conversationId = receiverId || teamId;
        state.byConversationId[conversationId].loading = false;
        state.byConversationId[conversationId].error = action.payload;
      })
      // Send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload;
        const conversationId = message.receiverId || message.teamId;
        
        if (state.byConversationId[conversationId]) {
          // Check if message already exists (optimistic update)
          const exists = state.byConversationId[conversationId].items.some(
            (m) => m._id === message._id
          );
          if (!exists) {
            state.byConversationId[conversationId].items.push(message);
          }
        }
      })
      // Mark as read
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        const messageId = action.payload;
        Object.keys(state.byConversationId).forEach((conversationId) => {
          const message = state.byConversationId[conversationId].items.find(
            (m) => m._id === messageId
          );
          if (message) {
            message.isRead = true;
            message.readAt = new Date().toISOString();
          }
        });
      });
  },
});

export const {
  setActiveConversation,
  clearActiveConversation,
  messageReceived,
  messageSent,
  messageDeleted,
  addTempMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
