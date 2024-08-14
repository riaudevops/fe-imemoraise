import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.hooks";

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const { keycloak, initialized } = useKeycloak();
    const { theme } = useTheme();

    // Tampilkan loading atau null hingga Keycloak siap
    if (!initialized) {
        return <div data-theme={theme} className="h-screen w-screen"></div>;
    }

    // Periksa apakah pengguna sudah terautentikasi
    if (!keycloak.authenticated) {
        return <Navigate to="/" />;
    }

    // Periksa apakah pengguna memiliki salah satu dari peran yang diizinkan
    const hasRole = roles.some((role) => keycloak.hasResourceRole(role));

    if (!hasRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
