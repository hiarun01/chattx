import React from "react";
import {MessageCircle} from "lucide-react";

const EmptyChatContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 select-none bg-gradient-to-br from-red-50 to-white">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6 shadow-inner">
        <MessageCircle className="w-14 h-14 text-red-300" />
      </div>
      <h2 className="text-3xl font-bold mb-2 text-gray-600">
        Welcome to Chattx
      </h2>
      <p className="text-base text-gray-500 mb-2">
        Select a contact or start a new conversation.
        <br />
        Your messages will appear here.
      </p>
      <span className="inline-block mt-4 px-4 py-2 rounded-full bg-red-50 text-red-600 text-xs font-semibold shadow">
        No chat selected
      </span>
    </div>
  );
};

export default EmptyChatContainer;
