import { createContext } from "react";

type LoginContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const LoginContext = createContext<LoginContextType | null>(null);
