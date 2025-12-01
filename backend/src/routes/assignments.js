const express = require('express');
const { addAssignment, getAssignment, getAllAssignment } = require('../controllers/assignmentController');
const router = express.Router();

router.post('/', addAssignment);
router.get('/:id', getAssignment);
router.get('/', getAllAssignment);

module.exports = router;