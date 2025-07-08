// frontend/src/components/profile/Archive.jsx

import { useState } from "react";
import { Background } from "./Background.jsx";

export const Archive = () => {
  const [archivedTasks] = useState([
    { id: 1, title: "Archived Task 1", archivedDate: new Date() },
    { id: 2, title: "Archived Task 2", archivedDate: new Date() },
  ]);

  return (
    <div className="relative min-h-screen">
      <Background>
        <div className="relative z-10 p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 ">
            Archived Tasks
          </h1>
          {archivedTasks.length > 0 ? (
            <ul className="space-y-2">
              {archivedTasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-gray-100 dark:bg-gray-700 p-4 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {task.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Archived on: {task.archivedDate.toDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No archived tasks available.
            </p>
          )}
        </div>
      </Background>
    </div>
  );
};
