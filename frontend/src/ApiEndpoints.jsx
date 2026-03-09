// frontend/src/ApiEndpoints.jsx

// Base URL
const baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8023/api/v1/";

export const endpoints = {
  // Auth Endpoints
  loginAuth: `${baseURL}auth/login`, // POST
  logoutAuth: `${baseURL}auth/logout`, // GET
  registerAuth: `${baseURL}auth/register`, // POST
  checkUserExists: `${baseURL}auth/checkUserExists`, // POST
  resetPassword: `${baseURL}auth/resetPassword`, // PATCH
  getVerificationStatus: `${baseURL}auth/getVerificationStatus`, // GET
  refreshToken: `${baseURL}auth/refreshToken`, // GET
  logoutAllDevices: `${baseURL}auth/logoutAllDevices`, // POST

  // OTP Endpoints
  sendOTP: `${baseURL}otp/sendOTP`, // POST
  verifyOTP: `${baseURL}otp/verifyOTP`, // POST

  // Account Endpoints
  getProfile: `${baseURL}account/getProfile`, // GET
  changePassword: `${baseURL}account/changePassword`, // PATCH
  deleteAccount: `${baseURL}account/deleteAccount`, // DELETE
  updateProfile: `${baseURL}account/updateProfile`, // PATCH
  getUserSettings: `${baseURL}account/getUserSettings`, // GET
  updateSettings: `${baseURL}account/updateSettings`, // PATCH
  exportData: `${baseURL}account/exportData`, // POST
  getUserSessions: `${baseURL}account/getUserSessions`, // GET

  // Avatar Endpoints
  getUserAvatar: `${baseURL}avatar/getUserAvatar`, // GET
  uploadAvatar: `${baseURL}avatar/upload`, // POST
  removeAvatar: `${baseURL}avatar/removeAvatar`, // DELETE

  // Tasks Endpoints
  createTask: `${baseURL}tasks/create`, // POST
  getTasks: `${baseURL}tasks/list`, // GET
  updateTask: `${baseURL}tasks/update`, // PATCH
  deleteTask: `${baseURL}tasks/delete`, // DELETE
  restoreTask: `${baseURL}tasks/restore`, // PATCH
  getDeletedTasks: `${baseURL}tasks/recycle-bin`, // GET
  addSubtask: `${baseURL}tasks/subtask`, // POST
  getSubtasks: (taskId) => `${baseURL}tasks/subtasks/${taskId}`, // GET
  searchTasks: `${baseURL}tasks/search`, // GET
  getTaskStats: `${baseURL}tasks/stats`, // GET
  archiveTask: (taskId) => `${baseURL}tasks/${taskId}/archive`, // PATCH
  unarchiveTask: (taskId) => `${baseURL}tasks/${taskId}/unarchive`, // PATCH
  getArchivedTasks: `${baseURL}tasks/archived`, // GET
  bulkUpdateTasks: `${baseURL}tasks/bulk/update`, // PATCH
  bulkDeleteTasks: `${baseURL}tasks/bulk/delete`, // DELETE
  createRecurringTask: `${baseURL}tasks/recurring`, // POST

  // Category Endpoints
  createCategory: `${baseURL}categories/createCategory`, // POST
  getCategories: `${baseURL}categories/getCategories`, // GET
  updateCategory: (categoryId) =>
    `${baseURL}categories/updateCategory/${categoryId}`, // PATCH
  deleteCategory: (categoryId) =>
    `${baseURL}categories/deleteCategory/${categoryId}`, // DELETE

  // Teams Endpoints
  createTeam: `${baseURL}teams/create`, // POST
  getTeams: `${baseURL}teams`, // GET
  getTeam: (teamId) => `${baseURL}teams/${teamId}`, // GET
  updateTeam: (teamId) => `${baseURL}teams/${teamId}`, // PATCH
  deleteTeam: (teamId) => `${baseURL}teams/${teamId}`, // DELETE
  addTeamMember: (teamId) => `${baseURL}teams/${teamId}/members`, // POST
  removeTeamMember: (teamId, memberId) =>
    `${baseURL}teams/${teamId}/members/${memberId}`, // DELETE
  updateMemberRole: (teamId, memberId) =>
    `${baseURL}teams/${teamId}/members/${memberId}/role`, // PATCH

  // Notifications Endpoints
  getNotifications: `${baseURL}notifications`, // GET
  getUnreadCount: `${baseURL}notifications/unread-count`, // GET
  markAsRead: (notificationId) =>
    `${baseURL}notifications/${notificationId}/read`, // PATCH
  markAllAsRead: `${baseURL}notifications/mark-all-read`, // PATCH
  deleteNotification: (notificationId) =>
    `${baseURL}notifications/${notificationId}`, // DELETE

  // Comments Endpoints
  getComments: (taskId) => `${baseURL}comments/task/${taskId}`, // GET
  createComment: (taskId) => `${baseURL}comments/task/${taskId}`, // POST
  updateComment: (commentId) => `${baseURL}comments/${commentId}`, // PATCH
  deleteComment: (commentId) => `${baseURL}comments/${commentId}`, // DELETE
  addReaction: (commentId) => `${baseURL}comments/${commentId}/reaction`, // POST
  removeReaction: (commentId) => `${baseURL}comments/${commentId}/reaction`, // DELETE

  // Messages Endpoints
  getMessages: `${baseURL}messages`, // GET
  getConversations: `${baseURL}messages/conversations`, // GET
  sendMessage: `${baseURL}messages/send`, // POST
  markMessageRead: (messageId) => `${baseURL}messages/${messageId}/read`, // PATCH
  deleteMessage: (messageId) => `${baseURL}messages/${messageId}`, // DELETE

  // Task Sharing Endpoints
  shareTask: (taskId) => `${baseURL}task-share/${taskId}/share`, // POST
  getTaskShares: (taskId) => `${baseURL}task-share/${taskId}/shares`, // GET
  getSharedWithMe: `${baseURL}task-share/shared-with-me`, // GET
  updateSharePermissions: (shareId) =>
    `${baseURL}task-share/${shareId}/permissions`, // PATCH
  revokeShare: (shareId) => `${baseURL}task-share/${shareId}/revoke`, // DELETE
  checkPermissions: (taskId) => `${baseURL}task-share/${taskId}/permissions`, // GET

  // Search Endpoint
  userSearch: `${baseURL}search/userSearch`, // GET
};
