const { Router } = require('express');
const tripsRouter = require('./trips');

const app = Router();
app.use('/trips', tripsRouter);

module.exports = app;