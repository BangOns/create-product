import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import CreateProduct from "../Pages/CreateProduct/CreateProduct";
import GetProduct from "../Pages/GetProduct/GetProduct";
import ErrorPage from "../Pages/Error/ErrorPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <CreateProduct />,
  },
  {
    path: "/get/:id",
    element: <GetProduct />,
  },
  {
    errorElement: <ErrorPage />,
  },
]);

export default function RootRouting() {
  return <RouterProvider router={route} />;
}
