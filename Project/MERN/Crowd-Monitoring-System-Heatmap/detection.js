const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

// In-memory cache for the latest detection data
let latestData = {
  people_count: 0,
  cluster_count: 0,
  frame: null,
  timestamp: null,
};
let detectionProcess = null;

router.post('/start', (req, res) => {
  if (detectionProcess) {
    return res.status(400).json({ message: 'Detection is already running.' });
  }

  detectionProcess = spawn('python3', ['../scripts/crowd_detect.py', '--server']);

  detectionProcess.stdout.on('data', (data) => {
    try {
      const parsedData = JSON.parse(data.toString());
      latestData = { ...parsedData, timestamp: new Date() };
    } catch (e) {
      // Ignore parsing errors if the buffer is incomplete
    }
  });

  detectionProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  detectionProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
    detectionProcess = null;
  });

  res.status(200).json({ message: 'Detection started.' });
});

router.post('/stop', (req, res) => {
  if (detectionProcess) {
    detectionProcess.kill('SIGTERM');
    detectionProcess = null;
    res.status(200).json({ message: 'Detection stopped.' });
  } else {
    res.status(400).json({ message: 'Detection is not running.' });
  }
});

router.get('/frame', (req, res) => {
  res.json(latestData);
});

module.exports = router;