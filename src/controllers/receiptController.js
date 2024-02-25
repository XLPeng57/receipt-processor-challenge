// Contains the logic for handling API requests and responses. 
// It acts as the intermediate layer between the route definitions and the business logic.

const { v4: uuidv4 } = require('uuid');
const DB = require('../database/receipts');
const calculatePoints = require('../middlewares/pointsCalculator')

const processReceipt = (req, res) => {
    const receipt = req.body;
    const id = uuidv4();

    DB.saveReceipt(id, receipt);
    res.json({"id": id});

}

const getReceiptPoints = (req, res) => {

    const { id } = req.params;
    const receipt = DB.getReceipt(id);

    if (receipt) {
        const points = calculatePoints(receipt);
        res.json({ points });
    } else {
        res.status(404).send("Receipt not found!");
    }
}

module.exports = {
    processReceipt,
    getReceiptPoints
};