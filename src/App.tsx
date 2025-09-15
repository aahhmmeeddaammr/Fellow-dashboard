import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/Home/Home";
import Groups from "./pages/Groups/Groups";
import GroupDetails from "./pages/GroupDetails/GroupDetails";
import FellowCalendar from "./pages/Calendar/Calendar";
import Login from "./pages/login/login";
import FellowAccount from "./pages/Account/Account";
import Support from "./pages/Support/Support";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/groups/:id",
        element: <GroupDetails />,
      },
      {
        path: "/calendar",
        element: <FellowCalendar />,
      },
      {
        path: "/account",
        element: <FellowAccount />,
      },
      {
        path: "/support",
        element: <Support />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
