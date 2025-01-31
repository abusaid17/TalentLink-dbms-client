import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import PopularServices from "../Components/PopularServices/PopularServices";
import CreateUser from "../Components/Create/CreateUser";
import UpdateUser from "../Components/UpdateUser/UpdateUser";
import ShowUser from "../Components/ShowUser/ShowUser";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/popularservices",
          element:<PopularServices></PopularServices>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path: "/create",
          element:<CreateUser></CreateUser>
        },
        {
          path:"/updateuser/:id",
          element:<UpdateUser></UpdateUser>
        },
        // {
        //   path:"/deleteuser",
        //   element:<DeleteUser></DeleteUser>
        // },
        {
          path:"/showuser",
          element:<ShowUser></ShowUser>
        }
      ]
    },
  ]);