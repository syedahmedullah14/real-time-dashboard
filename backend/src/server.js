const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const logger = require('./utils/logger');
const dataRoutes = require('./routes/dataRoutes');
const errorHandler = require('./middleware/errorHandler');
const websocketHandler = require('./websocket/websocketHandler');

// Create Express app
const app = express();
const server = http.createServer(app);

// Configure middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });
websocketHandler(wss);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;