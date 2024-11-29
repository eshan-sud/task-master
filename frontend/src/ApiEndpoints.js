// filename - frontend/src/ApiEndpoints.js

// Base URL
const baseURL = "http://localhost:8000/api/v1/";

export const endpoints = {
  // Auth Endpoints
  loginAuth: `${baseURL}auth/login`, // POST
  logoutAuth: `${baseURL}auth/logout`, // GET
  registerAuth: `${baseURL}auth/register`, // POST
  userExists: `${baseURL}auth/userExists`, // POST
  resetPassword: `${baseURL}auth/resetPassword`, // PUT

  // Account Endpoints
  verifyAccount: `${baseURL}account/verify`, // GET
  // deleteAccount: `${baseURL}account/delete` // DELETE
  // updateAccount: `${baseURL}account/update` // PUT

  // OTP Endpoints
  sendOTP: `${baseURL}auth/sendOTP`, // POST
  verifyOTP: `${baseURL}auth/verifyOTP`, // POST

  // Tasks Endpoints
  createTask: `${baseURL}tasks.createTask`, // POST
  getTasks: `${baseURL}tasks/getTasks`, //
  updateTask: `${baseURL}tasks/patchTask`, //
  delelteTask: `${baseURL}tasks/deleteTask`, //

  // Search Endpoint
  // userSearch: `${baseURL}search/userSearch`, //

  // Avatar Endpoints
  getUserAvatar: `${baseURL}avatar/getUserAvatar`, //GET
  uploadAvatar: `${baseURL}avatar/upload`, //POST
  removeAvatar: `${baseURL}avatar/removeAvatar`, // DELETE
};
