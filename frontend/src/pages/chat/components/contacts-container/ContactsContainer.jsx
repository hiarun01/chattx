import {X} from "lucide-react";
import ProfileSection from "./components/ProfileSection";
import React, {useState, useEffect} from "react";
import api from "@/services/api";
import {
  BASE_URL,
  GET_DM_CONTACTS_ROUTE,
  SEARCH_CONTACT_ROUTE,
} from "@/utils/constants";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {Dialog, DialogContent, DialogDescription} from "@/components/ui/dialog";
import {useAppStore} from "@/store/store";
import {DialogTitle} from "@radix-ui/react-dialog";
import {Input} from "@/components/ui/input";
import ContactsList from "./components/ContactsList";

const ContactsContainer = ({onClose}) => {
  const {
    setSelectedChatType,
    setSelectedChatData,
    setDirectMessageContacts,
    directMessageContacts,
  } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContacts, setSearchContacts] = useState([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const handleSearchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await api.post(
          SEARCH_CONTACT_ROUTE,
          {searchTerm},
          {withCredentials: true}
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchContacts(response.data.contacts);
        }
      } else {
        setSearchContacts([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchDialogOpen) {
      handleSearchContacts(searchTerm);
    }
  }, [searchTerm, searchDialogOpen]);

  useEffect(() => {
    const getContacts = async () => {
      const response = await api.get(GET_DM_CONTACTS_ROUTE, {
        withCredentials: true,
      });

      if (response.data.contacts) {
        setDirectMessageContacts(response.data.contacts);
        console.log(response.data.contacts);
      }
    };
    getContacts();
  }, []);

  const selectNewContact = (contact) => {
    setSearchDialogOpen(false);
    setSearchTerm("");
    setSearchContacts([]);
    onClose(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
  };

  return (
    <div className="flex flex-col h-[90vh] p-3 relative bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b">
        <h2 className="font-extrabold inline-block w-full lg:text-center py-3 text-red-700 ">
          Chattx
        </h2>
        {onClose && (
          <button
            className="md:hidden p-2  rounded-full shadow border border-gray-200 hover:bg-gray-100 transition"
            onClick={onClose}
            aria-label="Close contacts"
          >
            <X className="w-5 h-5 text-red-700" />
          </button>
        )}
      </div>

      {/* Search Contacts */}
      <div className="pb-2">
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg border focus:outline-none"
          placeholder="Search contacts..."
          value={searchTerm}
          onFocus={() => setSearchDialogOpen(true)}
          readOnly
        />
      </div>

      {/* Contacts List Area */}
      <div className="flex-1 overflow-y-auto hide-scroll space-y-2">
        <div className="text-gray-400 text-center py-2 select-none">
          <ContactsList onClose={onClose} contacts={directMessageContacts} />
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogContent className="fixed bottom-0 right-0">
          <DialogTitle className="text-center font-bold">
            Find Your Contact
          </DialogTitle>
          <DialogDescription></DialogDescription>
          <Input
            autoFocus
            type="text"
            className="rounded-lg focus:outline-none text-lg text-center px-5 "
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mt-4 max-h-[50vh] overflow-y-auto">
            {Array.isArray(searchContacts) && searchContacts.length > 0 ? (
              searchContacts.map((contact) => (
                <div
                  onClick={() => selectNewContact(contact)}
                  key={contact._id}
                  className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-red-50 cursor-pointer transition mb-1 border"
                >
                  <Avatar className="w-12 h-12 rounded-full border shadow">
                    {contact.image ? (
                      <AvatarImage
                        src={`${BASE_URL}/${contact.image}`}
                        className="w-full h-full object-cover bg-white/50 rounded-full"
                        alt="Profile"
                      />
                    ) : (
                      <div className="uppercase w-full h-full flex items-center justify-center text-xl font-extrabold rounded-full text-red-700 bg-gray-100">
                        {contact.firstName
                          ? contact.firstName.charAt(0)
                          : contact.email?.charAt(0)}
                      </div>
                    )}
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {contact.firstName} {contact.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{contact.email}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-8">
                No contacts found
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Section at the bottom */}
      <div className="mt-auto">
        <ProfileSection />
      </div>
    </div>
  );
};

export default ContactsContainer;
