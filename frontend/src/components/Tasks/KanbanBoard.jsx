// frontend/src/components/Tasks/KanbanBoard.jsx

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/slices/tasksSlice";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";

const KanbanBoard = ({ tasks, onTaskClick }) => {
  const dispatch = useDispatch();
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const columns = {
    pending: {
      id: "pending",
      title: "Pending",
      status: "pending",
      color: "bg-yellow-100 dark:bg-yellow-900/20",
      headerColor: "bg-yellow-500",
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      status: "in-progress",
      color: "bg-blue-100 dark:bg-blue-900/20",
      headerColor: "bg-blue-500",
    },
    completed: {
      id: "completed",
      title: "Completed",
      status: "completed",
      color: "bg-green-100 dark:bg-green-900/20",
      headerColor: "bg-green-500",
    },
  };

  // Group tasks by status
  const tasksByStatus = {
    pending: tasks.filter((task) => task.status === "pending"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find((t) => t._id === active.id);
    const overColumnId = over.id.toString();

    // Check if dropped over a column
    if (Object.keys(columns).includes(overColumnId)) {
      if (activeTask.status !== overColumnId) {
        // Update task status
        await dispatch(
          updateTask({
            taskId: activeTask._id,
            updates: { status: overColumnId },
          }),
        );
      }
      return;
    }

    // Check if reordering within same column
    const overTask = tasks.find((t) => t._id === over.id);
    if (overTask && activeTask.status === overTask.status) {
      const columnTasks = tasksByStatus[activeTask.status];
      const oldIndex = columnTasks.findIndex((t) => t._id === active.id);
      const newIndex = columnTasks.findIndex((t) => t._id === over.id);

      if (oldIndex !== newIndex) {
        const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);
        // Here you could dispatch an action to save the new order to backend
        console.log(
          "Reordered tasks:",
          reorderedTasks.map((t) => t._id),
        );
      }
    }
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
        {Object.values(columns).map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id] || []}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-90">
            <TaskCard task={activeTask} viewMode="list" isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
