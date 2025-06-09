import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {useAppStore} from "@/store/store";
import {BASE_URL} from "@/utils/constants";

const ContactsList = ({contacts, isChannel = false, onClose}) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
      onClose(false);
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {contacts.map((contact) => {
        const isSelected =
          selectedChatData && selectedChatData._id === contact._id;
        return (
          <div
            key={contact._id}
            onClick={() => handleClick(contact)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition mb-2
            ${
              isSelected
                ? "bg-red-50 border border-red-200"
                : "hover:bg-gray-50"
            }`}
          >
            <Avatar className="w-10 h-10 rounded-full border shadow">
              {contact.image ? (
                <AvatarImage
                  src={`${BASE_URL}/${contact.image}`}
                  className="w-10 h-10 object-cover rounded-full"
                  alt="Profile"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-red-700 font-bold text-xl uppercase">
                  {contact.firstName
                    ? contact.firstName.charAt(0)
                    : contact.email?.charAt(0)}
                </div>
              )}
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-red-700 text-base truncate">
                {contact.firstName} {contact.lastName}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {contact.email}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactsList;
