// src/components/Buttons.jsx

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { GiPin } from "react-icons/gi";
import {
  // HiArrowsExpand,
  // HiOutlineMicrophone,
  // HiCheck,
  HiArrowCircleLeft,
  HiArrowCircleRight,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";

import LightModeContext from "../utils/LightModeContext.js";

export const LightDarkModeButton = () => {
  const { isLightMode, toggleLightMode } = useContext(LightModeContext);

  return (
    <label className="inline-flex items-center relative">
      <input
        className="peer hidden"
        id="toggle"
        type="checkbox"
        checked={!isLightMode}
        onChange={toggleLightMode}
      />
      <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
      <svg
        height="0"
        width="100"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
      >
        <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
      </svg>
      <svg
        height="512"
        width="512"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
      >
        <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
      </svg>
    </label>
  );
};

export const PreviousButton = () => {
  return (
    <button type="button">
      <HiArrowCircleLeft />
    </button>
  );
};
export const NextButton = () => {
  return (
    <button type="button">
      <HiArrowCircleRight />
    </button>
  );
};

export const CloseButton = ({ onClose }) => {
  return (
    <button
      type="button"
      className="absolute top-2 right-2 text-gray-600 m-3"
      onClick={onClose}
    >
      <IoClose size={20} />
    </button>
  );
};

export const NotificationButton = ({ toggleNotificationPanel }) => {
  return (
    <div
      className="w-10 h-10 rounded-full cursor-pointer p-3 bg-gray-200"
      onClick={toggleNotificationPanel}
    >
      <IoIosNotifications />
    </div>
  );
};

export const BackToTopButton = () => {
  const handleBackToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      className="backToTopButton fixed bottom-10 z-30 right-10 w-32 h-14 overflow-hidden border-none p-6 bg-white/50 flex justify-center rounded-xl cursor-pointer"
    >
      <div className="text">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
      </div>
      <div className="clone">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
      </div>
      <svg
        width="20px"
        strokeWidth="2"
        stroke="black"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <style jsx="true">{`
        .backToTopButton > div,
        .backToTopButton > svg {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          color: black;
        }

        .backToTopButton:before {
          content: "";
          position: absolute;
          height: 2px;
          bottom: 0;
          left: 0;
          width: 100%;
          transform: scaleX(0);
          transform-origin: bottom right;
          background: black;
          transition: transform 0.25s ease-out;
        }

        .backToTopButton:hover:before {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .backToTopButton .text span,
        .backToTopButton .clone span {
          opacity: 1;
          font-size: 1.3rem;
          transition: 0.2s;
          margin-left: 4px;
        }

        .backToTopButton .clone span {
          transform: translateY(60px);
        }

        .backToTopButton:hover .clone span {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        }

        .backToTopButton:hover .text span {
          opacity: 1;
          transform: translateY(-60px);
          transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
        }

        .backToTopButton:hover .clone span:nth-child(1) {
          transition-delay: 0.15s;
        }
        .backToTopButton:hover .clone span:nth-child(2) {
          transition-delay: 0.2s;
        }
        .backToTopButton:hover .clone span:nth-child(3) {
          transition-delay: 0.25s;
        }
        .backToTopButton:hover .clone span:nth-child(4) {
          transition-delay: 0.3s;
        }

        .backToTopButton svg {
          width: 20px;
          right: 0;
          top: 50%;
          transform: translateY(-50%) rotate(-50deg);
          transition: 0.2s ease-out;
        }

        .backToTopButton:hover svg {
          transform: translateY(-50%) rotate(-90deg);
        }
      `}</style>
    </button>
  );
};

export const PinButton = () => {
  return (
    <label className="container flex items-center justify-center w-11 h-11 bg-transparent rounded-lg cursor-pointer transition-transform duration-200 active:scale-90 bg-gray-400 hover:bg-white hover:shadow-md">
      <input type="checkbox" className="hidden" />
      <GiPin />
    </label>
  );
};

export const SendButton = () => {
  return (
    <button
      type="button"
      className="sendButton relative flex items-center bg-royalblue text-white py-2 px-4 pl-3 rounded-lg transition-all duration-200 cursor-pointer focus:outline-none"
    >
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="transition-transform duration-300 ease-in-out"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
          </svg>
        </div>
      </div>
      <span className="ml-1 transition-all duration-300 ease-in-out">Send</span>
      <style jsx="true">{`
        .sendButton {
          background-color: royalblue;
        }
        .sendButton:hover .svg-wrapper {
          animation: fly-1 0.6s ease-in-out infinite alternate;
        }
        .sendButton:hover svg {
          transform: translateX(1.2em) rotate(45deg) scale(1.1);
        }
        .sendButton:hover span {
          transform: translateX(5em);
          opacity: 0;
        }
        .sendButton:active {
          transform: scale(0.95);
        }
        @keyframes fly-1 {
          from {
            transform: translateY(0.1em);
          }
          to {
            transform: translateY(-0.1em);
          }
        }
      `}</style>
    </button>
  );
};

export const AddButton = ({ name, color }) => {
  return (
    <button
      type="button"
      className={`group button relative w-44 h-10 cursor-pointer flex items-center border border-${color}-600 bg-${color}-700 rounded-xl overflow-hidden transition-all duration-300 hover:bg-${color}-600 active:border-${color}-800 active:bg-${color}-700`}
    >
      <span className="group-hover:text-transparent transform translate-x-8 text-white font-semibold transition-all duration-300">
        Add {name}
      </span>
      <span
        className={`group-hover:translate-x-0 group-hover:w-full absolute transform translate-x-[140px] h-full w-10 bg-${color}-600 flex items-center justify-center transition-all duration-300`}
      >
        <FaPlus color="white" />
      </span>
    </button>
  );
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
    <button
      type="button"
      className="border-2 border-[#24b4fb] bg-[#24b4fb] rounded-[0.9em] px-[1.2em] py-[0.8em] pr-[1em] transition-all ease-in-out duration-200 text-[16px] hover:bg-[#0071e2]"
    >
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

export const GoBackButton2 = () => {
  return (
    <button
      type="button"
      class="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
    >
      <div class="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
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
      <p class="translate-x-2">Go Back</p>
    </button>
  );
};

export const ArchiveButton = () => {
  return (
    <button
      type="button"
      className="group hover:svg-icon flex justify-center items-center px-4 py-2 gap-2 h-10 w-32 border-none bg-[#056bfa27] rounded-full cursor-pointer hover:bg-[#056bfa49]"
    >
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
      type="button"
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
      type="button"
      className="bg-blue-500 text-white px-7 py-1 rounded-full hover:bg-blue-600 transition duration-300rounded-full"
      onClick={() => naviagate("/register", { replace: true })}
    >
      Register
    </button>
  );
};

export const AddNew = () => {
  <button
    type="button"
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
