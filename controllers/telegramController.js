const { Telegraf } = require('telegraf');

// Delay util
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Kirim pesan dengan retry dan timeout
const sendWithRetry = async (bot, chatId, message, maxRetries = 3, timeoutMs = 5000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await Promise.race([
        bot.telegram.sendMessage(chatId, message),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout sending Telegram message')), timeoutMs)
        ),
      ]);
      return result; // sukses
    } catch (err) {
      console.error(`⚠️ Attempt ${attempt} failed:`, err.message);
      if (attempt === maxRetries) throw err;
      await delay(1000 * attempt); // delay bertahap: 1s, 2s, dst.
    }
  }
};

// Handler utama untuk express route
const sendMessage = async (req, res) => {
  const { type } = req.query;
  const { message } = req.body;

  // Validasi
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  // Ambil token & chat ID sesuai jenis pesan
  const token = type === 'report' ? process.env.TELEGRAM_BOT_TOKEN_REPORT : process.env.TELEGRAM_BOT_TOKEN;
  const chatId = type === 'report' ? process.env.TELEGRAM_CHAT_ID_REPORT : process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Bot token or chat ID not configured' });
  }

  const bot = new Telegraf(token);

  try {
    await sendWithRetry(bot, chatId, message); // Kirim dengan retry
    return res.status(200).json({ message: 'Message sent successfully via Telegram bot' });
  } catch (error) {
    console.error('❌ Failed after retries:', error.message);
    return res.status(500).json({ error: 'Failed to send message after retries', details: error.message });
  }
};

module.exports = {
  sendMessage,
};
