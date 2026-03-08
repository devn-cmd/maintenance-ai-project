/* =========================================================
   MAINTENANCE ROUTES
   ---------------------------------------------------------
   This file defines API endpoints related to maintenance.
   It connects:
     - Data layer (CSV loader)
     - Business logic layer (Risk engine)
     - AI layer (LLM explanation)
   ========================================================= */

const express = require("express");
const router = express.Router();

/* ---------------------------------------------------------
   Import services from service layer
   --------------------------------------------------------- */

// Responsible for reading CSV files
const { loadCSV } = require("../services/dataLoader");

// Responsible for engineering risk calculation logic
const { calculateRisk } = require("../services/riskEngine");

// Responsible for generating AI explanation using Qwen
const { generateExplanation } = require("../services/aiService");
/* =========================================================
   GET /api/equipment
   ---------------------------------------------------------
   Returns equipment master data
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
   Calculates risk for a single equipment
   and generates AI explanation
   ========================================================= */
router.get("/priority/:equipmentId", async (req, res) => {

  try {
    const equipmentId = req.params.equipmentId;

    const equipmentData = await loadCSV("data/equipment_data.csv");
    const maintenanceData = await loadCSV("data/maintenance_history.csv");
    const pmData = await loadCSV("data/preventive_maintenance.csv");

    const equipment = equipmentData.find(
      item => item.equipment_id === equipmentId
    );

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    const failures = maintenanceData.filter(
      item => item.equipment_id === equipmentId
    );

    const pmRecords = pmData.filter(
      item => item.equipment_id === equipmentId
    );

    const riskResult = calculateRisk(equipment, failures, pmRecords);

    const explanation = await generateExplanation({
      equipmentId,
      failureCount: riskResult.failureCount,
      criticality: equipment.criticality,
      riskScore: riskResult.riskScore,
      suggestedPriority: riskResult.suggestedPriority
    });

    res.json({
    equipment_id: equipmentId,
    failure_count: riskResult.failureCount,
    criticality: equipment.criticality,
    pm_penalty: riskResult.pmPenalty,
    risk_score: riskResult.riskScore,
    simulated_risk_after_pm: riskResult.simulatedRiskAfterPM,
    risk_reduction_if_pm_done: riskResult.riskReduction,
    suggested_priority: riskResult.suggestedPriority,
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
   Purpose:
   Calculate risk for ALL equipment
   Return sorted list (highest risk first)
   ========================================================= */
router.get("/backlog-risk", async (req, res) => {

  try {

    // Load datasets
    const equipmentData = await loadCSV("data/equipment_data.csv");
    const maintenanceData = await loadCSV("data/maintenance_history.csv");
    const pmData = await loadCSV("data/preventive_maintenance.csv");

    // Calculate risk for every equipment
    const results = equipmentData.map(equipment => {

      const failures = maintenanceData.filter(
        item => item.equipment_id === equipment.equipment_id
      );

      const pmRecords = pmData.filter(
        item => item.equipment_id === equipment.equipment_id
      );

      const riskResult = calculateRisk(equipment, failures, pmRecords);

      return {
        equipment_id: equipment.equipment_id,
        criticality: equipment.criticality,
        failure_count: riskResult.failureCount,
        risk_score: riskResult.riskScore,
        priority: riskResult.suggestedPriority
      };
    });

    // Sort highest risk first
    results.sort((a, b) => b.risk_score - a.risk_score);

    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* Export router so server.js can use it */
module.exports = router;