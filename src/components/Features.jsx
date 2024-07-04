import React from 'react'
import { FaTasks, FaCalendarAlt, FaTrash, FaBell, FaChartLine, FaMicrophone, FaCloud, FaShareAlt, FaStopwatch, FaFileExport, FaComments, FaMapMarkedAlt, FaMoon, FaUpload, FaFolder, FaSort } from 'react-icons/fa';

const features = [
    { icon: <FaTasks className="text-4xl text-blue-500" />, title: "CRUD & Sorting Tasks", description: "Create, read, update, and delete tasks with advanced sorting options." },
    { icon: <FaTrash className="text-4xl text-red-500" />, title: "Recycle Bin", description: "Restore deleted tasks from the recycle bin within 30 days." },
    { icon: <FaCalendarAlt className="text-4xl text-yellow-500" />, title: "Calendar Integration", description: "Sync tasks with your calendar and set reminders." },
    { icon: <FaBell className="text-4xl text-green-500" />, title: "Notifications", description: "Get notified via email, push, and desktop notifications." },
    { icon: <FaChartLine className="text-4xl text-purple-500" />, title: "Progress Tracking", description: "Track your task progress and stay on top of your goals." },
    { icon: <FaMicrophone className="text-4xl text-orange-500" />, title: "Voice Commands", description: "Manage your tasks using voice commands for hands-free control." },
    { icon: <FaMoon className="text-4xl text-gray-500" />, title: "Dark Mode", description: "Switch to dark mode to reduce eye strain and save battery." },
    { icon: <FaCloud className="text-4xl text-blue-300" />, title: "Offline Mode", description: "Access and manage your tasks even when you're offline." },
    { icon: <FaUpload className="text-4xl text-indigo-500" />, title: "Attachment Upload", description: "Attach files and documents to your tasks for easy reference." },
    { icon: <FaMapMarkedAlt className="text-4xl text-red-300" />, title: "Location Reminders", description: "Set location-based reminders for your tasks." },
    { icon: <FaShareAlt className="text-4xl text-green-300" />, title: "Sharing & Collaboration", description: "Share and collaborate on tasks with your team." },
    { icon: <FaStopwatch className="text-4xl text-yellow-300" />, title: "Time Tracking", description: "Track the time spent on each task and improve efficiency." },
    { icon: <FaFileExport className="text-4xl text-blue-600" />, title: "Export/Import", description: "Export and import tasks in CSV and Excel formats." },
    { icon: <FaComments className="text-4xl text-green-600" />, title: "In-App Chat", description: "Chat with your team directly within the app." },
    { icon: <FaSort className="text-4xl text-purple-600" />, title: "Categories & Custom Categories", description: "Organize tasks into categories and create custom categories." },
    { icon: <FaFolder className="text-4xl text-orange-600" />, title: "Archive Tasks", description: "Archive completed tasks for future reference." },
];

export const Features = () => {
    return (
        <div className=" shadow-lg relative w-full h-auto bg-blue-50 flex flex-col items-center justify-center py-20">
            <h1 className="text-4xl font-bold mb-12">Features</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-10">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                        {feature.icon}
                        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{feature.title}</h2>
                        <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
