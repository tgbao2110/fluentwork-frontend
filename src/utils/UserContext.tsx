import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  role: string;
  picture: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("access_token")
  );

  const setUser = (userData: User, token: string) => {
    setUserState(userData);
    localStorage.setItem("access_token", token);
    localStorage.setItem("userId", userData.id.toString());
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("fullname", userData.fullname);
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("picture", userData.picture);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserState(null);
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("fullname");
    localStorage.removeItem("userRole");
    localStorage.removeItem("picture");
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};