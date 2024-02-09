const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

/* GET home page */
router.get('/', controller);

module.exports = router;