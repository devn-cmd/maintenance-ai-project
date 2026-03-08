/* =========================================================
   EXECUTION ENGINE
   ========================================================= */

function calculateExecutionReadiness(data) {

  let executionStatus = "READY";
  let notes = [];

  const spareStatus = data.spare_status;
  const leadTime = parseInt(data.lead_time_weeks);
  const crewAvailable = data.crew_available === "true";
  const daysUntilRotation = parseInt(data.days_until_next_rotation);
  const technicianAvailable = data.technician_available === "true";
  const toolsAvailable = data.tools_available === "true";

  // Spare logic
  if (spareStatus === "Not Available" && leadTime > 8) {
    executionStatus = "BLOCKED";
    notes.push("Spare part not available with long lead time.");
  } else if (spareStatus === "Low Stock") {
    if (executionStatus !== "BLOCKED") executionStatus = "DELAYED";
    notes.push("Spare part low in stock.");
  }

  // Crew logic
  if (!crewAvailable && daysUntilRotation > 7) {
    if (executionStatus !== "BLOCKED") executionStatus = "DELAYED";
    notes.push("Crew currently off rotation.");
  }

  // Technician & tools logic
  if (!technicianAvailable || !toolsAvailable) {
    executionStatus = "BLOCKED";
    notes.push("Technician or required tools unavailable.");
  }

  return {
    executionStatus,
    executionRiskNote: notes.join(" "),
    planningRecommendation:
      executionStatus === "READY"
        ? "Work order can proceed as planned."
        : executionStatus === "DELAYED"
        ? "Plan scheduling considering constraints."
        : "Resolve execution blockers before scheduling."
  };
}

module.exports = { calculateExecutionReadiness };