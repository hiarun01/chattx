import api from "@/services/api";
import {useAppStore} from "@/store/store";
import {GET_MESSAGES} from "@/utils/constants";
import moment from "moment";
import React, {useEffect} from "react";
import {useRef} from "react";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatData,
    selectedChatType,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await api.post(
          GET_MESSAGES,
          {
            Id: selectedChatData._id,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

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
            <div className=" text-black my-2 text-center">
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
        className={`"" ${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div className="p-2 inline-block border px-5 rounded-2xl">
            {message.content}
          </div>
        )}

        <div className="text-xs text-gray-300 mt-1 ">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-start bg-gray-50 overflow-y-auto rounded-xl mx-2 my-2 p-4 hide-scrollbar smooth-scroll">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
