/* =========================================================
   MAINTENANCE ROUTES (CSV DEMO MODE)
   ---------------------------------------------------------
   Responsibilities:
   - Load CSV datasets
   - Call deterministic risk engine
   - Call execution readiness engine
   - Call AI explanation service
   - Return structured decision package

   No PostgreSQL.
   Fully CSV-based.
   Interview-safe version.
   ========================================================= */

const express = require("express");
const router = express.Router();

/* ===================== SERVICE IMPORTS ===================== */

// CSV Loader
const { loadCSV } = require("../services/dataLoader");

// Deterministic technical risk engine
const { calculateRisk } = require("../services/riskEngine");

// Execution feasibility engine
const { calculateExecutionReadiness } = require("../services/executionEngine");

// AI explanation generator
const { generateExplanation } = require("../services/aiService");


/* =========================================================
   GET /api/equipment
   ---------------------------------------------------------
   Returns equipment master data from CSV
   ========================================================= */
router.get("/equipment", async (req, res) => {
  try {
    const equipmentData = await loadCSV("data/equipment_data.csv");
    res.json(equipmentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load equipment data" });
  }
});


/* =========================================================
   GET /api/priority/:equipmentId
   ---------------------------------------------------------
   Calculates:
   - Technical Risk
   - Execution Readiness
   - AI Explanation
   ========================================================= */
router.get("/priority/:equipmentId", async (req, res) => {

  try {

    const equipmentId = req.params.equipmentId;

    /* ================= LOAD ALL DATASETS ================= */

    const equipmentData = await loadCSV("data/equipment_data.csv");
    const maintenanceData = await loadCSV("data/maintenance_history.csv");
    const pmData = await loadCSV("data/preventive_maintenance.csv");
    const spareData = await loadCSV("data/spare_parts.csv");
    const crewData = await loadCSV("data/crew_availability.csv");
    const techData = await loadCSV("data/technician_tools.csv");

    /* ================= FIND EQUIPMENT ================= */

    const equipment = equipmentData.find(
      item => item.equipment_id === equipmentId
    );

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    /* ================= FILTER HISTORY ================= */

    const failures = maintenanceData.filter(
      item => item.equipment_id === equipmentId
    );

    const failureModeCount = {};

    failures.forEach(f => {
      const mode = f.failure_mode;

      if (!failureModeCount[mode]) {
        failureModeCount[mode] = 0;
      }

      failureModeCount[mode]++;
    });

    let mostCommonFailureMode = "None";
    let mostCommonCount = 0;

    for (const mode in failureModeCount) {
      if (failureModeCount[mode] > mostCommonCount) {
        mostCommonCount = failureModeCount[mode];
        mostCommonFailureMode = mode;
      }
    }

    const pmRecords = pmData.filter(
      item => item.equipment_id === equipmentId
    );
    /* ================= PM STATUS ================= */

      let pmStatus = "OK";

      const hasOverdue = pmRecords.some(pm => pm.status === "Overdue");
      const hasDueSoon = pmRecords.some(pm => pm.status === "Due Soon");

      if (hasOverdue) {
        pmStatus = "Overdue";
      }
      else if (hasDueSoon) {
        pmStatus = "Due Soon";
      }

    /* ================= CALCULATE TECHNICAL RISK ================= */

    const riskResult = calculateRisk(
      equipment,
      failures,
      pmRecords
    );

    /* ================= FIND EXECUTION DATA ================= */

    const spare = spareData.find(
      item => item.equipment_id === equipmentId
    );

    const crew = crewData.find(
      item => item.equipment_id === equipmentId
    );

    const tech = techData.find(
      item => item.equipment_id === equipmentId
    );

    if (!spare || !crew || !tech) {
      return res.status(404).json({ error: "Execution data incomplete" });
    }

    /* ================= CALCULATE EXECUTION READINESS ================= */

    const executionResult = calculateExecutionReadiness({
      ...spare,
      ...crew,
      ...tech
    });

    /* ================= GENERATE AI EXPLANATION ================= */

    const explanation = await generateExplanation({
      equipmentId,
      failureCount: riskResult.failureCount,
      criticality: equipment.criticality,
      riskScore: riskResult.riskScore,
      suggestedPriority: riskResult.suggestedPriority,
      executionStatus: executionResult.executionStatus,
      executionNote: executionResult.executionRiskNote
    });

    /* ================= RETURN FINAL DECISION PACKAGE ================= */

    res.json({

      equipment_id: equipmentId,

      /* ----- Technical Risk ----- */
      failures_last_12_months: riskResult.failuresLast12Months,
      failures_last_90_days: riskResult.failuresLast90Days,
      failure_count: riskResult.failureCount,
      criticality: equipment.criticality,
      most_common_failure_mode: mostCommonFailureMode,
      failure_mode_occurrences: mostCommonCount,
      risk_score: riskResult.riskScore,
      simulated_risk_after_pm: riskResult.simulatedRiskAfterPM,
      risk_reduction_if_pm_done: riskResult.riskReduction,
      suggested_priority: riskResult.suggestedPriority,
      pm_status: pmStatus,
      /* Risk Components for Explainability */
      risk_components: {
        frequency_score: riskResult.frequencyScore,
        criticality_weight: riskResult.criticalityWeight,
        age_factor: riskResult.ageFactor,
        recency_boost: riskResult.recencyBoost,
        cluster_penalty: riskResult.clusterPenalty,
        pm_penalty: riskResult.pmPenalty,
        degradation_penalty: riskResult.degradationPenalty
      },

      /* ----- Execution Feasibility ----- */
      execution_status: executionResult.executionStatus,
      execution_note: executionResult.executionRiskNote,
      planning_recommendation: executionResult.planningRecommendation,

      /* ----- AI Explanation ----- */
      explanation

    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


/* =========================================================
   GET /api/backlog-risk
   ---------------------------------------------------------
   Calculates technical risk for ALL equipment
   Returns sorted list (highest risk first)
   ========================================================= */
router.get("/backlog-risk", async (req, res) => {

  try {

    const equipmentData = await loadCSV("data/equipment_data.csv");
    const maintenanceData = await loadCSV("data/maintenance_history.csv");
    const pmData = await loadCSV("data/preventive_maintenance.csv");
    const spareData = await loadCSV("data/spare_parts.csv");
    const crewData = await loadCSV("data/crew_availability.csv");
    const techData = await loadCSV("data/technician_tools.csv");

    const results = equipmentData.map(equipment => {

      const failures = maintenanceData.filter(
        item => item.equipment_id === equipment.equipment_id
      );

      const pmRecords = pmData.filter(
        item => item.equipment_id === equipment.equipment_id
      );

      const riskResult = calculateRisk(
        equipment,
        failures,
        pmRecords

      
      );
      const spare = spareData.find(item => item.equipment_id === equipment.equipment_id);
      const crew = crewData.find(item => item.equipment_id === equipment.equipment_id);
      const tech = techData.find(item => item.equipment_id === equipment.equipment_id);

      const execution = calculateExecutionReadiness({
        ...spare,
        ...crew,
        ...tech
      });

      return {
        equipment_id: equipment.equipment_id,
        criticality: equipment.criticality,
        failure_count: riskResult.failureCount,
        risk_score: riskResult.riskScore,
        priority: riskResult.suggestedPriority,
        execution_status: execution.executionStatus

      };

    });

    results.sort((a, b) => b.risk_score - a.risk_score);

    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;