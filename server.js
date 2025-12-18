const express = require('express');
const path = require('path');
const routes = require('./route');
const { connectDB, seedPlans } = require('./db');
const app = express();

// Connect to MongoDB and seed plans
const initializeDB = async () => {
  try {
    const connected = await connectDB();
    if (connected) {
      await seedPlans();
    } else {
      console.warn('Backend running in OFFLINE mode (no database connection).');
    }
  } catch (err) {
    console.error('Initialization error:', err);
  }
};

initializeDB();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS middleware (for React app)
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files from React build folder
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Also serve public folder as fallback for development assets
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 API endpoints: http://localhost:${PORT}/api`);
  console.log(`📁 Serving static files from: ${buildPath}\n`);
});