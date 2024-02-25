// Defines the Express routes for your application. This is where you map endpoints to controller functions

const express = require('express');
const router = express.Router();

const { processReceipt, getReceiptPoints } = require('../controllers/receiptController');
const validateReceipt = require('../middlewares/validateReceipt');

router.post('/process', validateReceipt, processReceipt);
router.get('/:id/points', getReceiptPoints);

module.exports = router