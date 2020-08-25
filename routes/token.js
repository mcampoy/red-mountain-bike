const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.get('/confirmation/:token', tokenController.confirmation);

module.exports = router;