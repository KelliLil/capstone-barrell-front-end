import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login";
import Register from "./routes/register";
import Welcome from "./routes/welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/welcome",
    element: <Welcome />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
