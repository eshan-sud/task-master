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
  to: email,
  subject: "",
  text: "",
};

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_ID,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} with subject "${subject}"`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

const generateVerificationEmail = async (userEmail) => {
  try {
    const otp = generateRandomValue();
    const verificationUrl = `http://localhost:3000/verify-account?otp=${otp}&email=${userEmail}`;
    mailOptions[subject] = "Account Verification | Task Master";
    mailOptions[
      text
    ] = `Hello,\n\nYour OTP for account verification is: ${otp}\n\nPlease click the following link to verify your account:\n\n${verificationUrl}\n\nThis link will expire in 10 minutes.`;

    // Store OTP in memory (or a database in production)
    userOtpStore[userEmail] = otp;

    // Send the OTP to the user's email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending email:", error);
    }

    console.log("Verification email sent.");
  } catch (error) {
    console.error("Error generating or sending verification email:", error);
  }
};

module.exports = { sendEmail };
