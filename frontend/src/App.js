import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [equipmentList, setEquipmentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityData, setPriorityData] = useState(null);
  const [backlog, setBacklog] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [showRiskBreakdown, setShowRiskBreakdown] = useState(false);
  const [showFailurePattern, setShowFailurePattern] = useState(false);
  const [showPMImpact, setShowPMImpact] = useState(false);

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

  }, []);

  /* ================= SEARCH ================= */
  const handleSearch = () => {
    const filtered = equipmentList.filter(item =>
      item.equipment_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  };

  /* ================= FETCH PRIORITY ================= */
  const handleSelect = (id) => {
    fetch(`http://localhost:5000/api/priority/${id}`)
      .then(res => res.json())
      .then(data => setPriorityData(data));
  };

  return (
    <div className="container">

      <h1 className="title">Maintenance AI Dashboard</h1>

      {/* ================= SEARCH BAR ================= */}
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

      {/* ================= EQUIPMENT LIST ================= */}
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
          {filteredList.map((item, index) => (
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

      {/* ================= PRIORITY RESULT CARD ================= */}
      {priorityData && (
        <div className="card">
          <h2>Priority Result</h2>

          <p><strong>Equipment:</strong> {priorityData.equipment_id}</p>
          <p><strong>Failure Count:</strong> {priorityData.failure_count}</p>
          <p><strong>Criticality:</strong> {priorityData.criticality}</p>
          <p><strong>PM Status:</strong> {priorityData.pm_status}</p>
          <p><strong>Risk Score:</strong> {priorityData.risk_score}</p>
          <h3 onClick={() => setShowRiskBreakdown(!showRiskBreakdown)}
              style={{cursor:"pointer"}}>
          ▼ Risk Breakdown
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

          <h3 onClick={() => setShowFailurePattern(!showFailurePattern)}
              style={{cursor:"pointer"}}>
          ▼ Failure Pattern
          </h3>

          {showFailurePattern && (
            <div>
              <p>
                Most Common Failure Mode: {priorityData.most_common_failure_mode}
              </p>
              <p>
                Occurrences: {priorityData.failure_mode_occurrences}
              </p>
            </div>
          )}

          <h3 onClick={() => setShowPMImpact(!showPMImpact)}
              style={{cursor:"pointer"}}>
          ▼ Preventive Maintenance Impact
          </h3>

          {showPMImpact && (
            <div>
              <p>Current Risk: {priorityData.risk_score}</p>
              <p>Risk After PM: {priorityData.simulated_risk_after_pm}</p>
              <p>Risk Reduction: {priorityData.risk_reduction_if_pm_done}</p>
            </div>
          )}
          <p>
            <strong>Suggested Priority:</strong>
            <span className={`priority ${priorityData.suggested_priority}`}>
              {priorityData.suggested_priority}
            </span>
          </p>

          <p>
            <strong>Execution Status:</strong>
            <span className={`execution ${priorityData.execution_status}`}>
              {priorityData.execution_status}
            </span>
          </p>

          <p><strong>Execution Note:</strong> {priorityData.execution_note}</p>
          <p><strong>Recommendation:</strong> {priorityData.planning_recommendation}</p>

          <p><strong>Explanation:</strong></p>
          <p className="explanation">{priorityData.explanation}</p>
        </div>
      )}

      {/* ================= FLEET RISK OVERVIEW ================= */}
      <div className="fleet-section">
        <h2>Fleet Risk Overview</h2>

        <div className="filter-container">
          <label>Filter by Priority: </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="dropdown"
          >
            <option value="ALL">All</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
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
                  <td>{item.risk_score}</td>

                  <td className={`priority ${item.priority}`}>
                    {item.priority}
                  </td>
                  <td className={`execution ${item.execution_status}`}>
                    {item.execution_status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;