import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../components/Home";
import Error from "../components/Error";
import Search from "../components/Search";
import BookDetails from "../components/BookDetails";


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
    {
      path: "/books/:id",
      element: <BookDetails/>,
      errorElement: <Error/>
    },
  ]);
  
const Router = ()=>(
    <RouterProvider router={router} />
)

export default Router;