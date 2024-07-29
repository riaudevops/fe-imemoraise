import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";

const keycloak = new Keycloak({
	url: import.meta.env.VITE_KEYCLOAK_URL,
	realm: import.meta.env.VITE_KEYCLOAK_REALM,
	clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const App = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [token, setToken] = useState<String>("");

	useEffect(() => {
		keycloak.init({ onLoad: "check-sso" }).then((auth) => {
			setIsLogin(auth);
			setToken(keycloak.token!);
		});
	}, []);

	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Hello there</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
					<button
						className="btn btn-primary"
						onClick={() => {
							if (isLogin) {
								keycloak.logout();
							} else {
								keycloak.login();
							}
						}}
					>
						{isLogin ? "Sign Out" : "Sign In"}
					</button>
					{(console.log(token), null)}
				</div>
			</div>
		</div>
	);
};

export default App;
