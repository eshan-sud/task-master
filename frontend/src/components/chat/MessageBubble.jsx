// frontend/src/components/chat/MessageBubble.jsx

export default function MessageBubble({ text, mine }) {
  return (
    <div className={`p-2 rounded-lg max-w-[80%] text-sm ${mine ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black'}`}>
      {text}
    </div>
  )
}
