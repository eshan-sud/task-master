// frontend/src/components/Tasks/DraggableTaskCard.jsx

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

const DraggableTaskCard = ({ task, onTaskClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? "z-50" : ""}`}
    >
      <TaskCard
        task={task}
        viewMode="list"
        onTaskClick={onTaskClick}
        isDragging={isDragging}
      />
    </div>
  );
};

export default DraggableTaskCard;
