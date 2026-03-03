import { useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../utils/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  ); // { role: "teacher" | "student", name: "" }

  const login = async (email, password) => {
    try {
      const res = await api.post(`/auth/login`, {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res?.data?.token);

      // Fetch user profile
      const profileRes = await api.get(`/auth/profile`);

      // Save full user info
      setUser(profileRes.data);
      localStorage.setItem("user", JSON.stringify(profileRes.data));

      return profileRes.data; // Return user data for further use (e.g., redirecting based on role)
    } catch (error) {
      return { error: error.response };
    }
  };

  const logout=()=>{
    setUser(null);
    localStorage.removeItem("token");
  }
  

  const getClasses = async () => {
    try {

      const res = await api.get(`/classes`);
      return res.data;
    } catch (error) {
      return { error: error.response };
    }
  };

  const createClass = async (className) => {
    try {

      const res = await api.post(
        `/classes`,
        {
          name: className,
        },
      );
      return res.data;
    } catch (error) {
      return { error: error.response };
    }
  };

  const deleteClass = async (classId) => {
    try {

      const res = await api.delete(`/classes/${classId}`);
      return res.data;
    } catch (error) {
      console.log(error);

      return { error: error.response };
    }
  };

  //Assesment related functions can be added here (e.g., createAssessment, getAssessments, etc.)

  const createAssessment = async (assessmentData) => {
    try {

      const res = await api.post(`/assessments`, assessmentData);
      return res.data;
    } catch (error) {
      return { error: error.response };
    }
  };

  const getAllAssessments = async () => {
    try {

      const res = await api.get(`/assessments`);
      return res.data;
    } catch (error) {
      return { error: error.response };
    }
  };

  const deleteAssessment = async (assessmentId) => {
    try {

      const res = await api.delete(`/assessments/${assessmentId}`);
      return res.data;
    } catch (error) {
      return { error: error.response };
    }
  };

  const getOneAssessment = async (assessmentId) => {
    try {
      const res = await api.get(`/assessments/${assessmentId}`);
      return res.data;
    } catch (error) {
      return { error: error.response };
    }
  };


  const getStudents=async ()=>{
    try {
      const res=await api.get('/teachers/students');
      return res.data;
    } catch (error) {
      return {error:error.response};
    }
  }

  const assignStudentToClass=async(studentId,classId)=>{
    try {
      const res=await api.patch(`/teachers/students/${studentId}`,{className:classId});
      return res.data
    } catch (error) {
      return {error:error.response};
    }
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        getClasses,
        createClass,
        deleteClass,
        createAssessment,
        getAllAssessments,
        deleteAssessment,
        getOneAssessment,
        getStudents,
        assignStudentToClass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
