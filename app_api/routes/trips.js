const { Router } = require('express');
const { tripsList, tripsFindByCode } = require('../controllers/trips');

const app = Router();
app.get('/', tripsList);
app.get('/:tripCode', tripsFindByCode);

module.exports = app;