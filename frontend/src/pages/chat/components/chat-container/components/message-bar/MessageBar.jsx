import React from "react";

const MessageBar = () => (
  <div className="h-16 flex items-center px-4 bg-white">
    <input
      className="w-full flex-1 px-4 py-2 rounded-xl border focus:outline-none"
      placeholder="Type your message..."
      type="text"
    />
    <button className="ml-2 px-4 py-2 bg-red-700 text-white rounded-xl hover:bg-red-800 transition">
      Send
    </button>
  </div>
);

export default MessageBar;
