// The entry point of your application. Set up your Express server here and use the routes and middleware.

const express = require('express');
// const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(errorHandler);

app.use('/receipts', require("./routes/receiptRoutes"));

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

// app.listen(port, () => {
//     console.log(`Receipt Processor app listening at http://localhost:${port}`);
// })

module.exports = app;