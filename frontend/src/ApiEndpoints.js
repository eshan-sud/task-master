// filename - frontend/src/ApiEndpoints.js

// Base URL
const baseURL = "http://localhost:8000/api/v1/";

export const endpoints = {
  // Auth Endpoints
  loginAuth: `${baseURL}auth/login`, // POST
  logoutAuth: `${baseURL}auth/logout`, // GET
  registerAuth: `${baseURL}auth/register`, // POST
  checkUserExists: `${baseURL}auth/checkUserExists`, // POST
  resetPassword: `${baseURL}auth/resetPassword`, // PATCH
  getVerificationStatus: `${baseURL}auth/getVerificationStatus`, // GET
  // OTP Endpoints
  sendOTP: `${baseURL}auth/sendOTP`, // POST
  verifyOTP: `${baseURL}auth/verifyOTP`, // POST

  // Account Endpoints
  getBio: `${baseURL}account/getBio`, // GET
  changePassword: `${baseURL}account/changePassword`, // PATCH
  deleteAccount: `${baseURL}account/deleteAccount`, // DELETE
  updateProfile: `${baseURL}account/updateProfile`, // PATCH
  updateSettings: `${baseURL}account/updateSettings`, // PATCH
  exportData: `${baseURL}account/exportData`, // POST

  // Tasks Endpoints
  createTask: `${baseURL}tasks.createTask`, // POST
  getTasks: `${baseURL}tasks/getTasks`, // GET
  updateTask: `${baseURL}tasks/updateTask`, // PUT
  deleteTask: `${baseURL}tasks/deleteTask`, // DELETE
  archiveTask: `${baseURL}tasks/archiveTask`, // GET

  // Search Endpoint
  userSearch: `${baseURL}search/userSearch`, // GET

  // Avatar Endpoints
  getUserAvatar: `${baseURL}avatar/getUserAvatar`, //GET
  uploadAvatar: `${baseURL}avatar/upload`, //POST
  removeAvatar: `${baseURL}avatar/removeAvatar`, // DELETE
};
