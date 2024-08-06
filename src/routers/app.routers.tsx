import LandingPages from "../pages/landing.pages.tsx";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
]);

export default router;
