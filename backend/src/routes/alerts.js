// backend/src/routes/alerts.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { sendTelegramAlert } = require('../services/securityServices');

// Endpoint para receber alertas críticos
router.post('/critical', auth, async (req, res) => {
  try {
    const { message } = req.body;
    
    // Enviar alerta para o Telegram
    await sendTelegramAlert(`ALERTA CRÍTICO: ${message}`);
    
    // Em uma implementação real, você também poderia:
    // 1. Salvar o alerta no banco de dados
    // 2. Enviar via WebSocket para clientes conectados
    // 3. Enviar por email ou SMS
    
    res.json({ success: true, message: 'Alerta crítico processado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;