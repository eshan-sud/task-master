// frontend/src/components/profile/Background.jsx

export const Background = ({ children }) => {
  return (
    <div className="relative min-h-screen p-10 bg-green-200 dark:bg-black rounded-[64px]">
      {children}
    </div>
  );
};
