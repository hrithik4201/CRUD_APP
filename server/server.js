const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./db.js');
const satResultsRoutes = require('./routes.js');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database
connectDB();

// API routes
app.use('/api/sat-results', satResultsRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
