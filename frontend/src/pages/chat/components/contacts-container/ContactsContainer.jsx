import {X} from "lucide-react";

const ContactsContainer = ({onClose}) => {
  return (
    <div className="p-3 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h2 className="text-lg font-bold text-red-700">Contacts</h2>
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
      <input
        type="text"
        className="w-full mb-3 px-3 py-2 rounded-lg border focus:outline-none"
        placeholder="Search contacts..."
      />
      <div>
        <div className="w-full mb-3 px-3 py-2 uppercase">
          <span className="font-semibold">Personal Message</span>
        </div>
        <div className="w-full mb-3 px-3 py-2 uppercase">
          <span className="font-semibold">Channels</span>
        </div>
      </div>
    </div>
  );
};

export default ContactsContainer;
