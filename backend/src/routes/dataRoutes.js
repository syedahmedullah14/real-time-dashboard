const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.get('/current', dataController.getCurrentData);
router.get('/historical', dataController.getHistoricalData);

module.exports = router;