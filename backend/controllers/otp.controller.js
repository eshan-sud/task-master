// backend/controllers/otp.controller.js

const OTP = require("../models/otp.model");

const {
  sendOtpVerificationEmail,
  sendAccountVerifiedEmail,
} = require("../utils/emailService");

const {
  encryptOTP,
  generateOTP,
  compareOTP,
} = require("../utils/otp.utils.js");

const handleSendOTP = async (req, res) => {
  try {
    const { email, purpose } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    // Remove any existing OTPs for this email - for the purpose of OTP verification ONLY
    await OTP.deleteMany({ email });
    const otp = generateOTP();
    const encryptedOTP = encryptOTP(otp);
    const otpRecord = await OTP.create({
      email,
      otp: encryptedOTP,
      createdAt: Date.now(),
      purpose: purpose, // Either "password_reset" or "account_verification"
    });
    if (!otpRecord) {
      return res.status(500).json({ error: "Failed to store OTP in database" });
    }
    // console.log(`New OTP stored successfully for ${email}`);
    if (!(await sendOtpVerificationEmail(otp, email, purpose))) {
      return res.status(500).json({ error: "Failed to send OTP email" });
    }
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("[handleSendOTP] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleVerifyOTP = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;
    if (!email || !otp || !purpose) {
      return res
        .status(400)
        .json({ error: "Email, OTP, and purpose are required" });
    }
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(404).json({ error: "OTP not found" });
    }
    const isMatch = compareOTP(otp, otpRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    await OTP.deleteOne({ email }); // Remove OTP after successful verification
    if (purpose === "account_verification") {
      // Update the user's verification status
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const emailSent = await sendAccountVerifiedEmail(email);
      if (!emailSent) {
        return res
          .status(500)
          .json({ error: "Failed to send account verifid email" });
      }
      return res.status(200).json({
        isVerified: user.isVerified,
        message: "Account verified email sent to user",
      });
    } else if (purpose === "password_reset") {
      // Generate a temporary token for password reset
      const token = generateAccessToken({ email });
      return res.status(200).json({
        message: "OTP verified successfully. Proceed with password reset.",
        token,
      });
    } else {
      return res.status(400).json({ error: "Invalid purpose" });
    }
  } catch (error) {
    console.error("[handleVerifyOTP] Error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleSendOTP,
  handleVerifyOTP,
};
