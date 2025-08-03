const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Rota de saúde para teste de conexão
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Backend is running'
  });
});

// Exportar o app para ser usado no server.js
module.exports = app;