import { ProtectedRouteProps } from "../interfaces/common.interfaces";
import { useKeycloak } from "@react-keycloak/web";
import { useTheme } from "../hooks/useTheme.hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { keycloak, initialized } = useKeycloak();
  const { theme } = useTheme();

  // Tampilkan loading atau null hingga Keycloak siap
  if (!initialized) {
    return <div data-theme={theme} className="w-screen h-screen" />;
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
