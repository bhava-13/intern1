import React from "react";
import { createContext, useState, useEffect } from "react";
import { loadUser, saveUser, clearUser } from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // stores logged-in user
  const [loading, setLoading] = useState(true); // true while checking localStorage

  // Load user from localStorage on app start
  useEffect(() => {
    const existingUser = loadUser();
    if (existingUser) {
      setUser(existingUser);
    }
    setLoading(false);
  }, []);

  // --- LOGIN ---
  const loginUser = (email, password) => {
    // MOCK AUTH since no backend
    const loggedUser = {
      name: "User",
      email,
    };

    // save to storage
    saveUser(loggedUser);
    setUser(loggedUser);
  };

  // --- LOGOUT ---
  const logoutUser = () => {
    clearUser();
    setUser(null);
  };

  // computed value
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
