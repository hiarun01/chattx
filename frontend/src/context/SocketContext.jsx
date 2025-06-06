import {useAppStore} from "@/store/store";
import {BASE_URL} from "@/utils/constants";
import {createContext, useContext, useEffect, useRef} from "react";
import {io} from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket?.current;
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
      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
