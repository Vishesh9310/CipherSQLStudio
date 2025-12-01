const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const assignmentsRoute = require("./routes/assignments");
const hintRoute = require("./routes/hint");
const runQuery = require('./routes/runQuery');

dotenv.config();

const app = express();
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

// Routes
app.use("/api/assignments", assignmentsRoute);
app.use("/api/runquery", runQuery);
app.use("/api/hint", hintRoute);

app.get('/', (req, res)=>{
    res.send("Hey, It's working vishesh");
});

module.exports = app;