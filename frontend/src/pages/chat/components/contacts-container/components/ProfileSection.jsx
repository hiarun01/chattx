import {AvatarImage} from "@/components/ui/avatar";
import {useAppStore} from "@/store/store";
import {BASE_URL} from "@/utils/constants";
import {Avatar} from "@radix-ui/react-avatar";
import React from "react";
import {useNavigate} from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();
  const {userInfo} = useAppStore();

  // Add your logout logic here
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="w-full flex items-center gap-3 p-3 border-t bg-white">
      <Avatar
        onClick={() => navigate("/profile")}
        className="w-10 h-10 rounded-full border shadow"
      >
        {userInfo.image ? (
          <AvatarImage
            src={`${BASE_URL}/${userInfo.image}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="Profile"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-red-700 font-bold text-xl uppercase">
            {userInfo.firstName
              ? userInfo.firstName.charAt(0)
              : userInfo.email?.charAt(0)}
          </div>
        )}
      </Avatar>
      <div className="flex flex-col flex-1">
        <span className="font-semibold text-gray-800 text-sm">
          {userInfo.firstName
            ? userInfo.firstName + " " + (userInfo.lastName || "")
            : userInfo.email}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSection;
