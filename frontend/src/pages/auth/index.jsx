import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import api from "@/services/api";
import {useAppStore} from "@/store/store";
import {LOGIN_ROUTE, SIGNUP_ROUTE} from "@/utils/constants";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const Auth = () => {
  const navigate = useNavigate();

  const {setUserInfo} = useAppStore();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // login onChange handler

  const loginOnChangeHanlder = (e) => {
    const {name, value} = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // login onChange handler

  const singupOnChangeHanlder = (e) => {
    const {name, value} = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // signupValidations
  const signupValidation = () => {
    if (!signup.email.length) {
      toast.error("Email is Required");
      return false;
    }
    if (!signup.password.length) {
      toast.error("Password is Required");
      return false;
    }
    if (signup.confirmPassword !== signup.password) {
      toast.error("Password and confirm Password should be same");
      return false;
    }
    return true;
  };

  // signupValidations
  const loginValidation = () => {
    if (!signup.email.length) {
      toast.error("Email is Required");
      return false;
    }
    if (!signup.password.length) {
      toast.error("Password is Required");
      return false;
    }
    return true;
  };

  const signupHandler = async () => {
    if (signupValidation()) {
      const {email, password} = signup;
      const response = await api.post(
        SIGNUP_ROUTE,
        {email, password},
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    }
  };

  const loginHandler = async () => {
    const {email, password} = login;
    if (loginValidation) {
      const response = await api.post(
        LOGIN_ROUTE,
        {email, password},
        {withCredentials: true}
      );

      if (response.data.user.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log(response);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className=" lg:w-2xl items-center w-full mx-5 border rounded-2xl shadow-2xs p-5">
        <div className="flex flex-col justify-center items-center my-5">
          <h1 className="font-bold text-2xl">Welcome!</h1>
          <p className="">Fill in the details!</p>
        </div>
        <Tabs defaultValue="login" className="md:h-fit sm:h-fit">
          <TabsList className="flex justify-center w-full h-fit">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-red-700 data-[state=active]:text-white h-10"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-red-700 data-[state=active]:text-white h-10"
            >
              Signup
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="bg-transparent mt-10 flex flex-col gap-8"
            value="login"
          >
            <Input
              type={login.email}
              onChange={loginOnChangeHanlder}
              name="email"
              placeholder="Enter Your Email"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Input
              type={login.password}
              onChange={loginOnChangeHanlder}
              name="password"
              placeholder="Enter your password"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Button
              onClick={loginHandler}
              className="bg-red-700 hover:bg-red-800"
            >
              Login
            </Button>
          </TabsContent>
          {/* Signup */}
          <TabsContent
            className="bg-transparent mt-10 flex flex-col gap-5"
            value="signup"
          >
            <Input
              type={signup.email}
              onChange={singupOnChangeHanlder}
              name="email"
              placeholder="Enter Your Email"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Input
              type={signup.password}
              onChange={singupOnChangeHanlder}
              name="password"
              placeholder="Enter your password"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Input
              type={signup.confirmPassword}
              onChange={singupOnChangeHanlder}
              placeholder="confirm password"
              name="confirmPassword"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Button
              onClick={signupHandler}
              className="bg-red-700 hover:bg-red-800"
            >
              Signup
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
