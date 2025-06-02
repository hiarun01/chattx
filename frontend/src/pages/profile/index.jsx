import {useAppStore} from "@/store/store";

const Profile = () => {
  const {userInfo} = useAppStore();
  console.log("userInfo from store:", userInfo);
  return (
    <>
      <div>Email :{userInfo.email}</div>
    </>
  );
};

export default Profile;
