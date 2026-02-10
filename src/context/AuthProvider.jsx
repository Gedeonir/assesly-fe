import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { role: "teacher" | "student", name: "" }

  const login = (role = "teacher") => {
    // temp login, later connect Firebase
    setUser({ role, name: role === "teacher" ? "Mr. Smith" : "Student One" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}