import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import api from "./api";

interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  role: string;
  picture: string;
  level: string;
  totalLessonsCompleted: number;
  hasCreatedPlacement: boolean;
  hasSubmittedPlacement: boolean;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Load user from localStorage during initialization
  const [user, setUserState] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    // Keep user state synced with localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const setUser = (userData: User, token: string) => {
    setUserState(userData);
    localStorage.setItem("access_token", token);
    localStorage.setItem("userId", userData.id.toString());
    localStorage.setItem("username", userData.username);
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("fullname", userData.fullname);
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("picture", userData.picture);
    localStorage.setItem("level", userData.level);
    localStorage.setItem(
      "totalLessonsCompleted",
      userData.totalLessonsCompleted.toString()
    );
    localStorage.setItem(
      "hasCreatedPlacement",
      userData.hasCreatedPlacement.toString()
    );
    localStorage.setItem(
      "hasSubmittedPlacement",
      userData.hasSubmittedPlacement.toString()
    );
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
    localStorage.removeItem("level");
    localStorage.removeItem("totalLessonsCompleted");
    localStorage.removeItem("hasCreatedPlacement");
    localStorage.removeItem("hasSubmittedPlacement");
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const response = await api.get<User>("/learner-profiles/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = response.data;
      localStorage.setItem(
        "totalLessonsCompleted",
        updatedUser.totalLessonsCompleted.toString()
      );
      localStorage.setItem(
        "hasCreatedPlacement",
        updatedUser.hasCreatedPlacement.toString()
      );
      localStorage.setItem(
        "hasSubmittedPlacement",
        updatedUser.hasSubmittedPlacement.toString()
      );
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, setUser, logout, refreshUser }}
    >
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
