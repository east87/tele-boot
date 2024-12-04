const express = require('express');
const telegramController = require('../controllers/telegramController');

const router = express.Router();
router.post('/send', telegramController.sendMessage);

module.exports = router;
