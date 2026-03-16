import { useEffect, useState } from "react";
import "./App.css";

/* =========================================================
   HELPER FUNCTIONS FOR RISK COLOR CODING
   ---------------------------------------------------------
   getRiskStyle(score)      → red / orange / green badge
   getPriorityStyle(priority) → red / orange / green badge
   ========================================================= */

function getRiskStyle(score) {
  if (score >= 35) {
    return {
      backgroundColor: "#e74c3c",
      color: "#fff",
      padding: "2px 10px",
      borderRadius: "6px",
      fontWeight: "bold"
    };
  } else if (score >= 15) {
    return {
      backgroundColor: "#f39c12",
      color: "#fff",
      padding: "2px 10px",
      borderRadius: "6px",
      fontWeight: "bold"
    };
  } else {
    return {
      backgroundColor: "#27ae60",
      color: "#fff",
      padding: "2px 10px",
      borderRadius: "6px",
      fontWeight: "bold"
    };
  }
}

function getPriorityStyle(priority) {
  if (priority === "P1") {
    return {
      backgroundColor: "#e74c3c",
      color: "#fff",
      padding: "2px 10px",
      borderRadius: "6px",
      fontWeight: "bold"
    };
  } else if (priority === "P2") {
    return {
      backgroundColor: "#f39c12",
      color: "#fff",
      padding: "2px 10px",
      borderRadius: "6px",
      fontWeight: "bold"
    };
  } else {
    return {
      backgroundColor: "#27ae60",
      color: "#fff",
      padding: "2px 10px",
      borderRadius: "6px",
      fontWeight: "bold"
    };
  }
}


