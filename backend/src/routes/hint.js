const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment"); 
const { generateHint } = require("../utils/llm"); 

router.post("/", async (req, res) => {
  try {
    const { assignmentId, userQuery } = req.body;

    if (!assignmentId || !userQuery) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const hint = await generateHint({
      assignment,
      userQuery,
    });

    res.json({ hint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate hint" });
  }
});

module.exports = router;
