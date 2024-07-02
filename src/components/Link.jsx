import React from 'react'
import { Link } from "react-router-dom";

export const NavLink = ({ to, name }) => {
  return (
    <li className="flex items-center mx-4 hover:text-blue-600 font-semi-bold tracking-tighter hover:underline underline-offset-8"><Link to={`${to}`}>{name}</Link></li>
  )
}

export const CustomLink = ({ to, name }) => {
  return (
    <Link to={to}>{name}</Link>
  )
}
