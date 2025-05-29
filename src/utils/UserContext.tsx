import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
  userName: string;
  profilePicUrl: string;
  isLoggedIn: boolean;
  setUser: (name: string, picUrl: string, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [profilePicUrl, setProfilePicUrl] = useState(localStorage.getItem("profilePicUrl") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token")); // ✅ Check token existence

  useEffect(() => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("profilePicUrl", profilePicUrl);
  }, [userName, profilePicUrl]);

  const setUser = (name: string, picUrl: string, token: string) => {
    setUserName(name);
    setProfilePicUrl(picUrl);
    localStorage.setItem("access_token", token); // ✅ Store token
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserName("");
    setProfilePicUrl("");
    setIsLoggedIn(false);
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePicUrl");
    localStorage.removeItem("access_token");
  };

  return (
    <UserContext.Provider value={{ userName, profilePicUrl, isLoggedIn, setUser, logout }}>
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