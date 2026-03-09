// frontend/src/components/Teams/TeamsPage.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeams,
  createTeam,
  deleteTeam,
} from "../../store/slices/teamsSlice";
import TeamCard from "./TeamCard";
import CreateTeamModal from "./CreateTeamModal";
import { FiPlus, FiUsers } from "react-icons/fi";

const TeamsPage = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.teams);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleCreateTeam = async (teamData) => {
    await dispatch(createTeam(teamData));
    setIsCreateModalOpen(false);
  };

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      await dispatch(deleteTeam(teamId));
    }
  };

  if (loading && teams.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Teams
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Collaborate with your team members
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FiPlus /> Create Team
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Teams Grid */}
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team._id} team={team} onDelete={handleDeleteTeam} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 text-6xl mb-4">
            <FiUsers className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No teams yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Create your first team to start collaborating
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Team
          </button>
        </div>
      )}

      {/* Create Team Modal */}
      {isCreateModalOpen && (
        <CreateTeamModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateTeam}
        />
      )}
    </div>
  );
};

export default TeamsPage;
