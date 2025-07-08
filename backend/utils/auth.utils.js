// backend/utils/auth.utils.js

const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "1h";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

const accessTokenCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 60 * 60 * 1000, // 1 hour
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const generateAccessToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

// Google Captcha Verification
const verifyCaptcha = async (captchaToken) => {
  try {
    const GOOGLE_RECAPTCHA_SECRET_KEY = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
    // Make sure secret & token are available
    if (!GOOGLE_RECAPTCHA_SECRET_KEY || !captchaToken) {
      throw new Error("Missing required parameters: secret or captcha token.");
    }
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: GOOGLE_RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        }),
      }
    );
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    return false;
  }
};

module.exports = {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  generateAccessToken,
  generateRefreshToken,
  verifyCaptcha,
  verifyAccessToken,
  verifyRefreshToken,
};
