const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes.router);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Database Connection
mongoose.connect('mongodb://localhost:27017/classtrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Simple Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
