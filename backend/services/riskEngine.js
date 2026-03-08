/* =========================================================
   RISK ENGINE
   ---------------------------------------------------------
   Purpose:
   Calculate engineering-based risk score and priority
   using structured rules (NOT AI).

   This function reflects a simplified version of:
     Risk = Probability × Consequence + Modifiers

   It does NOT:
     - Read files
     - Call AI
     - Handle HTTP
   It only calculates risk.
   ========================================================= */

function calculateRisk(equipment, failures, pmRecords) {

  const failureCount = failures.length;

  /* ---------- Frequency Score ---------- */
  let frequencyScore = 0;
  if (failureCount === 0) frequencyScore = 0;
  else if (failureCount <= 2) frequencyScore = 2;
  else if (failureCount <= 5) frequencyScore = 5;
  else frequencyScore = 8;

  /* ---------- Criticality Weight ---------- */
  let criticalityWeight = 0;
  if (equipment.criticality === "A") criticalityWeight = 5;
  if (equipment.criticality === "B") criticalityWeight = 3;
  if (equipment.criticality === "C") criticalityWeight = 1;

  /* ---------- Recurrence Bonus ---------- */
  let recurrenceBonus = 0;
  if (failureCount >= 5) recurrenceBonus = 3;
  else if (failureCount >= 3) recurrenceBonus = 2;

  /* ---------- Age Factor ---------- */
  const currentYear = new Date().getFullYear();
  const age = currentYear - parseInt(equipment.install_year);

  let ageFactor = 0;
  if (age > 15) ageFactor = 3;
  else if (age > 10) ageFactor = 2;

  /* ---------- PM Penalty ---------- */
  let pmPenalty = 0;
  const hasOverdue = pmRecords.some(pm => pm.status === "Overdue");
  const hasDueSoon = pmRecords.some(pm => pm.status === "Due Soon");

  if (hasOverdue) pmPenalty = 5;
  else if (hasDueSoon) pmPenalty = 2;

  /* ---------- BASE RISK (Without PM penalty) ---------- */
  const baseRisk =
    (frequencyScore * criticalityWeight)
    + recurrenceBonus
    + ageFactor;

  /* ---------- CURRENT RISK ---------- */
  const riskScore = baseRisk + pmPenalty;

  /* ---------- SIMULATED RISK (If PM Completed) ---------- */
  const simulatedRiskAfterPM = baseRisk;

  const riskReduction = riskScore - simulatedRiskAfterPM;

  /* ---------- PRIORITY ---------- */
  let suggestedPriority = "P3";
  if (riskScore >= 35) suggestedPriority = "P1";
  else if (riskScore >= 15) suggestedPriority = "P2";

  return {
    riskScore,
    simulatedRiskAfterPM,
    riskReduction,
    suggestedPriority,
    failureCount,
    pmPenalty
  };
}

module.exports = { calculateRisk };