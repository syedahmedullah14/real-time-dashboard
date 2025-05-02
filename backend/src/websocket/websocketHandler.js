const dataService = require('../services/dataService');
const logger = require('../utils/logger');

const websocketHandler = (wss) => {
  wss.on('connection', (ws) => {
    logger.info('Client connected to WebSocket');
    
    // Send initial data immediately
    ws.send(JSON.stringify(dataService.getCurrentData()));
    
    // Set up interval to send data every 5 seconds
    const intervalId = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(dataService.getCurrentData()));
      }
    }, 5000);
    
    // Handle client disconnection
    ws.on('close', () => {
      logger.info('Client disconnected from WebSocket');
      clearInterval(intervalId);
    });
    
    // Handle errors
    ws.on('error', (error) => {
      logger.error('WebSocket error:', error);
    });
  });
};

module.exports = websocketHandler;