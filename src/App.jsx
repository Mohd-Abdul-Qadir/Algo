import Bubble from "./Pages/Bubble/Bubble";
import Insertion from "./Pages/Insertion/Insertion";
import Selection from "./Pages/Selection/Selection";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Menu/Menu";
import "./Style/global.scss";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Bubble />,
        },
        {
          path: "/insertion",
          element: <Insertion />,
        },
        {
          path: "/selection",
          element: <Selection />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
