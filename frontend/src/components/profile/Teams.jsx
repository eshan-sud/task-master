// frontend/src/components/profile/Teams.jsx

import { useState } from "react";
import { Background } from "./Background.jsx";
import toast from "react-hot-toast";

export const Teams = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: "Development Team", members: 10 },
    { id: 2, name: "Design Team", members: 5 },
  ]);
  const [newTeamName, setNewTeamName] = useState("");
  const handleCreateTeam = () => {
    if (newTeamName.trim() === "") {
      toast.error("Team name cannot be empty");
      return;
    }
    const newTeam = { id: teams.length + 1, name: newTeamName, members: 0 };
    setTeams([...teams, newTeam]);
    setNewTeamName("");
    toast.success("Team created successfully");
  };
  const handleDeleteTeam = (id) => {
    setTeams(teams.filter((team) => team.id !== id));
    toast.success("Team deleted successfully");
  };
  return (
    <Background>
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Teams
        </h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Create New Team
          </h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter team name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleCreateTeam}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Your Teams
          </h2>
          {teams.length > 0 ? (
            <ul className="space-y-4">
              {teams.map((team) => (
                <li
                  key={team.id}
                  className="flex justify-between items-center border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <div>
                    <h3 className="text-lg font-bold">{team.name}</h3>
                    <p>{team.members} Members</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              You don't have any teams yet. Create one to get started!
            </p>
          )}
        </div>
      </div>
    </Background>
  );
};
