// backend/src/services/telegramService.js
const axios = require('axios');

const sendTelegramAlert = async (message) => {
  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar alerta para Telegram:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendTelegramAlert };