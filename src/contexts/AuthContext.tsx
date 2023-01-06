import React from "react";

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
