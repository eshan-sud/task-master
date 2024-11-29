// filename - backend/controllers/account.controller.js

const OTP = require("../models/otp.model");
const User = require("../models/user.model");
const {
  sendAccountVerificationEmail,
  sendAccountVerifiedEmail,
} = require("../utils/emailService");

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
    await OTP.deleteOne({ email });
    await sendAccountVerificationEmail(otp, email);
    sendAccountVerifiedEmail(email);
    return res.send("Your account has been verified successfully!");
  } catch (error) {
    console.error("Error verifying account:", error);
    return res.status(500).send("Something went wrong");
  }
};

// const handleAccountVerification = async (req, res) => {
//   try {
//     const { email, otp } = res.body;
//     if (!email || !otp) {
//       return res.status(400).json({ error: "Email and OTP are required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const verification = await verifyUser();
//     if (!verification) {
//       return res.status(500).json({ error: "Account verification failed" });
//     }
//     // Add verified account in database
//     await user.save();
//     return res.status(200).json({ message: "Account verified successfully!" });
//   } catch (error) {
//     console.error("Error verifying account:", error);
//     return res.status(500).json({ error: "Account verification failed" });
//   }
// };

module.exports = { verifyAccount };
