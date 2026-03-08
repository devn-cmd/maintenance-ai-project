/* =========================================================
   AI SERVICE
   ---------------------------------------------------------
   This file is responsible for:
   - Communicating with the local Qwen model (via Ollama)
   - Sending structured prompt data
   - Receiving AI-generated explanation
   - Returning clean explanation text to route layer

   IMPORTANT:
   This layer does NOT calculate risk.
   It only explains already-calculated decisions.
   ========================================================= */

const axios = require("axios");

/* =========================================================
   generateExplanation(data)

   Purpose:
   Convert structured maintenance data into a
   professional explanation using Qwen LLM.

   Input:
   {
     equipmentId,
     failureCount,
     criticality,
     riskScore,
     suggestedPriority
   }

   Output:
   AI-generated explanation string
   ========================================================= */
async function generateExplanation(data) {

    /* ---------------------------------------------------------
     STEP 1: Create structured prompt
     We pass deterministic risk values into the model.
     This ensures:
       - AI does not invent numbers
       - AI only explains what we calculated
       - Hybrid rule + AI architecture is preserved
     --------------------------------------------------------- */
  const structuredSummary = `
        You are a maintenance engineering decision-support assistant.

        Risk Threshold Definition:
        - Risk >= 35 → High Risk (P1, immediate action required)
        - Risk >= 15 and < 35 → Medium Risk (P2, planned intervention)
        - Risk < 15 → Low Risk (P3, monitoring sufficient)

        Equipment ID: ${data.equipmentId}
        Failure Count: ${data.failureCount}
        Criticality: ${data.criticality}
        Risk Score: ${data.riskScore}
        Suggested Priority: ${data.suggestedPriority}

        Instructions:
        - Align explanation strictly with the defined risk thresholds.
        - If risk is >= 35, describe as high risk and urgent.
        - If risk is 15–34, describe as moderate risk requiring planned action.
        - If risk < 15, describe as low risk requiring monitoring.
        - If criticality is C, describe as low consequence.
        - Avoid exaggeration.
        - Keep explanation professional and concise (3–5 sentences).
        `;

  /* ---------------------------------------------------------
     STEP 2: Send request to local Ollama API
     - Model runs locally (offline)
     - stream: false → we want full response at once
     --------------------------------------------------------- */
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "qcwind/qwen3-8b-instruct-Q4-K-M:latest",
      prompt: structuredSummary,
      stream: false
    }
  );

  /* ---------------------------------------------------------
     STEP 3: Extract explanation text
     Ollama returns JSON with:
       {
         model,
         response,
         ...
       }

     We only return the "response" field.
     --------------------------------------------------------- */
  return response.data.response;
}

/* Export function so routes can use it */
module.exports = { generateExplanation };