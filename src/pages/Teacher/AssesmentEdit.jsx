import React from "react";
import DashboardLayout from "./DashboardLayout";
import CreateAssessmentModal from "../../components/CreateAssessmentModal";
import { useAuth } from "../../context/UseAuth";

const AssesmentEdit = () => {
  const handleUpdateAssessment = async (assessmentData) => {
    try {
      // Logic to update the assessment using the API
      console.log("Updated assessment data:", assessmentData);
    } catch (error) {
      console.error("Error updating assessment:", error);
    }
  };
  return (
    <DashboardLayout>
      <CreateAssessmentModal onSave={handleUpdateAssessment} action="edit" />
    </DashboardLayout>
  );
};

export default AssesmentEdit;
