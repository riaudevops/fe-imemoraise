import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import FAQs from "../components/landing/FAQs";
import Footer from "../components/landing/Footer";
import { useTheme } from "../hooks/useTheme.hooks";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const LandingPages = () => {
  const { theme, setTheme } = useTheme();
  const { keycloak } = useKeycloak();

  const handleLogin = () => {
    if (keycloak.authenticated) {
      keycloak.logout();
    } else {
      keycloak.login();
    }
  };

  const navigate = useNavigate();

  const handleGoToDashboard = (navigate: NavigateFunction) => {
  
    if (keycloak.hasResourceRole("mahasiswa")) {
      navigate("/mahasiswa");
    } else if (keycloak.hasResourceRole("dosen-pa")) {
      navigate("/pa");
    }
  };
  
  return (
    <div data-theme={theme}>
      <Navbar
        setTheme={setTheme}
        currentTheme={theme}
        isLogin={keycloak.authenticated!}
        onLoginClick={handleLogin}
        onGoToDashboardClick={() => handleGoToDashboard(navigate)}
      />
      <Hero isLogin={keycloak.authenticated!} onLoginClick={handleLogin} onGoToDashboardClick={() => handleGoToDashboard(navigate)} />
      <Features />
      <FAQs />
      <Footer />
    </div>
  );
};

export default LandingPages;
