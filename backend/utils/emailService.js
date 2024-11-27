// filename - backend/utils/emailService.js

require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Sends an OTP email to the specified user.
 * @param {string} email - Recipient's email address.
 * @param {string} otp - The OTP to be sent.
 */
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully!");
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("Could not send OTP email");
  }
  return true;
};

module.exports = { sendOTPEmail };
