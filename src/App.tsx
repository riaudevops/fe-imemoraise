import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import ProgressTracker from "./components/landing/ProgressTracker";
import Features from "./components/landing/Features";
import FAQs from "./components/landing/FAQs";
import Footer from "./components/landing/Footer";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  // const [token, setToken] = useState<string>("");
  const [theme, setTheme] = useState<string>("emerald");

  // useEffect(() => {
  // 	keycloak.init({ onLoad: "check-sso" }).then((auth) => {
  // 		setIsLogin(auth);
  // 		setToken(keycloak.token!);
  // 	});
  // }, []);

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
      <ProgressTracker />
      <Features />
      <FAQs />
      <Footer isLogin={isLogin} onLoginClick={handleLogin} />
    </div>
  );
};

export default App;
