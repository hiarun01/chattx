import React, {useState} from "react";
import {Paperclip, Smile, Send} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

import {useAppStore} from "@/store/store";
import {useSocket} from "@/context/SocketContext";

const MessageBar = () => {
  const socket = useSocket();
  const {selectedChatData, selectedChatType, userInfo} = useAppStore();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (!socket) return;
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData.id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
  };
  return (
    <div className="h-16 flex items-center px-4 bg-white rounded-b-xl ">
      {/* File attachment button */}
      <label className="cursor-pointer flex items-center mr-2">
        <Paperclip className="w-5 h-5 text-gray-500 hover:text-red-700 transition" />
        <input type="file" className="hidden" />
      </label>
      {/* Sticker/emoji button */}
      <div className="relative">
        <button
          onClick={() => setEmojiPickerOpen((open) => !open)}
          className="mr-2 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Stickers"
          type="button"
        >
          <Smile className="w-5 h-5 text-gray-500 hover:text-red-700 transition" />
        </button>
        {emojiPickerOpen && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker
              onEmojiClick={handleAddEmoji}
              theme="light"
              height={350}
              width={300}
            />
          </div>
        )}
      </div>
      {/* Message input */}
      <input
        className="w-full flex-1 px-4 py-2 rounded-xl border focus:outline-none"
        placeholder="Type your message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSendMessage}
        className="ml-2 p-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition flex items-center justify-center"
        aria-label="Send"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MessageBar;
