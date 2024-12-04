const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const sendMessage = async (req, res) => {
  const {message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'chatId and message are required' });
  }
  try {
   const chatId= process.env.TELEGRAM_CHAT_ID;
    await bot.telegram.sendMessage(chatId, message);
    res.status(200).json({ message: 'Message sent successfully via Telegram bot' });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    res.status(500).json({ error: 'Failed to send message', details: error });
  }
};

module.exports = {
  sendMessage,
};
