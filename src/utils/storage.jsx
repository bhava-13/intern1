
import { useState, useEffect } from "react";


export const saveUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user ?? null));
  } catch (err) {
    console.error("saveUser error:", err);
  }
};

export const loadUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("loadUser error:", err);
    return null;
  }
};

export const clearUser = () => {
  try {
    localStorage.removeItem("user");
  } catch (err) {
    console.error("clearUser error:", err);
  }
};

export const saveAppointments = (appointments) => {
  try {
    localStorage.setItem("appointments", JSON.stringify(appointments ?? []));
  } catch (err) {
    console.error("saveAppointments error:", err);
  }
};

export const loadAppointments = () => {
  try {
    const raw = localStorage.getItem("appointments");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("loadAppointments error:", err);
    return [];
  }
};

export const clearAppointments = () => {
  try {
    localStorage.removeItem("appointments");
  } catch (err) {
    console.error("clearAppointments error:", err);
  }
};


export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("useLocalStorage setItem error:", err);
    }
  }, [key, state]);

  return [state, setState];
}
