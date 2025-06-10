import React from "react";
import MessageContainer from "./components/message-container/MessageContainer";
import MessageBar from "./components/message-bar/MessageBar";
import ChatHeader from "./components/chat-header/ChatHeader";

const ChatContainer = () => {
  return (
    // Make sure the parent section fills the available space
    <section className="flex flex-col h-[90vh] bg-white rounded-xl shadow-2xs">
      <ChatHeader />
      <div className="flex-1 min-h-0 flex flex-col">
        <MessageContainer />
      </div>
      <div className="px-2 pb-2">
        <MessageBar />
      </div>
    </section>
  );
};

export default ChatContainer;
