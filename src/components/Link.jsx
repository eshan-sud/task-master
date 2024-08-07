import React from "react";
import { NavLink } from "react-router-dom";

export const MenuItem = ({ to, name }) => {
  return (
    <li className="flex items-center mx-4 font-semi-bold tracking-tighter underline-offset-8">
      <NavLink
        to={`${to}`}
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 underline"
            : "hover:text-blue-600 hover:underline"
        }
      >
        {name}
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
            ? "text-blue-500 underline flex items-center hover:bg-gray-200 rounded-lg px-1 py-2 w-full"
            : "hover:text-blue hover:underline flex items-center hover:bg-gray-200 rounded-lg px-1 py-2 w-full"
        }
      >
        <span className="mr-6 text-2xl">{icon}</span>
        <span className="text-xl">{name}</span>
      </NavLink>
    </li>
  );
};
