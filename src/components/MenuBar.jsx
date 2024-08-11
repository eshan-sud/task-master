// src/components/MenuBar.jsx

import React from "react";

import home from "/resources/images/Home.svg";
import search from "/resources/images/Search.svg";
import profile from "/resources/images/Profile.svg";

export const MenuBar = () => {
  return (
    <div className="flex bg-pink-600 w-[250px] h-[40px] items-center justify-around rounded-[10px] shadow-[rgba(0,0,0,0.35)_0px_5px_15px,rgba(245,73,144,0.5)_5px_10px_15px]">
      <button className="outline-none border-none w-[40px] h-[40px] rounded-full bg-transparent flex items-center justify-center text-white transition-all ease-in-out duration-300 cursor-pointer hover:-translate-y-[3px]">
        <img src={home} alt="Home" />
      </button>
      <button className="outline-none border-none w-[40px] h-[40px] rounded-full bg-transparent flex items-center justify-center text-white transition-all ease-in-out duration-300 cursor-pointer hover:-translate-y-[3px]">
        <img src={search} alt="Search" />
      </button>
      <button className="outline-none border-none w-[40px] h-[40px] rounded-full bg-transparent flex items-center justify-center text-white transition-all ease-in-out duration-300 cursor-pointer hover:-translate-y-[3px]">
        <img src={profile} alt="Profile" />
      </button>
    </div>
  );
};
