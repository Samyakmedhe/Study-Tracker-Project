const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory storage
let studyLogs = [];

// GET all logs
app.get('/api/studylogs', (req, res) => {
  res.json(studyLogs);
});

// POST add a log
app.post('/api/studylogs', (req, res) => {
  const log = { id: Date.now(), ...req.body };
  studyLogs.push(log);
  res.json(log);
});

// DELETE clear logs
app.delete('/api/studylogs/clear', (req, res) => {
  studyLogs = [];
  res.json({ message: "All logs cleared!" });
});

// GET export logs as CSV
app.get('/api/studylogs/export', (req, res) => {
  let csv = "Date,Subject,Duration,Description\n";
  studyLogs.forEach(log => {
    csv += `${log.date},${log.subject},${log.duration},${log.description}\n`;
  });

  fs.writeFileSync("study_logs.csv", csv);

  res.setHeader('Content-Disposition', 'attachment; filename=study_logs.csv');
  res.setHeader('Content-Type', 'text/csv');
  res.send(csv);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
