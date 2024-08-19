import { useTheme } from "../hooks/useTheme.hooks";
import { useKeycloak } from "@react-keycloak/web";
import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LoadingInterfaceLanding } from "../components/LoadingInterface";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import FAQs from "../components/landing/FAQs";
import Footer from "../components/landing/Footer";

const LandingPages = () => {
  const { theme, setTheme } = useTheme();
  const { keycloak, initialized } = useKeycloak(); // initialized is provided by useKeycloak hook to check if Keycloak is ready
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized) {
      setIsLoading(false);
    }
  }, [initialized]);

  const handleLogin = () => {
    if (keycloak.authenticated) {
      keycloak.logout();
    } else {
      keycloak.login();
    }
  };

  const handleGoToDashboard = (navigate: NavigateFunction) => {
    if (keycloak.hasResourceRole("mahasiswa")) {
      navigate("/mahasiswa");
    } else if (keycloak.hasResourceRole("dosen-pa")) {
      navigate("/dosen-pa");
    }
  };

  // Render loading screen if still initializing
  if (isLoading) {
    return <LoadingInterfaceLanding />;
  }

  return (
    <div data-theme={theme}>
      <Navbar
        setTheme={setTheme}
        currentTheme={theme}
        isLogin={keycloak.authenticated!}
        onLoginClick={handleLogin}
        onGoToDashboardClick={() => handleGoToDashboard(navigate)}
      />
      <Hero
        isLogin={keycloak.authenticated!}
        onLoginClick={handleLogin}
        onGoToDashboardClick={() => handleGoToDashboard(navigate)}
      />
      <Features />
      <FAQs />
      <Footer />
    </div>
  );
};

export default LandingPages;
