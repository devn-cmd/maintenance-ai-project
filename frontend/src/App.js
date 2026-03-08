import { useEffect, useState } from "react";

function App() {

  /* =====================================================
     STATE SECTION
     -----------------------------------------------------
     These hold dynamic data from backend APIs
     ===================================================== */

  // Stores all equipment list
  const [equipmentList, setEquipmentList] = useState([]);

  // Stores selected equipment ID
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // Stores single equipment priority result
  const [priorityData, setPriorityData] = useState(null);

  // Stores fleet-wide risk ranking
  const [backlog, setBacklog] = useState([]);


  /* =====================================================
     LOAD INITIAL DATA (Runs once on page load)
     ===================================================== */
  useEffect(() => {

    // Load equipment master data
    fetch("http://localhost:5000/api/equipment")
      .then(res => res.json())
      .then(data => setEquipmentList(data));

    // Load fleet risk ranking
    fetch("http://localhost:5000/api/backlog-risk")
      .then(res => res.json())
      .then(data => setBacklog(data));

  }, []); // Empty dependency array = run once


  /* =====================================================
     HANDLE EQUIPMENT SELECTION
     -----------------------------------------------------
     When user clicks "Check Priority"
     Fetch risk calculation for selected equipment
     ===================================================== */
  const handleSelect = (id) => {

    setSelectedEquipment(id);

    fetch(`http://localhost:5000/api/priority/${id}`)
      .then(res => res.json())
      .then(data => setPriorityData(data));
  };


  /* =====================================================
     UI SECTION
     ===================================================== */
  return (
    <div style={{ padding: "40px" }}>

      <h1>Maintenance AI Dashboard</h1>

      {/* ================================================
         EQUIPMENT LIST SECTION
         ================================================ */}
      <h2>Equipment List</h2>

      <ul>
        {equipmentList.map((item, index) => (
          <li key={index}>
            {item.equipment_id} - {item.equipment_type} - Criticality {item.criticality}

            <button
              onClick={() => handleSelect(item.equipment_id)}
              style={{ marginLeft: "10px" }}
            >
              Check Priority
            </button>
          </li>
        ))}
      </ul>


      {/* ================================================
         SINGLE ASSET PRIORITY RESULT
         ================================================ */}
      {priorityData && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid black",
            padding: "20px"
          }}
        >
          <h3>Priority Result</h3>

          <p><strong>Equipment:</strong> {priorityData.equipment_id}</p>
          <p><strong>Failure Count:</strong> {priorityData.failure_count}</p>
          <p><strong>Criticality:</strong> {priorityData.criticality}</p>
          <p><strong>Risk Score:</strong> {priorityData.risk_score}</p>
          <p><strong>Simulated Risk (If PM Completed):</strong> {priorityData.simulated_risk_after_pm}</p>

          <p>
            <strong>Risk Reduction if PM Done:</strong>
            <span style={{ color: "blue", marginLeft: "5px" }}>
              -{priorityData.risk_reduction_if_pm_done}
            </span>
          </p>
          <p>
            <strong>Suggested Priority:</strong>
            <span
              style={{
                marginLeft: "8px",
                color:
                  priorityData.suggested_priority === "P1"
                    ? "red"
                    : priorityData.suggested_priority === "P2"
                    ? "orange"
                    : "green"
              }}
            >
              {priorityData.suggested_priority}
            </span>
          </p>

          <p>
            <strong>Explanation:</strong><br />
            {priorityData.explanation}
          </p>
        </div>
      )}


      {/* ================================================
         FLEET RISK RANKING SECTION
         Shows Top 5 Highest Risk Assets
         ================================================ */}
      <div style={{ marginTop: "50px" }}>
        <h2>Fleet Risk Ranking (Top 5)</h2>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Criticality</th>
              <th>Failures</th>
              <th>Risk Score</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {backlog.slice(0, 5).map((item, index) => (
              <tr key={index}>
                <td>{item.equipment_id}</td>
                <td>{item.criticality}</td>
                <td>{item.failure_count}</td>
                <td>{item.risk_score}</td>
                <td
                  style={{
                    color:
                      item.priority === "P1"
                        ? "red"
                        : item.priority === "P2"
                        ? "orange"
                        : "green"
                  }}
                >
                  {item.priority}
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