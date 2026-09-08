import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userName: string;
  userEmail: string;

  login: (email: string) => void;

  register: (
    name: string,
    email: string
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [userName, setUserName] =
    useState("");

  const [userEmail, setUserEmail] =
    useState("");

  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "isLoggedIn"
      ) === "true";

    const storedName =
      localStorage.getItem(
        "userName"
      ) || "";

    const storedEmail =
      localStorage.getItem(
        "userEmail"
      ) || "";

    setIsLoggedIn(loggedIn);
    setUserName(storedName);
    setUserEmail(storedEmail);

    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const register = (
    name: string,
    email: string
  ) => {
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userName",
      name
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    setIsLoggedIn(true);
    setUserName(name);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "userName"
    );

    localStorage.removeItem(
      "userEmail"
    );

    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        userName,
        userEmail,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}