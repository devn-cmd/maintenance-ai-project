

Phase 1.5 enhances the original deterministic maintenance prioritization engine by incorporating:

Time-aware failure analysis

Failure clustering detection

Execution feasibility constraints

Structured AI-based explanation

The system remains fully deterministic, auditable, and rule-based.

AI does not modify risk scores or override priority decisions.

🏗 2. System Architecture

The system consists of three independent layers:

2.1 Risk Engine (Technical Risk)

Responsible for:

Failure frequency scoring

Criticality weighting

Age factor

Preventive maintenance penalty

Time-weighted recency boost

Failure clustering detection

Priority threshold mapping

2.2 Execution Engine (Feasibility Layer)

Evaluates:

Spare parts availability

Lead time

Crew rotation constraints

Technician availability

Tools availability

Execution does NOT alter risk score.

2.3 AI Explanation Layer

Generates structured narrative explanation based on:

Calculated risk score

Priority classification

Execution status

AI strictly follows predefined risk thresholds.

📊 3. Risk Model Logic

Risk Score Formula:

Risk Score =
(Frequency Score × Criticality Weight)
+ Age Factor
+ Recency Boost
+ Cluster Penalty
+ PM Penalty
Frequency Score

0 failures → 0

1–2 failures → 2

3–5 failures → 5

5 failures → 8

Criticality Weight

A → 5

B → 3

C → 1

Age Factor

15 years → +3

10 years → +2

Recency Boost

≥3 failures in last 12 months → +2

≥2 failures in last 90 days → +3

Cluster Penalty

If 3 failures occur within any 60-day window → +5

PM Penalty

Overdue → +5

Due Soon → +2

Priority Thresholds

Risk ≥ 35 → P1

Risk ≥ 15 → P2

Risk < 15 → P3

⚙️ 4. Execution Model Logic

Execution Status Categories:

READY

DELAYED

BLOCKED

BLOCKED Conditions

Spare not available with long lead time

Technician unavailable

Required tools unavailable

DELAYED Conditions

Low spare stock

Crew off rotation

Execution does not modify technical risk score.

🤖 5. AI Explanation Layer

The AI layer:

Receives calculated values only

Cannot modify priority

Cannot modify risk score

Must align explanation with defined thresholds

Purpose:
To translate structured engineering logic into professional narrative.

🌐 6. API Endpoints
GET /api/equipment

Returns equipment master data.

GET /api/priority/:equipmentId

Returns:

Risk score

Failure counts

Recency metrics

Cluster penalty

PM penalty

Execution status

Planning recommendation

AI explanation

GET /api/backlog-risk

Returns sorted fleet risk ranking (technical risk only).

⚠️ 7. Current Limitations

Uses CSV storage (no persistence layer)

No audit history logging

No time-series visualization

No integration with SAP or CMMS

No database normalization

🚀 8. Next Phase Direction (Phase 2)

Phase 2 will introduce:

PostgreSQL database

Structured schema

Risk audit logging

Historical trend storage

Performance optimization

Potential integration-ready design

🧱 Final Step