// frontend/src/components/profile/Tasks.jsx

// export const NoteContainer = () => {
//   return (
//     <div className="p-4">
//       <div className="mb-4 flex flex-col md:flex-row gap-2">
//         <input
//           className="p-2 border rounded-md w-full md:w-1/3"
//           type="text"
//           placeholder="Title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//         />
//         <textarea
//           className="p-2 border rounded-md w-full md:w-2/3"
//           placeholder="Content"
//           value={newContent}
//           onChange={(e) => setNewContent(e.target.value)}
//         />
//         <AddButton onClick={addNote} />
//       </div>
//       <div className="relative h-screen">
//         {/* {notes.map((note) => (
//           <DraggableCard
//             key={note.id}
//             id={note.id}
//             title={note.title}
//             content={note.content}
//             onRemove={removeNote}
//             onPin={handlePin}
//             onArchive={handleArchive}
//             onSend={handleSend}
//           />
//         ))} */}
//       </div>
//     </div>
//   );
// };

export const NoteContainer = () => {
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-gray-700 dark:text-gray-200">
        Notes are currently unavailable.
      </div>
    </div>
  );
};
