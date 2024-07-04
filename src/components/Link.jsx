import React from 'react'
import { NavLink } from "react-router-dom";

export const MenuItem = ({ to, name }) => {
  return (
    <li className="flex items-center mx-4 hover:text-blue-600 font-semi-bold tracking-tighter hover:underline underline-offset-8"><NavLink to={`${to}`}>{name}</NavLink></li>
  )
}
