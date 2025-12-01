const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    userId: String, //Or sessionId for storing the non-auth user.
    assignmentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "assignment"
    }],
    sqlQuery: String,
    lastAttempt: Date,
    isCompleted: Boolean,
    attemptCount: Number,
},{timestamps: true,});

module.exports = mongoose.model.UserProgress || mongoose.model("UserProgress", userProgressSchema);