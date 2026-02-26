import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import CreateAssessmentModal from "../../components/CreateAssessmentModal";
import { useAuth } from "../../context/UseAuth";

const CreateAssessment = () => {
  const { createAssessment } = useAuth();
  const handleCreateAssessment = async (assessmentData) => {
    try {
      const result = await createAssessment(assessmentData);
      console.log("Assessment created:", result);
    } catch (error) {
      console.error("Error creating assessment:", error);
    }
  };
  return (
    <DashboardLayout>
      <CreateAssessmentModal
        onSave={handleCreateAssessment}
      />
    </DashboardLayout>
  );
};

export default CreateAssessment;
