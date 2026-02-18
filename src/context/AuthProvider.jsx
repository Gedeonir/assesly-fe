import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  ); // { role: "teacher" | "student", name: "" }

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res?.data?.token);

      // Fetch user profile
      const profileRes = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res?.data?.token}`,
        },
      });

      // Save full user info
      setUser(profileRes.data);
      localStorage.setItem("user", JSON.stringify(profileRes.data));

      return profileRes.data; // Return user data for further use (e.g., redirecting based on role)
    } catch (error) {
      return { error: error.response};
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
