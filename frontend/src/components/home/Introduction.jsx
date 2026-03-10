// frontend/src/components/home/Introduction.jsx

export const Introduction = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center shadow-2xl">
      <div className="flex flex-col justify-center items-center bg-white/50 dark:bg-gray-900/60 p-10 rounded-full backdrop-blur-sm border border-gray-200/70 dark:border-gray-700/70 transition-colors">
        <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Give Yourself the Power of Task Management
        </h4>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Save Time & Be Efficient
        </h1>
        <h6 className="text-md font-bold text-gray-700 dark:text-gray-200 mb-4">
          The all-in-one solution to transform yourself
        </h6>
      </div>
    </div>
  );
};
