const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');

// Load environment variables
dotenv.config();

// Following Single Responsibility Principle - server.js only handles server setup and routing
const app = express();
const PORT = process.env.PORT || 3000;

// Get service URLs from environment variables (for Railway deployment)
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || `http://localhost:${process.env.USER_SERVICE_PORT || 3001}`;
const EVENT_SERVICE_URL = process.env.EVENT_SERVICE_URL || `http://localhost:${process.env.EVENT_SERVICE_PORT || 3002}`;
const DISCOVERY_SERVICE_URL = process.env.DISCOVERY_SERVICE_URL || `http://localhost:${process.env.DISCOVERY_SERVICE_PORT || 3003}`;
const REQUEST_SERVICE_URL = process.env.REQUEST_SERVICE_URL || `http://localhost:${process.env.REQUEST_SERVICE_PORT || 3004}`;
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || `http://localhost:${process.env.NOTIFICATION_SERVICE_PORT || 3005}`;
const FEEDBACK_SERVICE_URL = process.env.FEEDBACK_SERVICE_URL || `http://localhost:${process.env.FEEDBACK_SERVICE_PORT || 3006}`;
const SAFETY_SERVICE_URL = process.env.SAFETY_SERVICE_URL || `http://localhost:${process.env.SAFETY_SERVICE_PORT || 3007}`;
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || `http://localhost:${process.env.PAYMENT_SERVICE_PORT || 3008}`;
const PARTNERSHIP_SERVICE_URL = process.env.PARTNERSHIP_SERVICE_URL || `http://localhost:${process.env.PARTNERSHIP_SERVICE_PORT || 3009}`;

// Middleware
app.use(
  session({
    secret: process.env.COOKIE_KEY || 'tymout_cookie_secret_key_change_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  })
);

// CORS configuration for production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3010',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));

app.use(express.json());
app.use(morgan('dev')); // Logging

// Routes to microservices
app.use('/api/users', createProxyMiddleware({ 
  target: USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {'^/api/users': ''},
  secure: process.env.NODE_ENV === 'production',
  cookieDomainRewrite: {
    '*': process.env.NODE_ENV === 'production' ? '.railway.app' : 'localhost'
  },
  onProxyRes: (proxyRes, req, res) => {
    // Handle redirects from the user service
    if (proxyRes.headers.location) {
      const location = proxyRes.headers.location;
      if (location.startsWith('/auth')) {
        proxyRes.headers.location = `/api/users${location}`;
      } else if (location.includes('/auth/success')) {
        proxyRes.headers.location = location.replace(/^https?:\/\/[^\/]+/, process.env.FRONTEND_URL);
      }
    }
  }
}));

app.use('/api/events', createProxyMiddleware({ 
  target: EVENT_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/events': ''}
}));

app.use('/api/discovery', createProxyMiddleware({ 
  target: DISCOVERY_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/discovery': ''}
}));

app.use('/api/requests', createProxyMiddleware({ 
  target: REQUEST_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/requests': ''}
}));

app.use('/api/notifications', createProxyMiddleware({ 
  target: NOTIFICATION_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/notifications': ''}
}));

app.use('/api/feedback', createProxyMiddleware({ 
  target: FEEDBACK_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/feedback': ''}
}));

app.use('/api/safety', createProxyMiddleware({ 
  target: SAFETY_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/safety': ''}
}));

app.use('/api/payments', createProxyMiddleware({ 
  target: PAYMENT_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/payments': ''}
}));

app.use('/api/partnerships', createProxyMiddleware({ 
  target: PARTNERSHIP_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: {'^/api/partnerships': ''}
}));

// Health check endpoint with service status
app.get('/health', async (req, res) => {
  try {
    const serviceStatus = {
      user: USER_SERVICE_URL,
      event: EVENT_SERVICE_URL,
      discovery: DISCOVERY_SERVICE_URL,
      request: REQUEST_SERVICE_URL,
      notification: NOTIFICATION_SERVICE_URL,
      feedback: FEEDBACK_SERVICE_URL,
      safety: SAFETY_SERVICE_URL,
      payment: PAYMENT_SERVICE_URL,
      partnership: PARTNERSHIP_SERVICE_URL
    };

    res.status(200).json({ 
      status: 'ok', 
      service: 'api-gateway',
      environment: process.env.NODE_ENV,
      services: serviceStatus,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error', 
      service: 'api-gateway',
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
  console.log(`API Gateway running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
