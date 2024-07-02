import React from 'react'
import { Navbar } from '../components/Navbar'

export const About = () => {
  return (
    <>
      <Navbar />
        <div className="w-full py-16 bg-gray-100 text-center">
          <h2 className="text-4xl font-bold mb-8">About Us</h2>
            <div className="max-w-4xl mx-auto">
                <p className="text-lg mb-6">
                    At Task Master, we are dedicated to helping you manage your tasks efficiently and effectively. Our mission is to provide a comprehensive task management solution that integrates seamlessly into your workflow. With a passionate team and a commitment to innovation, we aim to transform the way you organize and accomplish your tasks.
                </p>
                <p className="text-lg">
                    Whether you're an individual looking to boost productivity or a team striving for better collaboration, Task Master is here to support you every step of the way.
                </p>
            </div>
        </div>
    </>
  )
}
