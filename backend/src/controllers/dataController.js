const dataService = require('../services/dataService');
const logger = require('../utils/logger');

/**
 * Get current system metrics
 */
const getCurrentData = (req, res, next) => {
  try {
    const data = dataService.getCurrentData();
    res.json(data);
  } catch (error) {
    logger.error('Error getting current data:', error);
    next(error);
  }
};

/**
 * Get historical system metrics
 */
const getHistoricalData = (req, res, next) => {
  try {
    const data = dataService.getHistoricalData();
    res.json(data);
  } catch (error) {
    logger.error('Error getting historical data:', error);
    next(error);
  }
};

module.exports = {
  getCurrentData,
  getHistoricalData
};