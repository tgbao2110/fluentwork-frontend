import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userName: string;
  profilePicUrl: string;
  setUser: (name: string, picUrl: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const setUser = (name: string, picUrl: string) => {
    setUserName(name);
    setProfilePicUrl(picUrl);
  };

  return (
    <UserContext.Provider value={{ userName, profilePicUrl, setUser }}>
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