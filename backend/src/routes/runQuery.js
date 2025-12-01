const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment"); 
const client = require("../utils/pgClient"); 

router.post("/", async (req, res) => {
  try {
    const { assignmentId, userQuery } = req.body;

    if (!assignmentId || !userQuery) {
      console.log("Request body:", req.body);
      return res.status(400).json({ error: "Missing fields" });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const sampleTables = assignment.sampleTables;

    const clientSession = client;

    for (const table of sampleTables) {
      const cols = table.columns.map(c => `${c.columnName} ${c.dataType}`).join(", ");

      await clientSession.query(`DROP TABLE IF EXISTS ${table.tableName};`);

      const createSQL = `CREATE TEMP TABLE ${table.tableName} (${cols});`;
      await clientSession.query(createSQL);

      for (const row of table.rows) {
        const columns = Object.keys(row).join(", ");
        const values = Object.values(row)
          .map(v => (typeof v === "string" ? `'${v.replace(/'/g, "''")}'` : v))
          .join(", ");
        const insertSQL = `INSERT INTO ${table.tableName} (${columns}) VALUES (${values});`;
        await clientSession.query(insertSQL);
      }
    }

    const result = await clientSession.query(userQuery);

    res.json({
      type: "table",
      value: result.rows,
      columns: result.fields.map(f => f.name),
    });
  } catch (err) {
    console.error("run-query error:", err);
    res.status(500).json({ error: "Failed to run query", details: err.message });
  }
});

module.exports = router;
