// frontend/src/components/profile/Analytics.jsx

import { useState } from "react";
// import { Background } from "./Background.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { isBefore, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = [
  { name: "Task 1", completed: true, date: subDays(new Date(), 2) },
  { name: "Task 2", completed: false, date: subDays(new Date(), 1) },
  { name: "Task 3", completed: true, date: new Date() },
];

const COLORS = ["#0088FE", "#FF8042"];

const getTaskData = (startDate, endDate) => {
  return data.filter(
    (task) => isBefore(startDate, task.date) && isBefore(task.date, endDate)
  );
};

export const Analytics = () => {
  const [startDate, setStartDate] = useState(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState(new Date());
  const filteredData = getTaskData(startDate, endDate);
  const totalTasks = filteredData.length;
  const completedTasks = filteredData.filter((task) => task.completed).length;
  const completionRatio = completedTasks / totalTasks || 0;
  const getRating = () => {
    if (completionRatio >= 0.8) return "Good";
    if (completionRatio >= 0.5) return "Can Do Better";
    return "Bad";
  };
  const rating = getRating();
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-semibold mb-4">Analytics</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Select Date Range</h2>
        <div className="flex gap-4">
          <div>
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              maxDate={new Date()}
              className="border p-2 rounded-md"
            />
          </div>
          <div>
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              maxDate={new Date()}
              className="border p-2 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Task Completion Overview</h2>
        <BarChart
          width={600}
          height={300}
          data={[
            { name: "Tasks", total: totalTasks, completed: completedTasks },
          ]}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
          <Bar dataKey="completed" fill="#82ca9d" />
        </BarChart>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Completion Ratio</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={[
              { name: "Completed", value: completedTasks },
              { name: "Remaining", value: totalTasks - completedTasks },
            ]}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl font-semibold">Your Rating: {rating}</h2>
      </div>
    </div>
  );
};

export default Analytics;
