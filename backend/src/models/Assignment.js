const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    question: String,
    sampleTables: [
        {
            tableName: String,
            columns: [
                {
                    columnName: String,
                    dataType: String
                }
            ],
            rows: {
                type: [mongoose.Schema.Types.Mixed],
                default: [],
            }
        }
    ],
    expectedOutput: {
        type: {type: String},
        value: mongoose.Schema.Types.Mixed,
    }
}, { timestamps: true });

module.exports = mongoose.model.Assignment || mongoose.model("Assignment", assignmentSchema);