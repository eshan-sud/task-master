// filename - frontend/src/ApiEndpoints.js

// Base URL
const baseURL = "http://localhost:8000/api/v1/";

export const endpoints = {
  // Auth Endpoints
  loginAuth: `${baseURL}auth/login`, // post
  logoutAuth: `${baseURL}auth/logout`, // get
  registerAuth: `${baseURL}auth/register`, // post
  userExists: `${baseURL}auth/userExists`, // post
  resetPassword: `${baseURL}auth/resetPassword`, // put

  // OTP Endpoints
  sendOTP: `${baseURL}auth/sendOTP`, // post
  verifyOTP: `${baseURL}auth/verifyOTP`, // post

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
