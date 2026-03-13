// const pool = require("./config/db");

// pool.connect()
//   .then(() => console.log("PostgreSQL Connected Successfully"))
//   .catch(err => console.error("PostgreSQL Connection Error:", err));





const express = require("express");
const cors = require("cors");

const maintenanceRoutes = require("./routes/maintenanceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api", maintenanceRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});``