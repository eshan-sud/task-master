// backend/utils/encryption.utils.js

const crypto = require("crypto");

const encrypt = (text, secretKey) => {
  const iv = crypto.randomBytes(16); // 16 bytes = 128 bits IV for AES-CBC
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  // Return the encrypted data & IV
  return { encryptedData: encrypted, iv: iv.toString("hex") };
};

const decrypt = (encryptedData, secretKey, ivHex) => {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const deriveKey = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
      if (err) reject(err);
      resolve(key);
    });
  });
};

module.exports = { encrypt, decrypt, deriveKey };
