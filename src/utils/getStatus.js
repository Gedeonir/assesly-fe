
  export const getAssessmentStatus = (startDateTime, endDateTime) => {
    const now = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (now < start) return "Upcoming";
    if (now > end) return "Ended";
    return "Active";
  };