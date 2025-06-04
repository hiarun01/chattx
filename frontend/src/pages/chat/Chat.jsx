import {useAppStore} from "@/store/store";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import ContactsContainer from "./components/contacts-container/ContactsContainer";
import ChatContainer from "./components/chat-container/ChatContainer";
import {Menu} from "lucide-react";

const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center px-5">
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden relative">
        {/* Hamburger menu for mobile */}
        <button
          className="absolute top-1 left-4 z-20 md:hidden bg-white p-2 rounded-full shadow"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open contacts"
        >
          <Menu className="w-6 h-6 text-red-700" />
        </button>
        {/* Sidebar for contacts */}
        <aside
          className={`
    fixed inset-0 z-30 bg-black/30 transition md:static md:z-0 md:bg-transparent
    ${sidebarOpen ? "block" : "hidden"} md:block
  `}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`
      w-4/5 max-w-xs h-full bg-gray-50 border-r flex flex-col shadow-lg
      transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:relative md:w-full md:max-w-none md:h-auto md:shadow-none
    `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <ContactsContainer onClose={() => setSidebarOpen(false)} />
              </div>
            </div>
          </div>
        </aside>
        {/*chat area */}
        <main className="flex-1 flex flex-col">
          <ChatContainer />
        </main>
      </div>
    </div>
  );
};

export default Chat;
