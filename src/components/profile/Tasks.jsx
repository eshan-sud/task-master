import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

export const DraggableCard = ({ id, content }) => {
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
      <div className="p-4 h-96 w-fit bg-white shadow-md rounded-lg cursor-move">
        {content}
      </div>
    </Draggable>
  );
};

export const TextTask = () => {
  return <></>;
};

export const VoiceTask = () => {
  return <></>;
};
