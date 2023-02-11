import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginRegister from "./routes/login-register";
import Welcome from "./routes/welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister />,
  },
  {
    path: "/user/login",
    element: <Welcome />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
