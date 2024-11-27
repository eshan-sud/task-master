// filename - backend/controllers/emailVerification.controller.js

const OTP = require("../models/otp.model");
const User = require("../models/user.model");
const { generateOTP, OTP_EXPIRY_TIME } = require("../utils/otpUtils");
const { sendEmail } = require("../utils/emailService");

const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const otp = generateOTP();
    // Hash the OTP for secure storage
    const hashedOTP = await bcrypt.hash(otp.toString(), 10);
    // Store OTP in the database
    await OTP.create({ email, otp: hashedOTP });
    // Send verification email
    const verificationUrl = `http://localhost:3000/verify-account?otp=${otp}&email=${email}`;
    const emailSent = await sendEmail(
      email,
      "Account Verification | Task Master",
      `Your OTP for account verification is: ${otp}\n\nVerification Link: ${verificationUrl}\n\nExpires in 10 minutes.`
    );
    if (emailSent) {
      return res.status(200).json({ message: "Verification email sent" });
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const verifyAccount = async (req, res) => {
  const { otp, email } = req.query;
  if (!otp || !email) {
    return res.status(400).send("Invalid OTP or email");
  }
  try {
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(400).send("OTP expired or not found");
    }
    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return res.status(400).send("Invalid OTP");
    }
    // Mark account as verified
    await User.updateOne({ email }, { verified: true });
    // Remove OTP after successful verification
    await OTP.deleteOne({ email });
    return res.send("Your account has been verified successfully!");
  } catch (error) {
    console.error("Error verifying account:", error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = { sendVerificationEmail, verifyAccount };
