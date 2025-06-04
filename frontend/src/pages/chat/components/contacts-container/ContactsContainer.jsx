import {X, User, Users} from "lucide-react";
import ProfileSection from "./components/ProfileSection";

const ContactsContainer = ({onClose}) => {
  return (
    <div className="p-3 relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h2 className="font-bold text-red-700">Contacts</h2>
        {onClose && (
          <button
            className="md:hidden p-2 bg-white rounded-full shadow border border-gray-200 hover:bg-gray-100 transition"
            onClick={onClose}
            aria-label="Close contacts"
          >
            <X className="w-5 h-5 text-red-700" />
          </button>
        )}
      </div>
      {/* Search */}
      <input
        type="text"
        className="w-full mb-4 px-3 py-2 rounded-lg border focus:outline-none"
        placeholder="Search contacts..."
      />
      {/* Sections (scrollable area) */}
      <div className="space-y-3 flex-1 overflow-y-auto pb-2 ">
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg">
          <User className="w-5 h-5 text-red-700" />
          <span className="font-semibold uppercase text-xs tracking-wider text-red-700">
            Personal Message
          </span>
        </div>
        {/* Place your personal message contacts here */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="font-semibold uppercase text-xs tracking-wider text-gray-700">
            Channels
          </span>
        </div>
        {/* Place your channels contacts here */}
      </div>
      {/* Profile section at the very bottom */}
      <ProfileSection />
    </div>
  );
};

export default ContactsContainer;
