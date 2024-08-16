import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";
import { LoadingInterfaceLanding } from "../components/LoadingInterface";

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const { keycloak, initialized } = useKeycloak();

    // Tampilkan loading atau null hingga Keycloak siap
    if (!initialized) {
        return <LoadingInterfaceLanding />;
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
