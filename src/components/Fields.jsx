import React, { useState } from "react";
import { CircularLabel } from "./Labels";

export const EmailField = (props) => {
  const [value, setValue] = useState("");
  const handleInputChange = (event) => {
    const lowerCaseValue = event.target.value.toLowerCase();
    setValue(lowerCaseValue);
    if (props.onChange) props.onChange(event);
  };
  return (
    <div className="relative">
      <input
        value={value}
        type={props.type}
        id={props.name}
        onChange={handleInputChange}
        className={`border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-all duration-500 focus:bg-white peer ${props.className}`}
      />
      <label
        htmlFor={props.name}
        className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
          value ? "top-0 text-xs text-blue-500" : "top-4 text-sm text-gray-600"
        } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
      >
        {props.name}
      </label>
    </div>
  );
};

export const Field = (props) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <input
        value={value}
        type={props.type}
        id={props.name}
        onChange={(event) => setValue(event.target.value.toLowerCase())}
        className="border-2 w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-all duration-500 focus:border-[#4A9DEC] focus:shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)] focus:bg-white peer"
      />
      <label
        htmlFor={props.name}
        className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
          value ? "top-0 text-xs text-blue-500" : "top-4 text-sm text-gray-600"
        } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
      >
        {props.name}
      </label>
    </div>
  );
};

// export const Field = (props) => {
//   const [value, setValue] = useState("");
//   return (
//     <div className="relative">
//       <input
//         value={value}
//         type={props.type}
//         id={props.name}
//         onChange={(event) => setValue(event.target.value)}
//         className="border-2 border-transparent w-full h-[2.5em] pt-6 pb-3 pl-[0.8em] outline-none overflow-hidden bg-[#F3F3F3] rounded-[10px] transition-all duration-500 focus:border-[#4A9DEC] focus:shadow-[0px_0px_0px_7px_rgba(74,157,236,0.2)] focus:bg-white peer"
//       />
//       <label
//         htmlFor={props.name}
//         className={`absolute left-2.5 transition-all duration-200 ease-in-out transform ${
//           value ? "top-0 text-xs text-blue-500" : "top-4 text-sm text-gray-600"
//         } peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500`}
//       >
//         {props.name}
//       </label>
//     </div>
//   );
// };

const GenderField = ({ name, title }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={name}
        name="gender"
        value={name}
        className="hidden peer"
      />
      {/* <CircularLabel title={title} htmlFor={name}><svg src={male} alt='Male' className="absolute stroke-black" /></CircularLabel> */}
    </div>
  );
};

export const GenderInput = () => {
  return (
    <div className="block relative">
      <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
        Gender
      </label>
      <div className="flex items-center gap-4">
        <GenderField name="male" title="Male" />
        <div className="flex items-center">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            className="hidden peer"
          />
          <CircularLabel title="Female" htmlFor="female">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35px"
              height="35px"
              viewBox="0 0 24 24"
              className="absolute stroke-black"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
              ></path>
            </svg>
          </CircularLabel>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="non-binary"
            name="gender"
            value="non-binary"
            className="hidden peer"
          />
          <CircularLabel title="Non-Binary" htmlFor="non-binary">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 512 512"
              version="1.1"
              className="absolute stroke-black"
            >
              <g id="drop" transform="translate(42.666667, 70.248389)">
                <path d="M226.597,200.834611 L296.853333,271.084945 L353.819,271.084 L326.248389,243.503223 L356.418278,213.333333 L435.503223,292.418278 L356.418278,371.503223 L326.248389,341.333333 L353.82,313.751 L279.163435,313.751611 L196.418,231.011611 L226.597,200.834611 Z M356.418278,1.42108547e-14 L435.503223,79.0849447 L356.418278,158.169889 L326.248389,128 L353.82,100.418 L296.853333,100.418278 L83.503232,313.751611 L-1.0658141e-13,313.751611 L-1.03968831e-13,271.084945 L65.8133333,271.084945 L279.163435,57.7516113 L353.82,57.751 L326.248389,30.1698893 L356.418278,1.42108547e-14 Z M83.503232,57.7516113 L166.248,140.490611 L136.069,170.667611 L65.8133333,100.418278 L-1.0658141e-13,100.418278 L-1.0658141e-13,57.7516113 L83.503232,57.7516113 Z"></path>
              </g>
            </svg>
          </CircularLabel>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="none"
            name="gender"
            value="none"
            className="hidden peer"
          />
          <CircularLabel title="Don't Want to specify" htmlFor="none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute stroke-black"
            >
              <path
                id="Vector"
                d="M8.19531 8.76498C8.42304 8.06326 8.84053 7.43829 9.40137 6.95899C9.96221 6.47968 10.6444 6.16501 11.373 6.0494C12.1017 5.9338 12.8486 6.02202 13.5303 6.3042C14.2119 6.58637 14.8016 7.05166 15.2354 7.64844C15.6691 8.24521 15.9295 8.95008 15.9875 9.68554C16.0455 10.421 15.8985 11.1581 15.5636 11.8154C15.2287 12.4728 14.7192 13.0251 14.0901 13.4106C13.4611 13.7961 12.7377 14.0002 12 14.0002V14.9998M12.0498 19V19.1L11.9502 19.1002V19H12.0498Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </CircularLabel>
        </div>
      </div>
    </div>
  );
};

