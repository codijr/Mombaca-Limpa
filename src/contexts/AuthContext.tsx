import React, { useEffect } from "react";
import { getStorage } from "../utils";
import { reauthenticateWithCredential } from "../services";

export type User = {
  userId: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: string;
};

type AuthContextData = {
  user: User | null | void;
  setUser: (user: User | null | void | undefined) => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = React.useState<User | null | void>(null);

  useEffect(() => {
    async function persistLogin() {
      await getStorage("@user").then((response) => {
        if (response) {
          reauthenticateWithCredential(response.password).then(() => {
            setUser(response);
          });
        }
        response ? setUser(response) : setUser(null);
      });
    }

    persistLogin();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  return context;
}
