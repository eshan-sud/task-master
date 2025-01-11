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

const mailOptions = {
  from: process.env.GMAIL_ID,
  to: "",
  subject: "",
  text: "",
};

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Email sent to ${mailOptions["to"]} with subject "${mailOptions["subject"]}"`
    );
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

const sendTaskNotificationEmail = async (req, res) => {};

const sendPasswordChangedEmail = async (req, res) => {};

const sendOtpVerificationEmail = async (otp, email, purpose) => {
  try {
    let subject = "";
    let text = "";

    if (purpose === "password_reset") {
      subject = "Password Reset | Task Master";
      text = `Hello,\n\nYour OTP for password reset is: ${otp}\n\nThis OTP will expire in 5 minutes.`;
    } else if (purpose === "account_verification") {
      subject = "Account Verification | Task Master";
      text = `Hello,\n\nYour OTP for account verification is: ${otp}\n\nThis OTP will expire in 5 minutes.`;
    } else {
      return false; // Invalid purpose
    }
    mailOptions["to"] = email;
    mailOptions["subject"] = subject;
    mailOptions["text"] = text;
    return await sendEmail(mailOptions);
  } catch (error) {
    return false;
  }
};

const sendAccountVerifiedEmail = async (email) => {
  try {
    mailOptions["to"] = email;
    mailOptions["subject"] = "Account Verified | Task Master";
    mailOptions[
      "text"
    ] = `Hello, ${email}\n\nYour account has been successfully verified.`;
    return await sendEmail(mailOptions);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  sendTaskNotificationEmail,
  sendPasswordChangedEmail,
  sendOtpVerificationEmail,
  sendAccountVerifiedEmail,
};
