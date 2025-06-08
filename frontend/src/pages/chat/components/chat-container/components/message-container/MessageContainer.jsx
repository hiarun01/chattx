import {useAppStore} from "@/store/store";
import moment from "moment";
import React, {useEffect} from "react";
import {useRef} from "react";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {selectedChatData, selectedChatType, selectedChatMessages} =
    useAppStore();

  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-black my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div className=" border p-2">{message.content}</div>
        )}

        <div> {moment(message.timestamp).format("LT")}</div>
      </div>
    );
  };
  return (
    <div className="flex-1 flex flex-col items-center  justify-center bg-gray-50 overflow-y-auto rounded-xl mx-2 my-2 ">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