// export const GenderInput = () => {
//     return (
//         <div className="block relative">
//         <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Gender</label>
//         <div className="flex items-center gap-4">
//             <div className="flex items-center">
//                 <input type="radio" id="male" name="gender" value="male" className="hidden peer" />
//                 <CircularLabel title="Male" htmlFor="male">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none" className="absolute stroke-black"><path fillRule="evenodd" clipRule="evenodd" d="M15.5631 16.1199C14.871 16.81 13.9885 17.2774 13.0288 17.462C12.0617 17.6492 11.0607 17.5459 10.1523 17.165C8.29113 16.3858 7.07347 14.5723 7.05656 12.5547C7.04683 11.0715 7.70821 9.66348 8.8559 8.72397C10.0036 7.78445 11.5145 7.4142 12.9666 7.71668C13.9237 7.9338 14.7953 8.42902 15.4718 9.14008C16.4206 10.0503 16.9696 11.2996 16.9985 12.6141C17.008 13.9276 16.491 15.1903 15.5631 16.1199Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.9415 8.60977C14.6486 8.90266 14.6486 9.37754 14.9415 9.67043C15.2344 9.96332 15.7093 9.96332 16.0022 9.67043L14.9415 8.60977ZM18.9635 6.70907C19.2564 6.41617 19.2564 5.9413 18.9635 5.64841C18.6706 5.35551 18.1958 5.35551 17.9029 5.64841L18.9635 6.70907ZM16.0944 5.41461C15.6802 5.41211 15.3424 5.74586 15.3399 6.16007C15.3374 6.57428 15.6711 6.91208 16.0853 6.91458L16.0944 5.41461ZM18.4287 6.92872C18.8429 6.93122 19.1807 6.59747 19.1832 6.18326C19.1857 5.76906 18.8519 5.43125 18.4377 5.42875L18.4287 6.92872ZM19.1832 6.17421C19.1807 5.76001 18.8429 5.42625 18.4287 5.42875C18.0145 5.43125 17.6807 5.76906 17.6832 6.18326L19.1832 6.17421ZM17.6973 8.52662C17.6998 8.94082 18.0377 9.27458 18.4519 9.27208C18.8661 9.26958 19.1998 8.93177 19.1973 8.51756L17.6973 8.52662ZM16.0022 9.67043L18.9635 6.70907L17.9029 5.64841L14.9415 8.60977L16.0022 9.67043ZM16.0853 6.91458L18.4287 6.92872L18.4377 5.42875L16.0944 5.41461L16.0853 6.91458ZM17.6832 6.18326L17.6973 8.52662L19.1973 8.51756L19.1832 6.17421L17.6832 6.18326Z"></path></svg>
//                 </CircularLabel>
//             </div>
//             <div className="flex items-center">
//                 <input type="radio" id="female" name="gender" value="female" className="hidden peer" />
//                 <CircularLabel title="Female" htmlFor="female">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" className="absolute stroke-black"><path fillRule="evenodd" clipRule="evenodd" d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"></path></svg>
//                 </CircularLabel>
//             </div>
//             <div className="flex items-center">
//                 <input type="radio" id="non-binary" name="gender" value="non-binary" className="hidden peer" />
//                 <CircularLabel title="Non-Binary" htmlFor="non-binary">
//                     <svg width="40px" height="40px" viewBox="0 0 512 512" version="1.1" className="absolute stroke-black"><g id="drop" transform="translate(42.666667, 70.248389)"><path d="M226.597,200.834611 L296.853333,271.084945 L353.819,271.084 L326.248389,243.503223 L356.418278,213.333333 L435.503223,292.418278 L356.418278,371.503223 L326.248389,341.333333 L353.82,313.751 L279.163435,313.751611 L196.418,231.011611 L226.597,200.834611 Z M356.418278,1.42108547e-14 L435.503223,79.0849447 L356.418278,158.169889 L326.248389,128 L353.82,100.418 L296.853333,100.418278 L83.503232,313.751611 L-1.0658141e-13,313.751611 L-1.03968831e-13,271.084945 L65.8133333,271.084945 L279.163435,57.7516113 L353.82,57.751 L326.248389,30.1698893 L356.418278,1.42108547e-14 Z M83.503232,57.7516113 L166.248,140.490611 L136.069,170.667611 L65.8133333,100.418278 L-1.0658141e-13,100.418278 L-1.0658141e-13,57.7516113 L83.503232,57.7516113 Z"></path></g></svg>
//                 </CircularLabel>
//             </div>
//             <div className="flex items-center">
//                 <input type="radio" id="none" name="gender" value="none" className="hidden peer" />
//                 <CircularLabel title="Don't Want to specify" htmlFor="none">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none" className="absolute stroke-black"><path id="Vector" d="M8.19531 8.76498C8.42304 8.06326 8.84053 7.43829 9.40137 6.95899C9.96221 6.47968 10.6444 6.16501 11.373 6.0494C12.1017 5.9338 12.8486 6.02202 13.5303 6.3042C14.2119 6.58637 14.8016 7.05166 15.2354 7.64844C15.6691 8.24521 15.9295 8.95008 15.9875 9.68554C16.0455 10.421 15.8985 11.1581 15.5636 11.8154C15.2287 12.4728 14.7192 13.0251 14.0901 13.4106C13.4611 13.7961 12.7377 14.0002 12 14.0002V14.9998M12.0498 19V19.1L11.9502 19.1002V19H12.0498Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
//                 </CircularLabel>
//             </div>
//         </div>
//     </div>
//   );
// };