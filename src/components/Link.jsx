import React from 'react'
import { NavLink } from "react-router-dom";

export const MenuItem = ({ to , name }) => {
  return (
    <li className="flex items-center mx-4 font-semi-bold tracking-tighter underline-offset-8">
      <NavLink to={`${to}`} className={({ isActive }) => isActive ? 'text-blue-600 underline' : 'hover:text-blue-600 hover:underline'}>{name}</NavLink>
    </li>
  )
}
