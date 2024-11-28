// filename - backend/utils/otp.utils.js

require("dotenv").config();
const crypto = require("crypto");
const OTP_SECRET_KEY = process.env.OTP_SECRET_KEY;

// Constants
const AES_KEY_SIZE = 32; // AES-256 requires a 32-byte key
const IV_SIZE = 16; // AES-CBC requires a 16-byte IV

// const OTP_EXPIRY_TIME = 5 * 60 * 1000;

// Derive a 32-byte key from the OTP_SECRET_KEY (if it's not already 32 bytes long)
const keyBuffer = crypto.createHash("sha256").update(OTP_SECRET_KEY).digest();

// Encrypt OTP using AES-256-CBC with a random IV
const encryptOTP = (otp) => {
  const iv = crypto.randomBytes(IV_SIZE); // Generate a random IV
  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
  let encrypted = cipher.update(otp, "utf8", "hex");
  encrypted += cipher.final("hex");
  // Return the IV and the encrypted OTP as a combined string (separated by ':')
  return iv.toString("hex") + ":" + encrypted; // IV + ":" + encrypted OTP
};

// Decrypt OTP using AES-256-CBC
const decryptOTP = (encryptedOTP) => {
  const parts = encryptedOTP.split(":");
  const iv = Buffer.from(parts[0], "hex"); // Extract the IV from the stored value
  const encrypted = parts[1]; // The actual encrypted OTP
  const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Generate a new OTP and encrypt it
const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// Compare received OTP with the stored (encrypted) OTP
const compareOTP = (receivedOtp, storedOtp) => {
  return receivedOtp === decryptOTP(storedOtp);
};

module.exports = { encryptOTP, generateOTP, compareOTP };
