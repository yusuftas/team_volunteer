require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB.');
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}.`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
