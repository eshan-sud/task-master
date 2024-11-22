// Base URL
const baseURL = "http://localhost:8000/api/v1/";

export const endpoints = {
  // Auth Endpoints
  loginAuth: `${baseURL}auth/login`,
  logoutAuth: `${baseURL}auth/logout`,
  registerAuth: `${baseURL}auth/register`,
  resetPassword: `${baseURL}auth/resetPassword`,
  userSearch: `${baseURL}auth/userSearch`,
  generateOTP: `${baseURL}auth/generateOTP`,
  verifyOTP: `${baseURL}auth/verifyOTP`,

  // Avatar Endpoints
  uploadAvatar: `${baseURL}avatar/upload`,
  getUserAvatar: `${baseURL}auth/getUserAvatar`,
  removeAvatar: `${baseURL}avatar/removeAvatar`,
};
