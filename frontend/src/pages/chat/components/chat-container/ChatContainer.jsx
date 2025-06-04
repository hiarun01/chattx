import React from "react";
import MessageContainer from "./components/message-container/MessageContainer";
import MessageBar from "./components/message-bar/MessageBar";
import ChatHeader from "./components/chat-header/ChatHeader";

const ChatContainer = () => {
  return (
    <section className="flex-1 flex flex-col bg-white rounded-xl shadow-2xs">
      {/* Chat header */}
      <ChatHeader />
      {/* Chat messages */}
      <div className="flex-1 flex flex-col justify-center">
        <MessageContainer />
      </div>
      {/* Message input bar */}
      <div className="px-2 pb-2">
        <MessageBar />
      </div>
    </section>
  );
};

export default ChatContainer;
