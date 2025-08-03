const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Verificar se o usuário existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Verificar se o usuário está ativo
    if (!user.active) {
      return res.status(401).json({ error: 'Usuário desativado' });
    }
    
    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Gerar token JWT
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    
    // Salvar token no usuário (opcional)
    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    // Registrar no log de auditoria
    const AuditLog = require('../models/AuditLog');
    await new AuditLog({
      userId: user._id,
      action: 'login',
      details: 'Login bem-sucedido'
    }).save();
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    // Registrar no log de auditoria
    const AuditLog = require('../models/AuditLog');
    await new AuditLog({
      userId: req.user._id,
      action: 'logout',
      details: 'Logout realizado'
    }).save();
    
    res.json({ success: true, message: 'Logout realizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;