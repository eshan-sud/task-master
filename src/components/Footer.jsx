import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full py-8 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="/assets/images/creator.jpg"
            alt="Creator"
            title="Eshan Sud"
            className="w-16 h-16 object-cover rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">Eshan Sud</h3>
            <p className="text-sm">Creator of Task Master</p>
            <p className="text-sm">Student @ Manipal University Jaipur</p>
          </div>
        </div>
        <ul className="flex space-x-6 mb-4 md:mb-0">
          <li>
            <a
              key="0"
              href="https://github.com/eshan-sud"
              target="_blank"
              className="hover:underline"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              key="1"
              href="https://www.linkedin.com/in/eshan-sud/"
              target="_blank"
              className="hover:underline"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} Task Master. All rights reserved.
      </div>
    </footer>
  );
};
