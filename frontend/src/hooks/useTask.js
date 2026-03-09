// frontend/src/hooks/useTask.js

import { useSelector } from "react-redux";

export const useTask = (taskId) => {
  const task = useSelector((state) =>
    state.tasks.items.find((t) => t._id === taskId),
  );

  return task || null;
};

export default useTask;
