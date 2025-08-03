const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { sendTelegramAlert } = require('../services/securityServices');

// Endpoint para receber alertas críticos
router.post('/critical', auth, async (req, res) => {
  try {
    const { message } = req.body;
    
    // Enviar alerta para o Telegram
    const telegramResult = await sendTelegramAlert(`ALERTA CRÍTICO: ${message}`);
    
    // Registrar no log de auditoria
    const AuditLog = require('../models/AuditLog');
    await new AuditLog({
      userId: req.user._id,
      action: 'send_alert',
      details: `Alerta crítico enviado: ${message}`
    }).save();
    
    res.json({ 
      success: true, 
      message: 'Alerta crítico processado',
      telegramSent: telegramResult.success
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;