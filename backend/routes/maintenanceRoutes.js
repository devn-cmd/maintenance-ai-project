/* =========================================================
   MAINTENANCE ROUTES (POSTGRESQL DATA MODE)
   ---------------------------------------------------------
   Responsibilities:
   - Load maintenance datasets from PostgreSQL
   - Call deterministic risk engine
   - Call execution readiness engine
   - Call AI explanation service
   - Return structured decision package
   ========================================================= */

const express = require("express");
const router = express.Router();

/* ===================== SERVICE IMPORTS ===================== */

// PostgreSQL connection
const pool = require("../services/db");

// Deterministic technical risk engine
const { calculateRisk } = require("../services/riskEngine");

// Execution feasibility engine
const { calculateExecutionReadiness } = require("../services/executionEngine");

// AI explanation generator
const { generateExplanation } = require("../services/aiService");


/* =========================================================
   GET /api/equipment
   ---------------------------------------------------------
   Returns equipment master data from PostgreSQL
   ========================================================= */
router.get("/equipment", async (req, res) => {
  try {

    const result = await pool.query("SELECT * FROM equipment");
    const equipmentData = result.rows;

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

    /* ================= LOAD DATA FROM DATABASE ================= */

    const equipmentResult = await pool.query("SELECT * FROM equipment");
    const maintenanceResult = await pool.query("SELECT * FROM maintenance_history");
    const pmResult = await pool.query("SELECT * FROM preventive_maintenance");
    const spareResult = await pool.query("SELECT * FROM spare_parts");
    const crewResult = await pool.query("SELECT * FROM crew_availability");
    const techResult = await pool.query("SELECT * FROM technician_tools");

    const equipmentData = equipmentResult.rows;
    const maintenanceData = maintenanceResult.rows;
    const pmData = pmResult.rows;
    const spareData = spareResult.rows;
    const crewData = crewResult.rows;
    const techData = techResult.rows;

    /* ================= FIND EQUIPMENT ================= */

    const equipment = equipmentData.find(
      item => item.equipment_id === equipmentId
    );

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    /* ================= FILTER FAILURE HISTORY ================= */

    const failures = maintenanceData.filter(
      item => item.equipment_id === equipmentId
    );

    /* ================= FAILURE MODE ANALYSIS ================= */

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

    /* ================= PREVENTIVE MAINTENANCE ================= */

    const pmRecords = pmData.filter(
      item => item.equipment_id === equipmentId
    );

    let pmStatus = "OK";

    const hasOverdue = pmRecords.some(pm => pm.status === "Overdue");
    const hasDueSoon = pmRecords.some(pm => pm.status === "Due Soon");

    if (hasOverdue) pmStatus = "Overdue";
    else if (hasDueSoon) pmStatus = "Due Soon";

    /* ================= CALCULATE TECHNICAL RISK ================= */

    const riskResult = calculateRisk(
      equipment,
      failures,
      pmRecords
    );

    /* ================= EXECUTION READINESS ================= */

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

    const executionResult = calculateExecutionReadiness({
      ...spare,
      ...crew,
      ...tech
    });

    /* ================= AI EXPLANATION ================= */

    const explanation = await generateExplanation({
      equipmentId,
      failureCount: riskResult.failureCount,
      criticality: equipment.criticality,
      riskScore: riskResult.riskScore,
      suggestedPriority: riskResult.suggestedPriority,
      executionStatus: executionResult.executionStatus,
      executionNote: executionResult.executionRiskNote
    });

    /* ================= RESPONSE PACKAGE ================= */

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

      /* ----- Risk Components (Explainability) ----- */
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

    const equipmentResult = await pool.query("SELECT * FROM equipment");
    const maintenanceResult = await pool.query("SELECT * FROM maintenance_history");
    const pmResult = await pool.query("SELECT * FROM preventive_maintenance");
    const spareResult = await pool.query("SELECT * FROM spare_parts");
    const crewResult = await pool.query("SELECT * FROM crew_availability");
    const techResult = await pool.query("SELECT * FROM technician_tools");

    const equipmentData = equipmentResult.rows;
    const maintenanceData = maintenanceResult.rows;
    const pmData = pmResult.rows;
    const spareData = spareResult.rows;
    const crewData = crewResult.rows;
    const techData = techResult.rows;

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

      const spare = spareData.find(
        item => item.equipment_id === equipment.equipment_id
      );

      const crew = crewData.find(
        item => item.equipment_id === equipment.equipment_id
      );

      const tech = techData.find(
        item => item.equipment_id === equipment.equipment_id
      );

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