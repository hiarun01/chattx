import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import api from "@/services/api";
import {useAppStore} from "@/store/store";
import {
  ADD_PROFILE_IMG_ROUTE,
  BASE_URL,
  DELETE_PROFILE_IMAGE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";
import {ArrowLeft, CirclePlus, Trash} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useAppStore();
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      image: userInfo.image ? `${BASE_URL}/${userInfo.image}` : "",
    }));
  }, [userInfo]);

  const profileValidation = () => {
    if (!firstName) {
      toast.error("First Name is Required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is Required");
      return false;
    }
    return true;
  };

  const ProfileHandler = async (e) => {
    e.preventDefault();

    if (profileValidation()) {
      try {
        const response = await api.post(
          UPDATE_PROFILE_ROUTE,
          {firstName, lastName},
          {withCredentials: true}
        );

        if (response.status === 200 && response.data) {
          setUserInfo({...response.data});
          toast.success("Profile update successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("please setup profile");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await api.post(ADD_PROFILE_IMG_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.image) {
        setUserInfo({...userInfo, ...response.data.image});
        toast.success("Profile Image Updated successfully");
      }

      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileDelete = async () => {
    try {
      const response = await api.delete(DELETE_PROFILE_IMAGE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({...userInfo, image: null});
        toast.success("Profile Image Remove successfully");
        setProfile((prev) => ({
          ...prev,
          image: null,
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={handleNavigate}
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
              <div
                onClick={image ? handleFileDelete : handleFileInputClick}
                className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full transition"
              >
                {image ? (
                  <Trash className="text-black text-3xl cursor-pointer" />
                ) : (
                  <CirclePlus className="text-black text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              name="profile-image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".png, .jpg, jpeg, .svg, .webp"
            />
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

            <button
              type="submit"
              onClick={ProfileHandler}
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
