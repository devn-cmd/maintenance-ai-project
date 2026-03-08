/* =========================================================
   DATA LOADER SERVICE
   ---------------------------------------------------------
   Purpose:
   - Read CSV files from disk
   - Convert them into JavaScript objects
   - Return the data in a Promise (async compatible)

   This file isolates all file-reading logic.
   Other parts of the system do NOT read files directly.
   ========================================================= */

const fs = require("fs");            // Node's built-in file system module
const csv = require("csv-parser");   // Library to convert CSV rows into JS objects


/* =========================================================
   loadCSV(filePath)

   Input:
     filePath → string (example: "data/equipment_data.csv")

   Output:
     Promise that resolves with:
       Array of objects (each row in CSV)

   Why Promise?
     Because file reading is asynchronous.
     It allows us to use async/await in routes.
   ========================================================= */
function loadCSV(filePath) {

  return new Promise((resolve, reject) => {

    // Temporary array to store all rows
    const results = [];

    /* -----------------------------------------------------
       STEP 1: Create read stream from file
       This reads file gradually (memory efficient)
       ----------------------------------------------------- */
    fs.createReadStream(filePath)

      /* -----------------------------------------------------
         STEP 2: Pipe stream into CSV parser
         Each row becomes a JavaScript object
         ----------------------------------------------------- */
      .pipe(csv())

      /* -----------------------------------------------------
         STEP 3: When a row is read
         Push it into results array
         ----------------------------------------------------- */
      .on("data", (data) => results.push(data))

      /* -----------------------------------------------------
         STEP 4: When file reading finishes
         Resolve the Promise with full data
         ----------------------------------------------------- */
      .on("end", () => resolve(results))

      /* -----------------------------------------------------
         STEP 5: If any error occurs
         Reject the Promise
         ----------------------------------------------------- */
      .on("error", (err) => reject(err));
  });
}


/* Export function so other modules can use it */
module.exports = { loadCSV };