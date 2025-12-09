import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    setInitialLoading(false);
  }, []);

  // LOGIN USER
  const loginUser = async (email, password) => {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    const loggedInUser = res.data.user;

 
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);
    setIsAuthenticated(true);

    return loggedInUser; 
  };

  // REGISTER USER
  const registerUser = async (name, email, password) => {
    return await api.post("/api/auth/register", {
      name,
      email,
      password,
    });
  };

  // LOGOUT USER
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    registerUser,
  };

  if (initialLoading) return <p>Loading</p>;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
