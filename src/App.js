import Layout from "./Components/Layout/Layout";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import Message from "./Components/Message/Message";
import AddAdmin from "./Components/AddAdmin/AddAdmin";
import AddUser from "./Components/AddUser/AddUser";
import AddAdv from "./Components/AddAdv/AddAdv";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import FieldAdv from "./Components/FieldAdv/FieldAdv";
import AddMessage from "./Components/AddMessage/AddMessage";
import Analyze from "./Components/Analyze/Analyze";
import { useContext, useEffect } from "react";
import { authContext } from "./Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import AddCategory from "./Components/AddCategory/AddCategory";

function App() {
  let { userData, setData } = useContext(authContext);
  function DtataToken() {
    let tokenDecode = localStorage.getItem("userData");
    let dataDecode = jwtDecode(tokenDecode);
    setData(dataDecode);
  }
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      DtataToken();
    }
  }, []);
  const router = createHashRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <Login /> },
        { path: '/home', element: <Home /> },
        { path: "/addAdmin", element: <AddAdmin />},
        { path: "/addUser", element: <AddUser /> },
        { path: "/addAdv", element: <AddAdv /> },
        { path: "/message", element: <Message /> },
        { path: "/addMessage", element: <AddMessage /> },
        { path: "/analyze", element: <Analyze /> },
        { path: "/productDetails/:name/:id", element: <ProductDetails /> },
        { path: "/fieldAdv/:categoryId", element: <FieldAdv />, },
        { path: "/AddCategory", element: <AddCategory /> },
        { path: "*", element: <Notfound /> },
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
