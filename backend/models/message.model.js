// backend/models/message.model.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
    },
    text: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    encryptedText: {
      type: String,
    },
    isEncrypted: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        fileSize: Number,
        fileType: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

// Indexes
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });
messageSchema.index({ teamId: 1, createdAt: -1 });
messageSchema.index({ receiverId: 1, isRead: 1 });

// Ensure message is sent to either a user or a team, not both
messageSchema.pre("save", function (next) {
  if ((this.receiverId && this.teamId) || (!this.receiverId && !this.teamId)) {
    next(
      new Error("Message must be sent to either a user or a team, not both"),
    );
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
