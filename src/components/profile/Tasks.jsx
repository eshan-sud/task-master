// src/components/profile/Tasks.jsx

import React, { useState, useEffect, useContext } from "react";
import Draggable from "react-draggable";
import toast from "react-hot-toast";

import { AddButton, PinButton, SendButton, ArchiveButton } from "../Buttons";
import AuthContext from "../../utils/AuthContext";
import { endpoints } from "../../ApiEndpoints";

const DraggableCard = ({
  id,
  content,
  title,
  onRemove,
  onPin,
  onArchive,
  onSend,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem(`card-${id}`));
    if (savedPosition) {
      setPosition(savedPosition);
    }
  }, [id]);

  const handleStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem(`card-${id}`, JSON.stringify(newPosition));
  };

  return (
    <Draggable bounds="parent" position={position} onStop={handleStop}>
      <div className="container p-4 h-auto w-64 bg-white shadow-md rounded-lg cursor-move relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={() => onRemove(id)}
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2">{content}</p>
        <div className="flex justify-between mt-4">
          <PinButton onClick={() => onPin(id)} />
          <SendButton onClick={() => onSend(id)} />
          <ArchiveButton onClick={() => onArchive(id)} />
        </div>
      </div>
    </Draggable>
  );
};

export const NoteContainer = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(endpoints.getNotes, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        setNotes(result.notes);
      } catch (error) {
        toast.error("Error fetching notes");
      }
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    const newNote = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      user: user.username,
      email: user.email,
    };
    setNotes([...notes, newNote]);
    setNewTitle("");
    setNewContent("");

    try {
      const response = await fetch(endpoints.addNote, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newNote),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred while adding the note");
    }
  };

  const removeNote = async (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    localStorage.removeItem(`card-${id}`);

    try {
      const response = await fetch(`${endpoints.deleteNote}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred while removing the note");
    }
  };

  const handlePin = (id) => {
    // Implement pin functionality
  };

  const handleArchive = (id) => {
    // Implement archive functionality
  };

  const handleSend = (id) => {
    // Implement send functionality
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <input
          className="p-2 border rounded-md w-full md:w-1/3"
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="p-2 border rounded-md w-full md:w-2/3"
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <AddButton onClick={addNote} />
      </div>
      <div className="relative h-screen">
        {notes.map((note) => (
          <DraggableCard
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onRemove={removeNote}
            onPin={handlePin}
            onArchive={handleArchive}
            onSend={handleSend}
          />
        ))}
      </div>
    </div>
  );
};
