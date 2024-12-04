module.exports = {
    apps: [
      {
        name: "push-notification-service",
        script: "index.js",
        env: {
            PORT: 3001,
            EMAIL_SERVICES: "your-email@gmail.com",
            EMAIL_USER: "your-email@gmail.com",
            EMAIL_PASS: "your-email-password",
            TELEGRAM_BOT_TOKEN: "7879515095:AAHnntklKHyzSsQ8Svkg3FCqsqjEVyEA0ag",
            TELEGRAM_CHAT_ID: "1220992306"
        }
      }
    ]
  };
  