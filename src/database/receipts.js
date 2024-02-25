// Manages storing and retrieving receipts in memory.

let receipts = {};

const saveReceipt = (id, receipt) => {
    receipts[id] = receipt;
};

const getReceipt = (id) => {
    return receipts[id];
}

module.exports = {
    saveReceipt,
    getReceipt
};