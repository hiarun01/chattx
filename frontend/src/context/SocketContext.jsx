import {useAppStore} from "@/store/store";
import {BASE_URL} from "@/utils/constants";
import {createContext, useContext, useEffect, useRef} from "react";
import {io} from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket.current;
};

export const SocketProvider = ({children}) => {
  const socket = useRef();
  const {userInfo} = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(BASE_URL, {
        withCredentials: true,
        query: {userId: userInfo.id},
      });
      //  connection
      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        const {selectedChatData, selectedChatType, addMessage} =
          useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
          console.log("message :", message);
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
