import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import CreateAssessmentModal from "../../components/CreateAssessmentModal";

const CreateAssessment = () => {
  const handleCreateAssessment = () => {
    // Logic to open modal or navigate to create assessment page
    console.log("Assessment is created");
    
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
