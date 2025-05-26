import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const Auth = () => {
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
              type="email"
              placeholder="Enter Your Email"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Button className="bg-red-700 hover:bg-red-800">Login</Button>
          </TabsContent>
          {/* Signup */}
          <TabsContent
            className="bg-transparent mt-10 flex flex-col gap-5"
            value="signup"
          >
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Input
              type="password"
              placeholder="confirm password"
              className="w-full bg-transparent rounded-2xl h-10"
            />
            <Button className="bg-red-700 hover:bg-red-800">Signup</Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
