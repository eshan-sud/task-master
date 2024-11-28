// filename - frontend/src/ApiEndpoints.js

// Base URL
const baseURL = "http://localhost:8000/api/v1/";

export const endpoints = {
  // Auth Endpoints
  loginAuth: `${baseURL}auth/login`,
  logoutAuth: `${baseURL}auth/logout`,
  registerAuth: `${baseURL}auth/register`,
  userExists: `${baseURL}auth/userExists`,
  resetPassword: `${baseURL}auth/resetPassword`,

  // OTP Endpoints
  sendOTP: `${baseURL}auth/sendOTP`,
  verifyOTP: `${baseURL}auth/verifyOTP`,

  // Tasks Endpoints
  getTasks: `${baseURL}tasks/getTasks`,
  updateTask: `${baseURL}tasks/patchTask`,
  delelteTask: `${baseURL}tasks/deleteTask`,

  // Search Endpoint
  // userSearch: `${baseURL}auth/userSearch`,

  // Avatar Endpoints
  getUserAvatar: `${baseURL}avatar/getUserAvatar`,
  uploadAvatar: `${baseURL}avatar/upload`,
  removeAvatar: `${baseURL}avatar/removeAvatar`,
};
