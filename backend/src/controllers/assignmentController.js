const Assignment = require('../models/Assignment');

// CREATE ASSIGNMENT
const addAssignment = async (req, res) => {
  try {
    const { title, description, question, sampleTables, expectedOutput } = req.body;
    const assignment = new Assignment({ title, description, question, sampleTables, expectedOutput });
    const saved = await assignment.save();

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: saved
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating assignment",
      error: err.message
    });
  }
};

// GET ALL ASSIGNMENTS
const getAllAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    return res.status(200).json({
      success: true,
      message: "Assignments fetched successfully",
      data: assignments
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting Assignments",
      error: err.message
    });
  }
};

// GET ASSIGNMENT BY ID
const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id); 
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json(assignment);

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting Assignment",
      error: err.message
    });
  }
};

module.exports = { addAssignment, getAssignment, getAllAssignment };