import { ReactKeycloakProvider } from "@react-keycloak/web";
import router from "./routers/app.routers";
import { RouterProvider } from "react-router-dom";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
	url: import.meta.env.VITE_KEYCLOAK_URL,
	realm: import.meta.env.VITE_KEYCLOAK_REALM,
	clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const App = () => {
	return (
		<ReactKeycloakProvider authClient={keycloak}>
			<RouterProvider router={router} />
		</ReactKeycloakProvider>	
	);
};

export default App;
