import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {useAppStore} from "@/store/store";
import {ArrowLeft, CirclePlus, Trash} from "lucide-react";
import {useState} from "react";

const Profile = () => {
  const {userInfo} = useAppStore();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    image: "",
    hovered: false,
  });

  const {firstName, lastName, image, hovered} = profile;

  // Helper for updating profile fields
  const updateProfile = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Back"
          >
            <ArrowLeft />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Profile</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Avatar Section */}
          <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => updateProfile("hovered", true)}
            onMouseLeave={() => updateProfile("hovered", false)}
          >
            <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-full border text-black text-3xl shadow">
              {image ? (
                <AvatarImage
                  src={image}
                  className="w-full h-full object-cover bg-white/50"
                  alt="Profile"
                />
              ) : (
                <div className="uppercase w-full h-full flex items-center justify-center text-5xl font-extrabold rounded-full text-red-700 bg-gray-100">
                  {firstName ? firstName.charAt(0) : userInfo.email?.charAt(0)}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full transition">
                {image ? (
                  <Trash className="text-black text-3xl cursor-pointer" />
                ) : (
                  <CirclePlus className="text-black text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <span className="mt-3 text-gray-500 text-sm">{userInfo.email}</span>
          </div>
          {/* Form Section */}
          <form className="flex-1 flex flex-col gap-5 w-full max-w-md">
            <Input
              className="w-full"
              placeholder="Email"
              type="email"
              disabled
              value={userInfo.email}
            />
            <Input
              className="w-full"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => updateProfile("firstName", e.target.value)}
            />
            <Input
              className="w-full"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => updateProfile("lastName", e.target.value)}
            />
            {/* Add a Save button if needed */}
            <button
              type="submit"
              className="mt-2 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-xl transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
