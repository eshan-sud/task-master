// frontend/src/components/profile/Dashboard.jsx

import { useState } from "react";
import { Background } from "./Background.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", deadline: new Date() },
    { id: 2, title: "Task 2", deadline: new Date() },
    { id: 3, title: "Task 3", deadline: new Date() },
  ]);
  const [taskInput, setTaskInput] = useState("");

  const tasksDueToday = tasks.filter(
    (task) => task.deadline.toDateString() === new Date().toDateString()
  );

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: taskInput,
      deadline: date,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  return (
    <div className="relative min-h-screen">
      <Background>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-5">
          Dashboard
        </h1>
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Tasks Due Today: {tasksDueToday.length}
          </h2>
          <ul>
            {tasksDueToday.map((task) => (
              <li
                key={task.id}
                className="bg-gray-100 dark:bg-gray-700 p-3 mb-2 border border-gray-300 dark:border-gray-600 rounded"
              >
                {task.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Calendar
          </h2>
          <Calendar onChange={setDate} value={date} className="mb-5" />
          <div className="flex mt-3">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add task..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded mr-3"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add Task
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Tasks for {date.toDateString()}
          </h2>
          <ul>
            {tasks
              .filter(
                (task) => task.deadline.toDateString() === date.toDateString()
              )
              .map((task) => (
                <li
                  key={task.id}
                  className="bg-gray-100 dark:bg-gray-700 p-3 mb-2 border border-gray-300 dark:border-gray-600 rounded"
                >
                  {task.title}
                </li>
              ))}
          </ul>
        </div>
      </Background>
    </div>
  );
};
