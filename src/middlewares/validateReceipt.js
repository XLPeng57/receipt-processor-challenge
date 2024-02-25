const validateReceipt = (req, res, next) => {
    const { retailer, purchaseDate, purchaseTime, items, total } = req.body;

    if (!retailer || !purchaseDate || !purchaseTime || !items || !total) {
        return res.status(400).send("Missing required receipt fields.");
    }

    if (!typeof retailer === 'string') {
        return res.status(400).send("Retailer name is invalid.");
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(purchaseDate)) {
        return res.status(400).send("Purchase date format is invalid, expected YYYY-MM-DD.");
    }

    if (!/^\d{2}:\d{2}$/.test(purchaseTime)) {
        return res.status(400).send("Purchase time format is invalid, expected HH:MM in 24-hour format.");
    }

    if (!Array.isArray(items) || items.length < 1) {
        return res.status(400).send("Items array is invalid or empty.");
    }

    if (!/^\d+\.\d{2}$/.test(total)) {
        return res.status(400).send("Total format is invalid, expected a numeric value with two decimal places.");
    }

    const itemValidationErrors = items.some(item => {
        return !item.shortDescription || !typeof item.shortDescription === 'string' || 
               !item.price || !typeof item.price === 'string';
    });

    if (itemValidationErrors) {
        return res.status(400).send("One or more items are invalid.");
    }

    next();

}

module.exports = validateReceipt;