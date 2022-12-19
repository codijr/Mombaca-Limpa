import React from "react";

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
