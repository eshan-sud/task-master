// backend/utils/auth.utils.js

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const setUser = (user) => {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error occurred during getUser:", error);
    return null;
  }
};

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

const verifyUser = async (email) => {
  try {
  } catch (error) {}
};

module.exports = {
  setUser,
  getUser,
  verifyCaptcha,
  verifyUser,
};
