import {useAppStore} from "@/store/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <div>chat</div>
    </>
  );
};

export default Chat;
