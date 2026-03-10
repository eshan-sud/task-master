// frontend/src/components/profile/Teams.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUsers,
  FiPlus,
  FiTrash2,
  FiUserPlus,
  FiX,
  FiMail,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { Background } from "./Background.jsx";
import {
  fetchTeams,
  createTeam,
  deleteTeam,
  addTeamMember,
  setSelectedTeam,
} from "../../store/slices/teamsSlice.js";

const Teams = () => {
  const dispatch = useDispatch();
  const {
    items: teams,
    loading,
    selectedTeam,
  } = useSelector((state) => state.teams);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState("member");

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;
      if (showCreateModal) setShowCreateModal(false);
      if (showAddMemberModal) setShowAddMemberModal(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showCreateModal, showAddMemberModal]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (newTeamName.trim() === "") {
      toast.error("Team name cannot be empty");
      return;
    }

    try {
      await dispatch(
        createTeam({
          name: newTeamName,
          description: newTeamDescription,
        }),
      ).unwrap();
      toast.success("Team created successfully");
      setNewTeamName("");
      setNewTeamDescription("");
      setShowCreateModal(false);
    } catch {
      toast.error("Failed to create team");
    }
  };

  const handleDeleteTeam = async (teamId, teamName) => {
    if (window.confirm(`Are you sure you want to delete "${teamName}"?`)) {
      try {
        await dispatch(deleteTeam(teamId)).unwrap();
        toast.success("Team deleted successfully");
      } catch {
        toast.error("Failed to delete team");
      }
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberEmail.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!selectedTeam) {
      toast.error("No team selected");
      return;
    }

    try {
      await dispatch(
        addTeamMember({
          teamId: selectedTeam._id,
          email: memberEmail,
          role: memberRole,
        }),
      ).unwrap();
      toast.success("Member added successfully");
      setMemberEmail("");
      setMemberRole("member");
      setShowAddMemberModal(false);
    } catch {
      toast.error("Failed to add member");
    }
  };

  const handleViewTeam = (team) => {
    dispatch(setSelectedTeam(team));
  };

  if (loading && teams.length === 0) {
    return (
      <Background>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading teams...</p>
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="min-h-screen p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Teams
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your teams and collaborate
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            <FiPlus size={20} />
            Create Team
          </button>
        </div>

        {/* Teams Grid */}
        {teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <FiUsers
                        className="text-blue-600 dark:text-blue-400"
                        size={24}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {team.members?.length || 0} members
                      </p>
                    </div>
                  </div>
                </div>

                {team.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {team.description}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      handleViewTeam(team);
                      setShowAddMemberModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
                  >
                    <FiUserPlus size={16} />
                    Add Member
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team._id, team.name)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                {/* Members List */}
                {team.members && team.members.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Members
                    </h4>
                    <div className="space-y-2">
                      {team.members.slice(0, 3).map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-900 dark:text-gray-100">
                            {member.userId?.fullName ||
                              member.userId?.email ||
                              "Unknown"}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {member.role}
                          </span>
                        </div>
                      ))}
                      {team.members.length > 3 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          +{team.members.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <FiUsers className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No Teams Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first team to start collaborating
            </p>
          </div>
        )}

        {/* Create Team Modal */}
        {showCreateModal && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCreateModal(false);
            }}
          >
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Create New Team
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <FiX size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter team name"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTeamDescription}
                    onChange={(e) => setNewTeamDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter team description"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
                  >
                    Create Team
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 font-semibold rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Member Modal */}
        {showAddMemberModal && selectedTeam && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAddMemberModal(false);
            }}
          >
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Add Member to {selectedTeam.name}
                </h2>
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <FiX size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="member@example.com"
                      autoFocus
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors"
                  >
                    Add Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 font-semibold rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Background>
  );
};

export default Teams;
