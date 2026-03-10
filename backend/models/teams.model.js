// backend/models/teams.model.js

const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "admin", "member", "viewer"],
          default: "member",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    settings: {
      isPublic: {
        type: Boolean,
        default: false,
      },
      allowMemberInvite: {
        type: Boolean,
        default: false,
      },
    },
    inviteCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Index for faster lookups
teamSchema.index({ owner: 1 });
teamSchema.index({ "members.userId": 1 });
// inviteCode index created automatically by unique: true

const Teams = mongoose.model("Teams", teamSchema);

module.exports = Teams;
