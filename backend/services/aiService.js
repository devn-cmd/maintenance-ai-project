/* =========================================================
   AI SERVICE
   ---------------------------------------------------------
   Purpose:
   - Communicate with local Qwen model (via Ollama)
   - Convert structured engineering data into explanation
   - Explain BOTH technical risk and execution readiness
   - Maintain strict deterministic alignment

   IMPORTANT:
   - This service NEVER calculates risk.
   - It only explains already-calculated values.
   - It must not invent numbers.
   ========================================================= */

const axios = require("axios");

/* =========================================================
   generateExplanation(data)

   Expected Input:
   {
     equipmentId,
     failureCount,
     criticality,
     riskScore,
     suggestedPriority,
     executionStatus,
     executionNote
   }

   Output:
   Professional explanation string
   ========================================================= */

async function generateExplanation(data) {

  /* =====================================================
     STEP 1: Build Deterministic Structured Prompt
     -----------------------------------------------------
     We pass only calculated values.
     No room for hallucination.
     ===================================================== */

  const structuredPrompt = `
You are a senior maintenance engineering decision-support assistant.

RISK THRESHOLDS:
- Risk >= 35 → High Risk (P1, immediate action required)
- Risk >= 15 and < 35 → Medium Risk (P2, planned intervention required)
- Risk < 15 → Low Risk (P3, monitoring sufficient)

EQUIPMENT DATA:
Equipment ID: ${data.equipmentId}
Failure Count: ${data.failureCount}
Failure Pattern: ${data.failureCount} failures recorded
PM Penalty: ${data.pmPenalty}
Execution Constraint: ${data.executionNote}


Criticality: ${data.criticality}
Risk Score: ${data.riskScore}
Suggested Priority: ${data.suggestedPriority}

EXECUTION READINESS:
Execution Status: ${data.executionStatus}
Execution Note: ${data.executionNote}

INSTRUCTIONS:
1. Align explanation strictly with defined risk thresholds.
2. Do NOT change priority.
3. If execution status is BLOCKED, clearly state that work cannot proceed until constraints are resolved.
4. If execution status is DELAYED, state that planning must account for constraints.
5. If execution status is READY, state that work can proceed as recommended.
6. Keep explanation professional and concise (4–6 sentences).
7. Avoid exaggeration and avoid inventing new data.

Generate explanation:
`;

  /* =====================================================
     STEP 2: Send Request to Ollama
     ===================================================== */

  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "qwen3.5:9b-q4_K_M",
      prompt: structuredPrompt,
      stream: false
    }
  );

  /* =====================================================
     STEP 3: Return Clean Explanation Text
     ===================================================== */

  return response.data.response.trim();
}

/* Export function */
module.exports = { generateExplanation };