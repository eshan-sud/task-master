// src/Profile.jsx

import React from "react";
import { useRememberMe } from "../utils/RememberMeContext.js";

import { NoteContainer } from "../components/profile/Tasks";
import {
  AddButton,
  SendButton,
  PinButton,
  BackToTopButton,
  ArchiveButton,
  AddNew,
} from "../components/Buttons";

export const Profile = () => {
  const { isRememberMe } = useRememberMe();
  const storage = isRememberMe ? window.localStorage : window.sessionStorage;

  // const cards = [
  //   { id: 1, content: "Task 1" },
  //   { id: 2, content: "Task 2" },
  //   { id: 3, content: "Task 3" },
  // ];
  // const pinnedCards = [];

  return (
    <div className="relative min-h-screen p-10 bg-green-200 rounded-[64px]">
      <div className="profile-details mb-8">
        <h1 className="text-2xl font-bold mb-2"> Profile </h1>
        <p className="text-lg">
          <strong> Name: </strong> {storage.getItem("fullName")}
        </p>
        <p className="text-lg">
          <strong> Email: </strong> {storage.getItem("email")}
        </p>
      </div>

      <div className="buttons mb-8">
        <SendButton />
        <PinButton />
        <AddNew />
        <ArchiveButton />
      </div>

      <div className="mb-4 p-5 bg-white/50 rounded-xl">
        <AddButton name="Category" color="blue" />
        <AddButton name="Task" color="green" />
      </div>

      <div className="pinnedTasks">
        <h2 className="text-xl font-bold mb-4"> Pinned Tasks </h2>
        <div>
          {/* {pinnedCards.map((card) => (
            <DraggableCard key={card.id} id={card.id} content={card.content} />
          ))} */}
        </div>
      </div>

      <div className="tasks">
        <h2 className="text-xl font-bold mb-4"> Current Tasks </h2>
        <div>
          {/* {cards.map((card) => (
            <DraggableCard key={card.id} id={card.id} content={card.content} />
          ))} */}
          <NoteContainer />
        </div>
      </div>
      <BackToTopButton />
    </div>
  );
};
