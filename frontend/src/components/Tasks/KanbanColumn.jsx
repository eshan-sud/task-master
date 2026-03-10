// frontend/src/components/Tasks/KanbanColumn.jsx

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableTaskCard from "./DraggableTaskCard";

const KanbanColumn = ({ column, tasks, onTaskClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div
        className={`${column.headerColor} text-white px-4 py-3 rounded-t-lg flex items-center justify-between`}
      >
        <h3 className="font-semibold text-lg">{column.title}</h3>
        <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>

      {/* Column Body */}
      <div
        ref={setNodeRef}
        className={`${column.color} ${
          isOver ? "ring-2 ring-blue-500 ring-opacity-50" : ""
        } rounded-b-lg p-4 min-h-[500px] transition-all`}
      >
        <SortableContext
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <DraggableTaskCard
                  key={task._id}
                  task={task}
                  onTaskClick={onTaskClick}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                <p className="text-sm">No tasks</p>
                <p className="text-xs mt-1">Drag tasks here</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
