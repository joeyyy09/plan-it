"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { AuthContextType, AuthToken } from "@/models"; // Adjust the import to your types

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthToken>({
    token: "",
    user: {
      id: "",
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const data = { ...user };
    setAuthState({ token: token || "", user: data });
  }, []);

  const setAuthStateHandler = (token: AuthToken) => {
    const userData: AuthToken = {
      token: token.token || authState.token,
      user: token.user || authState.user,
    };

    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));

    setAuthState(userData);
  };

  const isAuthenticated = () => {
    return !!authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: setAuthStateHandler,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuth };
