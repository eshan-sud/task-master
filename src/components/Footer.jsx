import React from 'react'

export const Footer = () => {
    return (
        <footer className="w-full py-8 bg-gray-900 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                    <img src="path_to_creator_photo.jpg" alt="Creator" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                        <h3 className="text-lg font-semibold">John Doe</h3>
                        <p className="text-sm">Creator of Task Master</p>
                    </div>
                </div>
                <ul className="flex space-x-6 mb-4 md:mb-0">
                    <li><a href="https://github.com/johndoe" className="hover:underline">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/johndoe" className="hover:underline">LinkedIn</a></li>
                    <li><a href="https://twitter.com/johndoe" className="hover:underline">Twitter</a></li>
                </ul>
            </div>
            <div className="text-center text-sm">
                &copy; {new Date().getFullYear()} Task Master. All rights reserved.
            </div>
        </footer>
    );
};