// Contains the logic to calculate points based on the receipt data.

const calculatePoints = (receipt) => {
    let points = 0;
    
    // Rule 1: One point for every alphanumeric character in the retailer name.
    const alphanumerics = receipt.retailer.match(/[A-Za-z0-9]/g);
    if (alphanumerics) points += alphanumerics.length;

    // Rule 2: 50 points if the total is a round dollar amount with no cents.
    if (receipt.total % 1 === 0) {
        points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25.
    if (receipt.total % 0.25 === 0) {
        points += 25;
    }

    // Rule 4: 5 points for every two items on the receipt.
    let itemsPoints = Math.floor(receipt.items.length / 2) * 5;
    points += itemsPoints;

    // Rule 5: If the trimmed length of the item description is a multiple of 3, 
    // multiply the price by 0.2 and round up to the nearest integer. 
    // The result is the number of points earned.

    receipt.items.forEach(element => {
        if (element.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(parseFloat(element.price) * 0.2);
        }
    });

    // Rule 6: 6 points if the day in the purchase date is odd.
    const purchaseDate = new Date(receipt.purchaseDate + 'T00:00:00');
    if (purchaseDate.getUTCDate() % 2 !== 0) {
        points += 6;
    }

    // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm.
    const purchaseTime = receipt.purchaseTime.split(':');
    const hour = parseInt(purchaseTime[0], 10);

    if (hour >= 14 && hour < 16) {
        points += 10;
    }

    return points;

};

module.exports = calculatePoints;