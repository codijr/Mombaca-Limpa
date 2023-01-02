import React, { useEffect } from "react";
import { getStorage } from "../utils";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string;
};

type AuthContextData = {
  isAuth: boolean;
  setIsAuth: (isSigned: boolean) => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = React.useState(false);

  // useEffect(() => {
  //   const value = getStorage("@user");
  //   if (value) {
  //     console.log(value);

  //     setIsAuth(true);
  //   }
  // }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  return context;
}
