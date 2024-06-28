import { useState, useEffect } from "react";
import useLogout from "../../hooks/useLogout";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import useSendMessage from "../../hooks/useSendMessage";
import { IconLogout, IconMessageCircle, IconSearch, IconSend2 } from "@tabler/icons-react";

const HomePage = () => {
  const { loading: logoutLoading, logout } = useLogout();
  const { loading: conversationsLoading, conversations } = useGetConversations();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages, loading: messagesLoading } = useGetMessages();
  const { sendMessage, loading: sendLoading } = useSendMessage();

  useListenMessages();

  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    sendMessage(messageText);
    setMessageText("");
  };

  const statusIndicatorStyle = (status) => ({
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: status === "online" ? "green" : "red",
  });

  useEffect(() => {
    console.log("Conversations:", conversations);
    console.log("Selected Conversation:", selectedConversation);
  }, [conversations, selectedConversation]);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-neutral-950 text-white p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Xtrach</h1>
          <div className="relative">
            <img
              src="path/to/profile-image.jpg"
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span style={statusIndicatorStyle("online")}></span>
          </div>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            className="pl-4 pr-4 py-2 w-full rounded-md bg-neutral-800 text-white focus:outline-none"
          />
          <IconSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </div>
        <div className="flex flex-col space-y-2 overflow-y-auto flex-grow">
          {conversationsLoading ? (
            <p>Loading...</p>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setSelectedConversation(conversation)}
                className="flex items-center p-2 bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700"
              >
                <div className="relative">
                  <img
                    src={conversation.profileImage}
                    alt={conversation.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span style={statusIndicatorStyle(conversation.status)}></span>
                </div>
                <span className="ml-2">{conversation.name}</span>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="flex items-center p-2 bg-neutral-800 rounded-md cursor-pointer hover:bg-neutral-700"
            onClick={logout}
            disabled={logoutLoading}
          >
            {logoutLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <IconLogout className="h-6 w-6 text-neutral-400" />
                <span className="ml-2">Logout</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="w-3/4 bg-white text-black p-4 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={selectedConversation.profileImage}
                    alt={selectedConversation.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span style={statusIndicatorStyle(selectedConversation.status)}></span>
                </div>
                <h2 className="ml-2 text-xl font-semibold">{selectedConversation.name}</h2>
              </div>
              <IconMessageCircle className="h-8 w-8 text-neutral-400 cursor-pointer" />
            </div>
            <div className="flex flex-col flex-grow overflow-y-auto mb-4">
              {messagesLoading ? (
                <p>Loading messages...</p>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex justify-${
                      message.senderID === selectedConversation._id ? "start" : "end"
                    }`}
                  >
                    <div
                      className={`rounded-md p-2 ${
                        message.senderID === selectedConversation._id
                          ? "bg-neutral-200"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Type a message"
                className="pl-4 pr-20 py-2 w-full rounded-full bg-neutral-200 focus:outline-none"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                disabled={sendLoading}
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                disabled={sendLoading}
              >
                <IconSend2 className="h-8 w-8 text-gray-600" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow">
            <p>Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
