// frontend/src/components/Teams/TeamCard.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember } from "../../store/slices/teamsSlice";
import {
  FiUsers,
  FiUserPlus,
  FiTrash2,
  FiEdit2,
  FiMoreVertical,
} from "react-icons/fi";

const TeamCard = ({ team, onDelete }) => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.presence.onlineUsers);
  const [showMenu, setShowMenu] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;

    await dispatch(
      addMember({
        teamId: team._id,
        email: newMemberEmail,
        role: newMemberRole,
      }),
    );

    setNewMemberEmail("");
    setNewMemberRole("member");
    setIsAddingMember(false);
  };

  const handleRemoveMember = async (memberId) => {
    if (window.confirm("Remove this member from the team?")) {
      await dispatch(
        removeMember({
          teamId: team._id,
          memberId,
        }),
      );
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "admin":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FiUsers className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {team.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {team.members?.length || 0} members
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
          >
            <FiMoreVertical />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
              <button
                onClick={() => {
                  setShowMenu(false);
                  // Handle edit
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <FiEdit2 size={16} /> Edit Team
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete(team._id);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
              >
                <FiTrash2 size={16} /> Delete Team
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {team.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {team.description}
        </p>
      )}

      {/* Members List */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Members
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {team.members?.map((member) => {
            const userId = member.user?._id || member.userId?._id;
            const isOnline = userId && onlineUsers[userId]?.isOnline;

            return (
              <div
                key={member._id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {member.user?.name?.[0]?.toUpperCase() ||
                        member.user?.email?.[0]?.toUpperCase()}
                    </div>
                    {/* Online status indicator */}
                    <div
                      className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-700"
                      style={{
                        backgroundColor: isOnline ? "#10b981" : "#6b7280",
                      }}
                      title={isOnline ? "Online" : "Offline"}
                    ></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {member.user?.name || member.user?.email}
                      {isOnline && (
                        <span className="ml-2 text-xs text-green-500">●</span>
                      )}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${getRoleBadgeColor(member.role)}`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>
                {member.role !== "owner" && (
                  <button
                    onClick={() => handleRemoveMember(member._id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Member Form */}
      {isAddingMember ? (
        <form
          onSubmit={handleAddMember}
          className="space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Member email"
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex gap-2">
            <select
              value={newMemberRole}
              onChange={(e) => setNewMemberRole(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingMember(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingMember(true)}
          className="w-full flex items-center justify-center gap-2 py-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
        >
          <FiUserPlus size={16} /> Add Member
        </button>
      )}
    </div>
  );
};

export default TeamCard;
