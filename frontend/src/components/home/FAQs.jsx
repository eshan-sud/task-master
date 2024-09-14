// src/components/home/FAQs.jsx

import React from "react";
// import { PlayStoreButton, AppStoreButton } from '../components/Buttons.jsx';

export const FAQs = () => {
  return (
    <div className="w-full py-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Is Task Master really free?
          </h3>
          <p className="text-lg">
            Yes, Task Master is completely free with no hidden costs.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">How do I get started?</h3>
          <p className="text-lg">
            Click the "Get Started" button above to sign up and start managing
            your tasks efficiently.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Can I collaborate with others?
          </h3>
          <p className="text-lg">
            Yes, Task Master allows you to share and collaborate on tasks with
            your team.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Is there a mobile app?
          </h3>
          <p className="text-lg">
            We are currently working on a mobile app. Stay tuned for updates!
          </p>
          {/* <PlayStoreButton /> <AppStoreButton /> */}
        </div>
      </div>
    </div>
  );
};
