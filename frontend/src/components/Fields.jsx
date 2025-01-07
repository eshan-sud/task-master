// filename - frontend/src/components/Fields.jsx

import React, { useEffect, useRef, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";

// import { endpoints } from "../ApiEndpoints";

import { CircularLabel } from "./Labels";
import { EmailValidator, isValidEmail } from "../utils/EmailValidator.js";

export const SearchField = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!inputValue) {
      toast.error("Search value cannot be empty");
    }
    // Handle Search Logic
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!inputValue && !isFocused) {
      setIsHovered(false);
    }
  };

  const handleReset = () => {
    setInputValue("");
    setIsHovered(false);
    setIsFocused(false);
    inputRef.current.blur();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsHovered(true);
  };

  const handleBlur = (event) => {
    if (!inputRef.current.contains(event.relatedTarget) && !inputValue) {
      setIsFocused(false);
      setIsHovered(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !inputValue
      ) {
        setIsHovered(false);
        setIsFocused(false);
        inputRef.current.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  return (
    <div className="flex items-center">
      <form
        id="searchForm"
        onSubmit={handleSearch}
        className={`p-2 overflow-hidden h-10 ${
          isHovered || inputValue || isFocused ? "w-[270px]" : "w-10"
        } bg-gray-200 rounded-full flex items-center duration-300 border-2 ${
          isFocused ? "border-blue-500" : "border-transparent"
        } placeholder-gray-400 transition-all shadow-md`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button type="submit">
          <CgSearch />
        </button>
        <input
          ref={inputRef}
          type="text"
          className="outline-none text-[20px] bg-transparent w-full font-normal px-4"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="reset" className="p-1" onClick={handleReset}>
          <MdCancel />
        </button>
      </form>
    </div>
  );
};

export const EmailField = ({
  type,
  name,
  email,
  setEmail,
  className = "",
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <EmailValidator setEmail={setEmail} email={email}>
        <div className="relative">
          <input
            value={email}
            type={type}
            id={name}
            autoFocus={autoFocus}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(event) => setEmail(event.target.value.toLowerCase())}
            className={`peer border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-all duration-500 focus:bg-white ${className} ${
              isFocused
                ? email === ""
                  ? "border-[#4A9DEC] shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)]"
                  : isValidEmail(email)
                  ? "border-green-500 shadow-[0px_0px_0px_7px_rgba(34,197,94,0.2)]"
                  : "border-red-500 shadow-[0px_0px_0px_7px_rgba(239,68,68,0.2)]"
                : ""
            }`}
          />
          <label
            htmlFor={name}
            className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
              email
                ? "top-0 text-xs text-blue-500"
                : "top-4 text-sm text-gray-600"
            } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
          >
            {name}
          </label>
        </div>
      </EmailValidator>
    </div>
  );
};

export const Field = ({
  name,
  type,
  value,
  setValue,
  autoFocus = false,
  allowSpecialChars = true,
}) => {
  const handleChange = (event) => {
    let inputValue = event.target.value;
    if (!allowSpecialChars) {
      inputValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
    }
    setValue(inputValue.toLowerCase());
  };
  return (
    <div className="relative">
      <input
        value={value}
        type={type}
        id={name}
        onChange={handleChange}
        autoFocus={autoFocus}
        className="border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-all duration-500 focus:border-[#4A9DEC] focus:shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)] focus:bg-white peer"
      />
      <label
        htmlFor={name}
        className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
          value ? "top-0 text-xs text-blue-500" : "top-4 text-sm text-gray-600"
        } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
      >
        {name}
      </label>
    </div>
  );
};

const GenderField = ({ name, title, setGender }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={name}
        name="gender"
        value={name}
        className="hidden peer"
        onChange={() => setGender(name)}
      />
      <CircularLabel title={title} htmlFor={name}>
        <img
          src={`/assets/images/${name}.svg`}
          alt={title}
          className="absolute stroke-black"
        />
      </CircularLabel>
    </div>
  );
};

export const GenderInput = ({ setGender }) => {
  return (
    <div className="border-2 w-full p-3 pl-[0.8em] outline-none bg-[#F3F3F3] rounded-[10px]">
      <label className="block text-gray-500 cursor-text text-sm leading-[140%] font-normal mb-2">
        Gender
      </label>
      <div className="flex items-center align-middle gap-4">
        <GenderField name="male" title="Male" setGender={setGender} />
        <GenderField name="female" title="Female" setGender={setGender} />
        <GenderField
          name="non_binary"
          title="Non Binary"
          setGender={setGender}
        />
        <GenderField
          name="none"
          title="Don't Want to specify"
          setGender={setGender}
        />
      </div>
    </div>
  );
};

export const NewPasswordField = ({
  type = "password",
  name = "New Password",
  value,
  onChange,
  className = "",
  autoFocus = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        value={value}
        type={type}
        id={name}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(event) => onChange(event.target.value)}
        className={`border-gray-300 dark:border-gray-600 peer border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none bg-[#F3F3F3] dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-[10px] transition-all duration-500 ${
          isFocused
            ? value === ""
              ? "border-[#4A9DEC] shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)]"
              : "border-green-500 shadow-[0px_0px_0px_7px_rgba(34,197,94,0.2)]"
            : ""
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
          value ? "top-0 text-xs text-blue-500" : "top-4 text-sm text-gray-600"
        } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
      >
        {name}
      </label>
    </div>
  );
};
