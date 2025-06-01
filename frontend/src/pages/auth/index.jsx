import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {useState} from "react";

const Auth = () => {
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

  const loginHandler = () => {
    console.log(login);
  };

  const signupHandler = () => {
    console.log(signup);
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