function App() {

  const [equipmentList, setEquipmentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityData, setPriorityData] = useState(null);
  const [backlog, setBacklog] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("P1");
  const [showRiskBreakdown, setShowRiskBreakdown] = useState(false);
  const [showFailurePattern, setShowFailurePattern] = useState(false);
  const [showPMImpact, setShowPMImpact] = useState(false);
  const [fleetAnalytics, setFleetAnalytics] = useState(null);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/api/equipment")
      .then(res => res.json())
      .then(data => {
        setEquipmentList(data);
        setFilteredList(data);
      });

    fetch("http://localhost:5000/api/backlog-risk")
      .then(res => res.json())
      .then(data => setBacklog(data));

    const fetchFleetAnalytics = async () => {
      const response = await fetch("http://localhost:5000/api/fleet-analytics");
      const data = await response.json();
      setFleetAnalytics(data);
    };

    fetchFleetAnalytics();

  }, []);

  const handleSearch = () => {
    const filtered = equipmentList.filter(item =>
      item.equipment_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleSelect = (id) => {
    fetch(`http://localhost:5000/api/priority/${id}`)
      .then(res => res.json())
      .then(data => setPriorityData(data));
  };

  const sendQuestion = async () => {

    if (!question.trim()) return;

    const newMessages = [...chatMessages, { sender: "user", text: question }];
    setChatMessages(newMessages);

    const response = await fetch("http://localhost:5000/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    setChatMessages([
      ...newMessages,
      { sender: "ai", text: data.answer }
    ]);

    setQuestion("");
  };

  const displayedEquipment = showAllEquipment
    ? filteredList
    : filteredList.slice(0, 10);

  return (
    <div className="container">

      <h1 className="title">Maintenance AI Dashboard</h1>

      {/* =========================================================
          OPTION 1 — STATIC RISK SCORE LEGEND
          ---------------------------------------------------------
          Always visible at the top of the dashboard.
          Tells the engineer what each color/score range means.
          ========================================================= */}
      <div style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        padding: "12px 20px",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>

        <strong>Risk Score Legend:</strong>

        <span style={{ backgroundColor: "#e74c3c", color: "#fff", padding: "4px 14px", borderRadius: "6px", fontWeight: "bold" }}>
          P1 — Score ≥ 35
        </span>
        <span style={{ fontSize: "13px", color: "#555" }}>Immediate Action Required</span>

        <span style={{ backgroundColor: "#f39c12", color: "#fff", padding: "4px 14px", borderRadius: "6px", fontWeight: "bold" }}>
          P2 — Score 15–34
        </span>
        <span style={{ fontSize: "13px", color: "#555" }}>Plan and Schedule Soon</span>

        <span style={{ backgroundColor: "#27ae60", color: "#fff", padding: "4px 14px", borderRadius: "6px", fontWeight: "bold" }}>
          P3 — Score &lt; 15
        </span>
        <span style={{ fontSize: "13px", color: "#555" }}>Monitor Only</span>

      </div>

      {/* SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Equipment ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* EQUIPMENT LIST */}
      <h2>Equipment List</h2>

      <table className="equipment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Criticality</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedEquipment.map((item, index) => (
            <tr key={index}>
              <td>{item.equipment_id}</td>
              <td>{item.equipment_type}</td>
              <td>{item.criticality}</td>
              <td>
                <button
                  onClick={() => handleSelect(item.equipment_id)}
                  className="action-button"
                >
                  Check
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredList.length > 10 && (
        <button
          className="show-more-btn"
          onClick={() => setShowAllEquipment(!showAllEquipment)}
        >
          {showAllEquipment ? "Show Less" : "Show More"}
        </button>
      )}

      {/* =========================================================
          PRIORITY RESULT CARD
          ========================================================= */}
      {priorityData && (
        <div className="card">

          <h2>Priority Result</h2>

          <p><strong>Equipment:</strong> {priorityData.equipment_id}</p>
          <p><strong>Failure Count:</strong> {priorityData.failure_count}</p>
          <p><strong>Criticality:</strong> {priorityData.criticality}</p>
          <p><strong>PM Status:</strong> {priorityData.pm_status}</p>

          {/* -------------------------------------------------------
              OPTION 2 — COLORED RISK SCORE BADGE
              The score is wrapped in a colored span.
              Red = P1, Orange = P2, Green = P3
              ------------------------------------------------------- */}
          <p>
            <strong>Risk Score: </strong>
            <span style={getRiskStyle(priorityData.risk_score)}>
              {priorityData.risk_score}
            </span>
          </p>

          {/* RISK BREAKDOWN TOGGLE */}
          <h3
            onClick={() => setShowRiskBreakdown(!showRiskBreakdown)}
            style={{ cursor: "pointer" }}
          >
            {showRiskBreakdown ? "▲" : "▼"} Risk Breakdown
          </h3>

          {showRiskBreakdown && (
            <div>
              <p>Frequency Score: {priorityData.risk_components.frequency_score}</p>
              <p>Criticality Weight: {priorityData.risk_components.criticality_weight}</p>
              <p>Age Factor: {priorityData.risk_components.age_factor}</p>
              <p>Recency Boost: {priorityData.risk_components.recency_boost}</p>
              <p>Cluster Penalty: {priorityData.risk_components.cluster_penalty}</p>
              <p>PM Penalty: {priorityData.risk_components.pm_penalty}</p>
              <p>Failure Mode Degradation: {priorityData.risk_components.degradation_penalty}</p>
            </div>
          )}

          {/* FAILURE PATTERN TOGGLE */}
          <h3
            onClick={() => setShowFailurePattern(!showFailurePattern)}
            style={{ cursor: "pointer" }}
          >
            {showFailurePattern ? "▲" : "▼"} Failure Pattern
          </h3>

          {showFailurePattern && (
            <div>
              <p>Most Common Failure Mode: {priorityData.most_common_failure_mode}</p>
              <p>Occurrences: {priorityData.failure_mode_occurrences}</p>
              <p>Failures in Last 12 Months: {priorityData.failures_last_12_months}</p>
              <p>Failures in Last 90 Days: {priorityData.failures_last_90_days}</p>
            </div>
          )}

          {/* PM IMPACT TOGGLE */}
          <h3
            onClick={() => setShowPMImpact(!showPMImpact)}
            style={{ cursor: "pointer" }}
          >
            {showPMImpact ? "▲" : "▼"} PM Impact
          </h3>

          {showPMImpact && (
            <div>
              <p>Current Risk Score: {priorityData.risk_score}</p>
              <p>Simulated Risk After PM: {priorityData.simulated_risk_after_pm}</p>
              <p>Risk Reduction If PM Done: {priorityData.risk_reduction_if_pm_done}</p>
            </div>
          )}

          {/* SUGGESTED PRIORITY — also colored badge */}
          <p>
            <strong>Suggested Priority: </strong>
            <span style={getPriorityStyle(priorityData.suggested_priority)}>
              {priorityData.suggested_priority}
            </span>
          </p>

          <p><strong>Execution Status:</strong> {priorityData.execution_status}</p>

          <p><strong>Explanation:</strong></p>
          <p className="explanation">{priorityData.explanation}</p>

        </div>
      )}

      {/* =========================================================
          FLEET RISK OVERVIEW
          ========================================================= */}
      <div className="fleet-section">

        <h2>Fleet Risk Overview</h2>

        <div className="filter-container">
          <label>Filter by Priority: </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="dropdown"
          >
            <option value="P1">Priority 1</option>
            <option value="P2">Priority 2</option>
            <option value="P3">Priority 3</option>
            <option value="ALL">All</option>
          </select>
        </div>

        <table className="equipment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Criticality</th>
              <th>Failures</th>
              <th>Risk Score</th>
              <th>Priority</th>
              <th>Execution</th>
            </tr>
          </thead>

          <tbody>
            {backlog
              .filter(item =>
                priorityFilter === "ALL"
                  ? true
                  : item.priority === priorityFilter
              )
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.equipment_id}</td>
                  <td>{item.criticality}</td>
                  <td>{item.failure_count}</td>

                  {/* OPTION 2 — colored risk score in fleet table */}
                  <td>
                    <span style={getRiskStyle(item.risk_score)}>
                      {item.risk_score}
                    </span>
                  </td>

                  {/* colored priority badge in fleet table */}
                  <td>
                    <span style={getPriorityStyle(item.priority)}>
                      {item.priority}
                    </span>
                  </td>

                  <td>{item.execution_status}</td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>

      {/* FLEET ANALYTICS */}
      {fleetAnalytics && (
        <div className="fleet-section">

          <h2>Fleet Analytics</h2>

          <p><strong>Total Failures:</strong> {fleetAnalytics.total_failures}</p>

          <h3>Top Failure Modes</h3>
          <ul>
            {fleetAnalytics.top_failure_modes.map((mode, index) => (
              <li key={index}>
                {mode.failure_mode} — {mode.count}
              </li>
            ))}
          </ul>

          <h3>Maintenance Distribution</h3>
          <ul>
            {fleetAnalytics.maintenance_distribution.map((type, index) => (
              <li key={index}>
                {type.maintenance_type} — {type.count}
              </li>
            ))}
          </ul>

        </div>
      )}

      {/* AI CHATBOT */}
      <div className="fleet-section">

        <h2>AI Maintenance Assistant</h2>

        <div className="chat-window">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "user-msg" : "ai-msg"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask about equipment, failures, maintenance..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={sendQuestion}>
            Send
          </button>
        </div>

      </div>

    </div>
  );
}

export default App;