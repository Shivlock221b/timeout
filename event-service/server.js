const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Following Single Responsibility Principle - server.js only handles server setup
const app = express();
const PORT = process.env.PORT || 3002;

// MongoDB connection - using the connection string from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://tymout:xShiTOyopWJvVYWn@tymout.2ovsdf2.mongodb.net/tymout-events';

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3010',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));

app.use(express.json());
app.use(morgan('dev')); // Logging

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB - Event Service');
    console.log('MongoDB Connection URI:', MONGO_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Import routes - following SRP by separating route handling
const eventRoutes = require('./routes/events');

// Use routes
app.use('/events', eventRoutes);

// Health check endpoint with MongoDB status
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({ 
      status: 'ok', 
      service: 'event-service',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error', 
      service: 'event-service',
      error: err.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Event Service running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
