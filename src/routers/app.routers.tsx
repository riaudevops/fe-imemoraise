import { createBrowserRouter } from "react-router-dom";
import LandingPages from "../pages/landing.pages.tsx";
import DashboardMahasiswaPages from "../pages/mahasiswa/dashboard.mahasiswa.pages.tsx";
import SetoranMahasiswaPages from "../pages/mahasiswa/setoran.mahasiswa.pages.tsx";
import DashboardPAPages from "../pages/pa/dashboard.pa.pages.tsx";
import MahasiswaPAPages from "../pages/pa/mahasiswa.pa.pages.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
  {
    path: "/mahasiswa",
    element: <DashboardMahasiswaPages />,
  },
  {
    path: "/mahasiswa/setoran",
    element: <SetoranMahasiswaPages />,
  },
  {
    path: "/pa",
    element: <DashboardPAPages />,
  },
  {
    path: "/pa/mahasiswa",
    element: <MahasiswaPAPages />,
  },
]);

export default router;
