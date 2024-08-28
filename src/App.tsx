import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { RouterProvider } from "react-router-dom";
import router from "./routers/app.routers";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL_PLACEHOLDER,
  realm: import.meta.env.VITE_KEYCLOAK_REALM_PLACEHOLDER,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_PLACEHOLDER,
});

const App = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <RouterProvider router={router} />
    </ReactKeycloakProvider>
  );
};

export default App;
