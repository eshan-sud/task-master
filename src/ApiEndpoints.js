// Base URL
const baseURL = "http://localhost:8000/api/v1/";

export const endpoints = {
  // Auth Endpoint
  loginAuth: `${baseURL}auth/login`,
  logoutAuth: `${baseURL}auth/logout`,
  resetPassword: `${baseURL}auth/resetPassword`,
  registerAuth: `${baseURL}auth/register`,
};
