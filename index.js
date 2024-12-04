require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const emailRoutes = require('./routes/email');
// const otpRoutes = require('./routes/op');
const telegramRoutes = require('./routes/telegram.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
// app.use('/email', emailRoutes);
app.use('/api/telegram', telegramRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Push Notification Service running on http://localhost:${process.env.PORT}`);
});
