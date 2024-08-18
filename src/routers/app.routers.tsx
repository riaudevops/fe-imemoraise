import { createBrowserRouter } from "react-router-dom";
import LandingPages from "../pages/landing.pages.tsx";
import DashboardMahasiswaPages from "../pages/mahasiswa/dashboard.mahasiswa.pages.tsx";
import SetoranMahasiswaPages from "../pages/mahasiswa/setoran.mahasiswa.pages.tsx";
import DashboardPAPages from "../pages/pa/dashboard.pa.pages.tsx";
import MahasiswaPAPages from "../pages/pa/mahasiswa.pa.pages.tsx";
import ProtectedRoute from "./protected.routers.tsx";
import NotFound from "../components/NotFound.tsx";
import Forbidden from "../components/Forbidden.tsx";
import MahasiswaPASetoranPages from "../pages/pa/mahasiswa.pa.setoran.pages.tsx";
const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPages />,
	},
	{
		path: "/unauthorized",
		element: <Forbidden />,
	},
	{
		path: "*",
		element: <NotFound />
	},
	{
		path: "/mahasiswa",
		element: (
			<ProtectedRoute roles={["mahasiswa"]}>
				<DashboardMahasiswaPages />
			</ProtectedRoute>
		),
	},
	{
		path: "/mahasiswa/setoran",
		element: (
			<ProtectedRoute roles={["mahasiswa"]}>
				<SetoranMahasiswaPages />
			</ProtectedRoute>
		),
	},
	{
		path: "/pa",
		element: (
			<ProtectedRoute roles={["dosen-pa"]}>
				<DashboardPAPages />
			</ProtectedRoute>
		),
	},
	{
		path: "/pa/mahasiswa",
		element: (
			<ProtectedRoute roles={["dosen-pa"]}>
				<MahasiswaPAPages />
			</ProtectedRoute>
		),
	},
	{
		path: "/pa/mahasiswa/setoran",
		element: (
			<ProtectedRoute roles={["dosen-pa"]}>
				<MahasiswaPASetoranPages />
			</ProtectedRoute>
		),
	},
]);

export default router;
