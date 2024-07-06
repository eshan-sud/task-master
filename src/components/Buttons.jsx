import React from "react";
import { useNavigate } from "react-router-dom";

export const Button = () => {
  return <></>;
};

export const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="w-full px-6 py-3 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
    >
      Submit
    </button>
  );
};

export const CreateButton = () => {
  return (
    <button className="border-2 border-[#24b4fb] bg-[#24b4fb] rounded-[0.9em] px-[1.2em] py-[0.8em] pr-[1em] transition-all ease-in-out duration-200 text-[16px] hover:bg-[#0071e2]">
      <span className="flex justify-center items-center text-white font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
          ></path>
        </svg>
        Create
      </span>
    </button>
  );
};

export const GoBackButton = () => {
  return (
    <button
      type="button"
      className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
    >
      <div className=" bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25px"
          height="25px"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#000000"
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          ></path>
          <path
            fill="#000000"
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          ></path>
        </svg>
      </div>
      <p className="translate-x-2">Go Back</p>
    </button>
  );
};

export const ArchiveButton = () => {
  return (
    <button className="group hover:svg-icon flex justify-center items-center px-4 py-2 gap-2 h-10 w-32 border-none bg-[#056bfa27] rounded-full cursor-pointer hover:bg-[#056bfa49]">
      <svg
        className="w-6 h-6 group-hover:animate-spin"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g
          strokeWidth="2"
          strokeLinecap="round"
          stroke="#056dfa"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path>
          <path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path>
        </g>
      </svg>
      <span className="mt-[1px] text-[19px] leading-[22px] text-[#056DFA]">
        Archive
      </span>
    </button>
  );
};

export const LoginButton = () => {
  const naviagate = useNavigate();
  return (
    <button
      className="text-black px-7 py-1 mx-2 box-border border-black border-2 rounded-full hover:bg-black hover:text-white"
      onClick={() => naviagate("/login")}
    >
      Login
    </button>
  );
};
export const RegisterButton = () => {
  const naviagate = useNavigate();
  return (
    <button
      className="bg-blue-500 text-white px-7 py-1 rounded-full hover:bg-blue-600 transition duration-300rounded-full"
      onClick={() => naviagate("/register", { replace: true })}
    >
      Register
    </button>
  );
};

export const AddNew = () => {
  <button
    title="Add New"
    className="group cursor-pointer outline-none hover:rotate-90 duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="50px"
      viewBox="0 0 24 24"
      className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
    >
      <path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        strokeWidth="1.5"
      ></path>
      <path d="M8 12H16" strokeWidth="1.5"></path>
      <path d="M12 16V8" strokeWidth="1.5"></path>
    </svg>
  </button>;
};

export const PlayStoreButton = () => {
  return (
    <>
      <a
        href="#"
        className="inline-flex items-center justify-center border-2 border-black rounded-full bg-black px-6 py-2.5 text-center text-white outline-none transition-all duration-200 ease-in hover:bg-transparent hover:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 m-2"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
        </svg>
        <span className="flex flex-col items-start ">
          <span className="text-xs mb-1"> Download from </span>
          <span className="text-xs"> Google Play </span>
        </span>
      </a>
    </>
  );
};

export const AppStoreButton = () => {
  return (
    <>
      <a
        href="#"
        className="inline-flex items-center justify-center border-2 border-black rounded-full bg-black px-6 py-2.5 text-center text-white outline-none transition-all duration-200 ease-in hover:bg-transparent hover:text-black"
      >
        <span className="h-6 w-6 m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentcolor"
            viewBox="-52.01 0 560.035 560.035"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"></path>
            </g>
          </svg>
        </span>
        <span className="flex flex-col items-start">
          <span className="text-xs mb"> Download form </span>
          <span className="text-xs"> App store </span>
        </span>
      </a>
    </>
  );
};
