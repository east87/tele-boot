const express = require('express');
const telegramController = require('../controllers/telegramController');

const router = express.Router();
router.post('/send_message', telegramController.sendMessage);
module.exports = router;
