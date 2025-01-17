// filename - frontend/src/pages/Profile.jsx

import React from "react";
import { useRememberMe } from "../utils/RememberMeContext.js";

import { Background } from "../components/profile/Background.jsx";
import { NoteContainer } from "../components/profile/Tasks.jsx";
import {
  AddButton,
  SendButton,
  PinButton,
  BackToTopButton,
  ArchiveButton,
  AddNew,
} from "../components/Buttons.jsx";

export const Profile = () => {
  const { isRememberMe } = useRememberMe();
  const storage = isRememberMe ? window.localStorage : window.sessionStorage;

  // const cards = [
  //   { id: 1, content: "Task 1" },
  //   { id: 2, content: "Task 2" },
  //   { id: 3, content: "Task 3" },
  // ];
  // const pinnedCards = [];

  const addTask = () => {
    console.log("Task added!");
  };

  const addCategory = () => {
    console.log("Category added!");
  };

  return (
    <Background>
      <div className="profile-details mb-8 text-gray-900 dark:text-gray-100">
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

      <div className="mb-6 p-5 bg-white/50 rounded-xl shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex justify-evenly gap-4">
          <AddButton name="Add Category" colour="blue" onClick={addCategory} />
          <AddButton name="Add Task" colour="green" onClick={addTask} />
        </div>
      </div>

      <div className="pinnedTasks text-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-bold mb-4"> Pinned Tasks </h2>
        <div>
          {/* {pinnedCards.map((card) => (
            <DraggableCard key={card.id} id={card.id} content={card.content} />
          ))} */}
        </div>
      </div>

      <div className="tasks text-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-bold mb-4"> Current Tasks </h2>
        <div>
          {/* {cards.map((card) => (
            <DraggableCard key={card.id} id={card.id} content={card.content} />
          ))} */}
          <NoteContainer />
        </div>
      </div>
      <BackToTopButton />
    </Background>
  );
};
