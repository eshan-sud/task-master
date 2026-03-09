// backend/routes/teams.route.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  handleCreateTeam,
  handleGetTeams,
  handleGetTeamById,
  handleUpdateTeam,
  handleAddMember,
  handleRemoveMember,
  handleUpdateMemberRole,
  handleDeleteTeam,
} = require("../controllers/teams.controller");

// All routes require authentication
router.use(authenticate);

// Team CRUD
router.post("/create", handleCreateTeam);
router.get("/", handleGetTeams);
router.get("/:teamId", handleGetTeamById);
router.patch("/:teamId", handleUpdateTeam);
router.delete("/:teamId", handleDeleteTeam);

// Team members management
router.post("/:teamId/members", handleAddMember);
router.delete("/:teamId/members/:memberId", handleRemoveMember);
router.patch("/:teamId/members/:memberId/role", handleUpdateMemberRole);

module.exports = router;
