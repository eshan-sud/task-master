// filename - routes/avatar.route.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  handleUploadAvatar,
  handleRemoveAvatar,
} = require("../controllers/avatar.controller");
const authenticate = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.post(
  "/upload",
  authenticate,
  upload.single("avatar"),
  handleUploadAvatar
);
router.delete("/removeAvatar", authenticate, handleRemoveAvatar);

module.exports = router;
