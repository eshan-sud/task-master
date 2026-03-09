// frontend/src/components/Messages/MessagesPage.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  fetchMessages,
  sendMessage,
} from "../../store/slices/messagesSlice";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { FiMessageSquare } from "react-icons/fi";

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { conversations, loading, error } = useSelector(
    (state) => state.messages,
  );
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedConversation) {
      dispatch(fetchMessages(selectedConversation));
    }
  }, [dispatch, selectedConversation]);

  const handleSendMessage = (content) => {
    if (selectedConversation) {
      dispatch(
        sendMessage({
          conversationId: selectedConversation,
          content,
        }),
      );
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <FiMessageSquare size={24} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Messages
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <ChatWindow
                conversationId={selectedConversation}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FiMessageSquare
                    size={64}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/20 border-t border-red-400 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
