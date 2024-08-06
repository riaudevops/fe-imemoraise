import { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProgressTracker from "../components/landing/ProgressTracker";
import Features from "../components/landing/Features";
import FAQs from "../components/landing/FAQs";
import Footer from "../components/landing/Footer";

import { useKeycloak } from "../hooks/useKeycloak.hooks";

const LandingPages = () => {
	const [theme, setTheme] = useState<string>("emerald");

	const { keycloak, isLogin, token } = useKeycloak();
	console.log(token);

	const handleLogin = () => {
		if (isLogin) {
			keycloak.logout();
		} else {
			keycloak.login();
		}
	};

	return (
		<div data-theme={theme}>
			<Navbar
				setTheme={setTheme}
				currentTheme={theme}
				isLogin={isLogin}
				onLoginClick={handleLogin}
			/>
			<Hero isLogin={isLogin} onLoginClick={handleLogin} />
			{/* <ProgressTracker /> */}
			<Features />
			<FAQs />
			<Footer isLogin={isLogin} onLoginClick={handleLogin} />
		</div>
	);
};

export default LandingPages;
