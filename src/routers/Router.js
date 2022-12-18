import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../components/Home";
import Error from "../components/Error";
import Search from "../components/Search";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <Error/>
    },
    {
      path: "/search",
      element: <Search/>,
      errorElement: <Error/>
    },
  ]);
  
const Router = ()=>(
    <RouterProvider router={router} />
)

export default Router;