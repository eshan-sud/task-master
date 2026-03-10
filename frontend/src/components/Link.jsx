// frontend/src/components/Link.jsx

import { NavLink } from "react-router-dom";

export const MenuItem = ({ to, name, icon }) => {
  return (
    <li className="mx-4 font-semi-bold tracking-tighter underline-offset-8">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 underline flex items-center justify-center"
            : "hover:text-blue-600 hover:underline flex items-center justify-center"
        }
      >
        <span className="mr-1">{icon}</span>
        <span>{name}</span>
      </NavLink>
    </li>
  );
};

export const SidebarItem = ({ to, name, icon }) => {
  return (
    <li className="flex items-center font-semi-bold tracking-tighter">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 dark:text-blue-400 underline flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg px-1 py-2 w-full"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:underline flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg px-1 py-2 w-full"
        }
      >
        <span className="mr-6 text-2xl">{icon}</span>
        <span className="text-xl">{name}</span>
      </NavLink>
    </li>
  );
};
