import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import PopularServices from "../Components/PopularServices/PopularServices";
import CreateUser from "../Components/Create/CreateUser";
import UpdateUser from "../Components/UpdateUser/UpdateUser";
import ShowUser from "../Components/ShowUser/ShowUser";
import JobOpportunity from "../Components/JobOpportunity/JobOpportunity";
import Profile from "../Components/Profile/Profile";
import ViewDetails from "../Components/ViewJobDetails/ViewDetails";
import AddJobForm from "../Components/AddJobForm/AddJobForm";
import ShowJobForm from "../Components/ViewJobForm/ShowJobForm";
import JobUpdate from "../Components/JobUpdate/JobUpdate";
import University from "../Components/Univrsity/University";
import ShowSearchData from "../Components/ShowSearchData/ShowSearchData";
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
        element: <PopularServices></PopularServices>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/create",
        element: <CreateUser></CreateUser>
      },
      {
        path: "/updateuser/:id",
        element: <UpdateUser></UpdateUser>
      },
      {
        path: "/showuser",
        element: <ShowUser></ShowUser>
      },
      {
        path: "/jobopportunity",
        element: <JobOpportunity></JobOpportunity>
      },
      {
        path: "/jobopportunity/:jobNameQuery",
        element: <JobOpportunity></JobOpportunity>
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      },
      {
        path: "/viewdetails/:jobId",
        element: <ViewDetails></ViewDetails>
      },
      {
        path: "/addjob",
        element: <AddJobForm></AddJobForm>
      },
      {
        path: "/showjob",
        element: <ShowJobForm></ShowJobForm>
      },
      {
        path: "/update_job/:JobID",
        element: <JobUpdate></JobUpdate>
      },
      {
        path: "/university",
        element: <University></University>
      },
      {
        path: "/jobserach/:jobName",
        element: <ShowSearchData></ShowSearchData>
      }
    ]
  },
]);