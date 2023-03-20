import { Outlet } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import HomePage from "./views/HomePage/HomePage";
import CharacterPage from "./views/CharacterPage/CharacterPage";

import "./styles/app.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "characters/:characterId",
    element: <CharacterPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
      <Outlet />
    </div>
  );
}

export default App;
