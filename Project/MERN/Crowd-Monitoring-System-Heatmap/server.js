require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const detectionRoutes = require('./routes/detection');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/detection', detectionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});