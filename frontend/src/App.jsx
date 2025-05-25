import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Auth from "./pages/auth";
import {Navigate} from "react-router-dom";
import Profile from "./pages/profile";
import Chat from "./pages/chat";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
