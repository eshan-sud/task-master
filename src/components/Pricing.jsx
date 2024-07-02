import React from 'react'

export const Pricing = () => {
    return (
        <div className="w-full py-16 bg-gray-100 text-center">
            <h2 className="text-4xl font-bold mb-8">Pricing</h2>
            <div className="flex flex-col items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
                    <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
                    <p className="text-lg mb-4">All features included at no cost!</p>
                    <ul className="list-disc list-inside text-left mb-4">
                        <li>Unlimited tasks</li>
                        <li>All integrations</li>
                        <li>Priority support</li>
                        <li>Regular updates</li>
                    </ul>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};