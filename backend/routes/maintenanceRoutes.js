/* =========================================================
   MAINTENANCE ROUTES (POSTGRESQL DATA MODE - OPTIMIZED)
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

const pool = require("../services/db");

const { calculateRisk } = require("../services/riskEngine");

const { calculateExecutionReadiness } = require("../services/executionEngine");

const { generateExplanation } = require("../services/aiService");

const { askRAG } = require("../rag/ragservice.js");


/* =========================================================
   GET /api/equipment
   ========================================================= */
router.get("/equipment", async (req, res) => {

  try {

    const result = await pool.query("SELECT * FROM equipment");

    res.json(result.rows);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Failed to load equipment data" });

  }

});


/* =========================================================
   GET /api/priority/:equipmentId
   ========================================================= */
router.get("/priority/:equipmentId", async (req, res) => {

  try {

    const equipmentId = req.params.equipmentId;

    /* ================= LOAD EQUIPMENT ================= */

    const equipmentResult = await pool.query(
      "SELECT * FROM equipment WHERE equipment_id = $1",
      [equipmentId]
    );

    const equipment = equipmentResult.rows[0];

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }


    /* ================= LOAD FAILURE HISTORY ================= */

    const maintenanceResult = await pool.query(
      "SELECT * FROM maintenance_history WHERE equipment_id = $1",
      [equipmentId]
    );

    const failures = maintenanceResult.rows;


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


    /* ================= LOAD PM DATA ================= */

    const pmResult = await pool.query(
      "SELECT * FROM preventive_maintenance WHERE equipment_id = $1",
      [equipmentId]
    );

    const pmRecords = pmResult.rows;


    let pmStatus = "OK";

    const hasOverdue = pmRecords.some(pm => pm.status === "Overdue");
    const hasDueSoon = pmRecords.some(pm => pm.status === "Due Soon");

    if (hasOverdue) pmStatus = "Overdue";
    else if (hasDueSoon) pmStatus = "Due Soon";


    /* ================= CALCULATE RISK ================= */

    const riskResult = calculateRisk(
      equipment,
      failures,
      pmRecords
    );


    /* ================= LOAD EXECUTION DATA ================= */

    const spareResult = await pool.query(
      "SELECT * FROM spare_parts WHERE equipment_id = $1",
      [equipmentId]
    );

    const crewResult = await pool.query(
      "SELECT * FROM crew_availability WHERE equipment_id = $1",
      [equipmentId]
    );

    const techResult = await pool.query(
      "SELECT * FROM technician_tools WHERE equipment_id = $1",
      [equipmentId]
    );

    const spare = spareResult.rows[0];
    const crew = crewResult.rows[0];
    const tech = techResult.rows[0];

    if (!spare || !crew || !tech) {
      return res.status(404).json({ error: "Execution data incomplete" });
    }


    /* ================= EXECUTION READINESS ================= */

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


    /* ================= RESPONSE ================= */

    res.json({

      equipment_id: equipmentId,

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

      risk_components: {

        frequency_score: riskResult.frequencyScore,
        criticality_weight: riskResult.criticalityWeight,
        age_factor: riskResult.ageFactor,
        recency_boost: riskResult.recencyBoost,
        cluster_penalty: riskResult.clusterPenalty,
        pm_penalty: riskResult.pmPenalty,
        degradation_penalty: riskResult.degradationPenalty

      },

      execution_status: executionResult.executionStatus,
      execution_note: executionResult.executionRiskNote,
      planning_recommendation: executionResult.planningRecommendation,

      explanation

    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Internal server error" });

  }

});


/* =========================================================
   GET /api/backlog-risk
   ========================================================= */

router.get("/backlog-risk", async (req, res) => {

  try {

    const equipmentResult = await pool.query("SELECT * FROM equipment");

    const equipmentData = equipmentResult.rows;

    const results = [];

    for (const equipment of equipmentData) {

      const equipmentId = equipment.equipment_id;

      const maintenanceResult = await pool.query(
        "SELECT * FROM maintenance_history WHERE equipment_id = $1",
        [equipmentId]
      );

      const pmResult = await pool.query(
        "SELECT * FROM preventive_maintenance WHERE equipment_id = $1",
        [equipmentId]
      );

      const spareResult = await pool.query(
        "SELECT * FROM spare_parts WHERE equipment_id = $1",
        [equipmentId]
      );

      const crewResult = await pool.query(
        "SELECT * FROM crew_availability WHERE equipment_id = $1",
        [equipmentId]
      );

      const techResult = await pool.query(
        "SELECT * FROM technician_tools WHERE equipment_id = $1",
        [equipmentId]
      );

      const failures = maintenanceResult.rows;
      const pmRecords = pmResult.rows;

      const spare = spareResult.rows[0];
      const crew = crewResult.rows[0];
      const tech = techResult.rows[0];

      const riskResult = calculateRisk(
        equipment,
        failures,
        pmRecords
      );
      if (!spare || !crew || !tech) continue; // skip incomplete equipment
      const execution = calculateExecutionReadiness({
        ...spare,
        ...crew,
        ...tech
      });

      results.push({

        equipment_id: equipmentId,
        criticality: equipment.criticality,
        failure_count: riskResult.failureCount,
        risk_score: riskResult.riskScore,
        priority: riskResult.suggestedPriority,
        execution_status: execution.executionStatus

      });

    }

    results.sort((a, b) => b.risk_score - a.risk_score);

    res.json(results);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Internal server error" });

  }


});

/* =========================================================
   GET /api/fleet-analytics
   ---------------------------------------------------------
   Provides fleet-level maintenance insights
   ========================================================= */

router.get("/fleet-analytics", async (req, res) => {

  try {

    /* ---------- Top Failure Modes ---------- */

    const failureModes = await pool.query(`
      SELECT failure_mode, COUNT(*) AS count
      FROM maintenance_history
      GROUP BY failure_mode
      ORDER BY count DESC
      LIMIT 5
    `);

    /* ---------- Maintenance Type Distribution ---------- */

    const maintenanceTypes = await pool.query(`
      SELECT maintenance_type, COUNT(*) AS count
      FROM maintenance_history
      GROUP BY maintenance_type
    `);

    /* ---------- Total Failures ---------- */

    const totalFailures = await pool.query(`
      SELECT COUNT(*) AS total_failures
      FROM maintenance_history
    `);

    res.json({

      top_failure_modes: failureModes.rows,

      maintenance_distribution: maintenanceTypes.rows,

      total_failures: totalFailures.rows[0].total_failures

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Fleet analytics error"
    });

  }

});
/* =========================================================
   POST /api/ask-ai
   ---------------------------------------------------------
   Endpoint for RAG-based AI question answering
   ========================================================= */
  router.post("/ask-ai", async (req, res) => {
  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }


    const answer = await askRAG(question);

    res.json({ answer });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "AI assistant failed" });

  }
});
module.exports = router;
