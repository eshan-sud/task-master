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

const sendOtpVerificationEmail = async (otp, email) => {
  try {
    mailOptions["to"] = email;
    mailOptions["subject"] = "Password Reset | Task Master";
    mailOptions[
      "text"
    ] = `Hello,\n\nYour OTP for password reset is: ${otp}\n\nThis link will expire in 5 minutes.`;
    // console.log(mailOptions);
    // Send the OTP to the user's email
    return await sendEmail(mailOptions);
  } catch (error) {
    return false;
  }
};

const sendAccountVerificationEmail = async (otp, email) => {
  try {
    const verificationUrl = `http://localhost:3000/verify-account?email=${email}`;
    mailOptions[subject] = "Account Verification | Task Master";
    mailOptions[
      text
    ] = `Hello,\n\nYour OTP for account verification is: ${otp}\n\nPlease click the following link to verify your account:\n\n${verificationUrl}\n\nThis link will expire in 5 minutes.`;
    // Send the OTP to the user's email
    if (await sendEmail(mailOptions)) {
      sendAccountVerifiedEmail(email);
      return res.status(200).json({ message: "Verification email sent" });
    }
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const sendAccountVerifiedEmail = async (email) => {
  try {
    mailOptions[subject] = "Account Verification | Task Master";
    mailOptions[text] = `Hello,\n\nYour account has been verified.`;
    if (await sendEmail(mailOptions)) {
      return res.status(200).json({ message: "Verification email sent" });
    }
    console.log(`Account Verified email sent to ${email}`);
  } catch (error) {
    console.error("Error sending account verified email:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  sendTaskNotificationEmail,
  sendPasswordChangedEmail,
  sendOtpVerificationEmail,
  sendAccountVerificationEmail,
  sendAccountVerifiedEmail,
};
