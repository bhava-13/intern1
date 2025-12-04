import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

    setInitialLoading(false);
  }, []);


  const loginUser = async (email, password) => {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    console.log("Login response:", res.data);


    const token = res.data.token;
    const loggedInUser = res.data.user;

    if (!token) throw new Error("Token missing from server response");

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const registerUser = async (name, email, password) => {
  return await api.post("/api/auth/register", {
    name,
    email,
    password,
  });
};


  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    setUser,
  };

  if (initialLoading) return <p>Loading...</p>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

