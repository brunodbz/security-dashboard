const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { authorize } = require('../middleware/authorize');

// Admin pode cadastrar usuários
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Nome de usuário já existe' });
    }
    
    // Criar novo usuário
    const user = new User({ username, password, role });
    await user.save();
    
    // Registrar no log de auditoria
    const AuditLog = require('../models/AuditLog');
    await new AuditLog({
      userId: req.user._id,
      action: 'create_user',
      details: `Usuário criado: ${username} com perfil ${role}`
    }).save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Usuário criado com sucesso',
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin pode editar usuários
router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const { username, role, active } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { username, role, active }, 
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Registrar no log de auditoria
    const AuditLog = require('../models/AuditLog');
    await new AuditLog({
      userId: req.user._id,
      action: 'update_user',
      details: `Usuário atualizado: ${username}`
    }).save();
    
    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        active: user.active
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin pode excluir usuários
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Registrar no log de auditoria
    const AuditLog = require('../models/AuditLog');
    await new AuditLog({
      userId: req.user._id,
      action: 'delete_user',
      details: `Usuário excluído: ${user.username}`
    }).save();
    
    res.json({ 
      success: true, 
      message: 'Usuário excluído com sucesso' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar usuários (apenas admin)
router.get('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, '-password -tokens');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;