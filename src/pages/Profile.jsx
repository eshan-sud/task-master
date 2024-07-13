import React, { useEffect, useState } from "react";

import { DraggableCard } from "../components/profile/Tasks";
import {
  AddItemButton,
  SendButton,
  PinButton,
  BackToTopButton,
  ArchiveButton,
  AddNew,
} from "../components/Buttons";

export const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software developer with a passion for learning new technologies.",
  };

  const cards = [
    { id: 1, content: "Task 1" },
    { id: 2, content: "Task 2" },
    { id: 3, content: "Task 3" },
  ];

  return (
    <div className="relative min-h-screen p-8 bg-green-200">
      <div className="profile-details mb-8">
        <h1 className="text-2xl font-bold mb-2"> Profile </h1>
        <p className="text-lg">
          <strong> Name: </strong> {user.name}
        </p>
        <p className="text-lg">
          <strong> Email: </strong> {user.email}
        </p>
        <p className="text-lg">
          <strong> Bio: </strong> {user.bio}
        </p>
      </div>

      <div className="buttons mb-8">
        <AddItemButton />
        <SendButton />
        <BackToTopButton />
        <PinButton />
        <AddNew />
        <ArchiveButton />
      </div>

      <div className="tasks">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <div>
          {cards.map((card) => (
            <DraggableCard key={card.id} id={card.id} content={card.content} />
          ))}
        </div>
      </div>
    </div>
  );
};
