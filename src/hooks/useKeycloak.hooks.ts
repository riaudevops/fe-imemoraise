import Keycloak from "keycloak-js";
import { useState, useEffect } from "react";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

export const useKeycloak = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    keycloak.init({ onLoad: "check-sso" }).then((auth) => {
      setIsLogin(auth);
      setToken(keycloak.token!);
    });
  }, []);

  return { keycloak, isLogin, token };
};
