import {useAppStore} from "@/store/store";
import {X} from "lucide-react";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {BASE_URL} from "@/utils/constants";

const ChatHeader = () => {
  const {closeChat, selectedChatData} = useAppStore();

  return (
    <div className="w-full py-3 flex items-center bg-white border-b shadow-sm rounded-t-xl px-4 ">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="ml-20  lg:ml-0 w-10 h-10 rounded-full border shadow">
          {selectedChatData?.image ? (
            <AvatarImage
              src={`${BASE_URL}/${selectedChatData.image}`}
              className="w-10 h-10 object-cover rounded-full"
              alt="Profile"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-red-700 font-bold text-xl uppercase">
              {selectedChatData?.firstName
                ? selectedChatData.firstName.charAt(0)
                : selectedChatData?.email?.charAt(0)}
            </div>
          )}
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-red-700 text-base truncate">
            {selectedChatData?.firstName} {selectedChatData?.lastName}
          </span>
          <span className="text-xs text-gray-500 truncate">
            {selectedChatData?.email}
          </span>
        </div>
      </div>
      {/* Close Button */}
      <button
        onClick={closeChat}
        className="ml-auto p-2 rounded-full hover:bg-red-50 transition flex-shrink-0"
        aria-label="Close chat"
      >
        <X className="w-5 h-5 text-red-700" />
      </button>
    </div>
  );
};

export default ChatHeader;
