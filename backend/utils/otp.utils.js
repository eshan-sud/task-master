// filename - backend/utils/otp.utils.js

const crypto = require("crypto");

const OTP_EXPIRY_TIME = 5 * 60 * 1000;

const generateRandomValue = () => {
  return crypto.randomInt(100000, 1000000);
};

module.exports = {
  OTP_EXPIRY_TIME,
  generateRandomValue,
};
