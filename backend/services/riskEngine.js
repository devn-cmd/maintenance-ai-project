/* =========================================================
   RISK ENGINE — ADVANCED RELIABILITY VERSION
   ========================================================= */

function calculateRisk(equipment, failures, pmRecords) {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const failureCount = failures.length;

  /* =====================================================
     1️⃣ SORT FAILURES BY DATE
     ===================================================== */

  const sortedFailures = failures
    .filter(f => f.failure_date)
    .map(f => new Date(f.failure_date))
    .sort((a, b) => a - b);

  /* =====================================================
     2️⃣ TIME-WEIGHTED RECENCY
     ===================================================== */

  let failuresLast12Months = 0;
  let failuresLast90Days = 0;

  sortedFailures.forEach(date => {
    const diffDays = (currentDate - date) / (1000 * 60 * 60 * 24);
    if (diffDays <= 365) failuresLast12Months++;
    if (diffDays <= 90) failuresLast90Days++;
  });

  let recencyBoost = 0;
  if (failuresLast12Months >= 3) recencyBoost += 2;
  if (failuresLast90Days >= 2) recencyBoost += 3;

  /* =====================================================
     3️⃣ FAILURE CLUSTER DETECTION (NEW)
     ===================================================== */

  let clusterPenalty = 0;

  for (let i = 0; i < sortedFailures.length; i++) {
    let clusterCount = 1;

    for (let j = i + 1; j < sortedFailures.length; j++) {
      const diffDays =
        (sortedFailures[j] - sortedFailures[i]) /
        (1000 * 60 * 60 * 24);

      if (diffDays <= 60) {
        clusterCount++;
      } else {
        break;
      }
    }

    if (clusterCount >= 3) {
      clusterPenalty = 5;
      break;
    }
  }

  /* =====================================================
     4️⃣ BASE FREQUENCY SCORE
     ===================================================== */

  let frequencyScore = 0;
  if (failureCount === 0) frequencyScore = 0;
  else if (failureCount <= 2) frequencyScore = 2;
  else if (failureCount <= 5) frequencyScore = 5;
  else frequencyScore = 8;

  /* =====================================================
     5️⃣ CRITICALITY WEIGHT
     ===================================================== */

  let criticalityWeight = 0;
  if (equipment.criticality === "A") criticalityWeight = 5;
  if (equipment.criticality === "B") criticalityWeight = 3;
  if (equipment.criticality === "C") criticalityWeight = 1;

  /* =====================================================
     6️⃣ AGE FACTOR
     ===================================================== */

  const age = currentYear - parseInt(equipment.install_year);
  let ageFactor = 0;
  if (age > 15) ageFactor = 3;
  else if (age > 10) ageFactor = 2;

  /* =====================================================
     7️⃣ PM PENALTY
     ===================================================== */

  let pmPenalty = 0;
  const hasOverdue = pmRecords.some(pm => pm.status === "Overdue");
  const hasDueSoon = pmRecords.some(pm => pm.status === "Due Soon");

  if (hasOverdue) pmPenalty = 5;
  else if (hasDueSoon) pmPenalty = 2;

  /* =====================================================
     8️⃣ FINAL RISK CALCULATION
     ===================================================== */

  const baseRisk =
    (frequencyScore * criticalityWeight) +
    ageFactor +
    recencyBoost +
    clusterPenalty;

  const riskScore = baseRisk + pmPenalty;

  const simulatedRiskAfterPM = baseRisk;
  const riskReduction = riskScore - simulatedRiskAfterPM;

  let suggestedPriority = "P3";
  if (riskScore >= 35) suggestedPriority = "P1";
  else if (riskScore >= 15) suggestedPriority = "P2";

  return {
    riskScore,
    simulatedRiskAfterPM,
    riskReduction,
    suggestedPriority,
    failureCount,
    pmPenalty,
    failuresLast12Months,
    failuresLast90Days,
    recencyBoost,
    clusterPenalty
  };
}

module.exports = { calculateRisk };