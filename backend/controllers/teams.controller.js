// backend/controllers/teams.controller.js

const Teams = require("../models/teams.model");
const User = require("../models/user.model");
const { emitTeamUpdate } = require("../utils/socket.handlers");

/**
 * Create a new team
 */
const handleCreateTeam = async (req, res) => {
  try {
    const { name, description, settings } = req.body;
    const userId = req.user._id;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Team name is required" });
    }

    const team = new Teams({
      name: name.trim(),
      description: description?.trim() || "",
      owner: userId,
      members: [
        {
          userId,
          role: "owner",
          addedBy: userId,
        },
      ],
      settings: settings || {},
    });

    await team.save();
    await team.populate("owner", "fullName email");
    await team.populate("members.userId", "fullName email");

    res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    console.error("[handleCreateTeam] Error:", error);
    res.status(500).json({ error: "Failed to create team" });
  }
};

/**
 * Get all teams for current user
 */
const handleGetTeams = async (req, res) => {
  try {
    const userId = req.user._id;

    const teams = await Teams.find({
      "members.userId": userId,
      isDeleted: false,
    })
      .populate("owner", "fullName email")
      .populate("members.userId", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ teams });
  } catch (error) {
    console.error("[handleGetTeams] Error:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};

/**
 * Get single team by ID
 */
const handleGetTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const userId = req.user._id;

    const team = await Teams.findOne({
      _id: teamId,
      "members.userId": userId,
      isDeleted: false,
    })
      .populate("owner", "fullName email")
      .populate("members.userId", "fullName email")
      .populate("members.addedBy", "fullName email");

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json({ team });
  } catch (error) {
    console.error("[handleGetTeamById] Error:", error);
    res.status(500).json({ error: "Failed to fetch team" });
  }
};

/**
 * Update team details
 */
const handleUpdateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, description, settings } = req.body;
    const userId = req.user._id;

    const team = await Teams.findOne({
      _id: teamId,
      isDeleted: false,
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Check if user is owner or admin
    const member = team.members.find(
      (m) => m.userId.toString() === userId.toString(),
    );
    if (!member || !["owner", "admin"].includes(member.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    if (name) team.name = name.trim();
    if (description !== undefined) team.description = description.trim();
    if (settings) team.settings = { ...team.settings, ...settings };

    await team.save();
    await team.populate("owner", "fullName email");
    await team.populate("members.userId", "fullName email");

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTeamUpdate(io, teamId, "team:updated", team);
    }

    res.status(200).json({
      message: "Team updated successfully",
      team,
    });
  } catch (error) {
    console.error("[handleUpdateTeam] Error:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
};

/**
 * Add member to team
 */
const handleAddMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { email, role = "member" } = req.body;
    const userId = req.user._id;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const team = await Teams.findOne({ _id: teamId, isDeleted: false });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Check permissions
    const currentMember = team.members.find(
      (m) => m.userId.toString() === userId.toString(),
    );
    if (!currentMember || !["owner", "admin"].includes(currentMember.role)) {
      if (!team.settings.allowMemberInvite) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
    }

    // Find user to add
    const userToAdd = await User.findOne({ email: email.trim() });
    if (!userToAdd) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already a member
    const existingMember = team.members.find(
      (m) => m.userId.toString() === userToAdd._id.toString(),
    );
    if (existingMember) {
      return res.status(400).json({ error: "User is already a team member" });
    }

    // Add member
    team.members.push({
      userId: userToAdd._id,
      role,
      addedBy: userId,
    });

    await team.save();
    await team.populate("members.userId", "fullName email");

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTeamUpdate(io, teamId, "team:memberAdded", {
        teamId,
        member: team.members[team.members.length - 1],
      });
    }

    res.status(200).json({
      message: "Member added successfully",
      team,
    });
  } catch (error) {
    console.error("[handleAddMember] Error:", error);
    res.status(500).json({ error: "Failed to add member" });
  }
};

/**
 * Remove member from team
 */
const handleRemoveMember = async (req, res) => {
  try {
    const { teamId, memberId } = req.params;
    const userId = req.user._id;

    const team = await Teams.findOne({ _id: teamId, isDeleted: false });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Check permissions
    const currentMember = team.members.find(
      (m) => m.userId.toString() === userId.toString(),
    );
    if (!currentMember || !["owner", "admin"].includes(currentMember.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    // Can't remove owner
    if (team.owner.toString() === memberId) {
      return res.status(400).json({ error: "Cannot remove team owner" });
    }

    // Remove member
    team.members = team.members.filter((m) => m.userId.toString() !== memberId);

    await team.save();

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTeamUpdate(io, teamId, "team:memberRemoved", {
        teamId,
        memberId,
      });
    }

    res.status(200).json({
      message: "Member removed successfully",
      team,
    });
  } catch (error) {
    console.error("[handleRemoveMember] Error:", error);
    res.status(500).json({ error: "Failed to remove member" });
  }
};

/**
 * Update member role
 */
const handleUpdateMemberRole = async (req, res) => {
  try {
    const { teamId, memberId } = req.params;
    const { role } = req.body;
    const userId = req.user._id;

    if (!["owner", "admin", "member", "viewer"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const team = await Teams.findOne({ _id: teamId, isDeleted: false });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Only owner can change roles
    if (team.owner.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Only owner can change roles" });
    }

    // Find and update member
    const member = team.members.find((m) => m.userId.toString() === memberId);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Can't change owner role
    if (member.userId.toString() === team.owner.toString()) {
      return res.status(400).json({ error: "Cannot change owner's role" });
    }

    member.role = role;
    await team.save();
    await team.populate("members.userId", "fullName email");

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTeamUpdate(io, teamId, "team:memberRoleUpdated", {
        teamId,
        memberId,
        role,
      });
    }

    res.status(200).json({
      message: "Member role updated successfully",
      team,
    });
  } catch (error) {
    console.error("[handleUpdateMemberRole] Error:", error);
    res.status(500).json({ error: "Failed to update member role" });
  }
};

/**
 * Delete team
 */
const handleDeleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const userId = req.user._id;

    const team = await Teams.findOne({ _id: teamId, isDeleted: false });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Only owner can delete team
    if (team.owner.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Only owner can delete team" });
    }

    team.isDeleted = true;
    team.deletedAt = new Date();
    await team.save();

    // Emit real-time update
    const io = req.app.get("io");
    if (io) {
      emitTeamUpdate(io, teamId, "team:deleted", { teamId });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("[handleDeleteTeam] Error:", error);
    res.status(500).json({ error: "Failed to delete team" });
  }
};

module.exports = {
  handleCreateTeam,
  handleGetTeams,
  handleGetTeamById,
  handleUpdateTeam,
  handleAddMember,
  handleRemoveMember,
  handleUpdateMemberRole,
  handleDeleteTeam,
};
