const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger.error(`Error: ${err.message}`);
  
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  });
};

module.exports = errorHandler;