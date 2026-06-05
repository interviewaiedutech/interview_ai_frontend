import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");

    return adminToken || userToken || null;
  });
  // Add streak to user state 13-05-2026
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });

  // Set up axios default headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Load user data on initial load
  useEffect(() => {
    // const loadUser = async () => {
    //   if (token) {
    //     try {
    //       const response = await axios.get(`${API_URL}/auth/me`);
    //       setUser(response.data);
    //     } catch (error) {
    //       console.error("Error loading user:", error);
    //       localStorage.removeItem("token");
    //       setToken(null);
    //       delete axios.defaults.headers.common["Authorization"];
    //     }
    //   }
    //   setLoading(false);
    // };
    // Update loadUser function
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/auth/me`);
        setUser(response.data);
        setStreak({
          currentStreak: response.data.streak?.currentStreak || 0,
          longestStreak: response.data.streak?.longestStreak || 0,
          lastActiveDate: response.data.streak?.lastActiveDate,
        });
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  // Register new user (Updated for simplified form)
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };
  // const register = async (userData) => {
  //   try {
  //     const response = await axios.post(`${API_URL}/auth/register`, userData);
  //     const { token: newToken, user: newUser } = response.data;

  //     // Store token in localStorage
  //     localStorage.setItem("token", newToken);
  //     setToken(newToken);
  //     setUser(newUser);

  //     return { success: true };
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     return {
  //       success: false,
  //       error:
  //         error.response?.data?.message ||
  //         "Registration failed. Please try again.",
  //     };
  //   }
  // };

  // Login existing user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { token: newToken, user: newUser } = response.data;
      if (newUser.accountType === "admin") {
        // Save admin session
        localStorage.setItem("adminToken", newToken);
        localStorage.setItem("admin", JSON.stringify(newUser));
      } else {
        // Remove admin session
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        // Save user session
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
      }

      setToken(newToken);
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Login failed. Please check your credentials.",
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");

    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  // Update user profile
  const updateUser = async (updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/auth/update`, updatedData);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Update failed",
      };
    }
  };

  const value = {
    user,
    streak,
    login,
    register,
    logout,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
