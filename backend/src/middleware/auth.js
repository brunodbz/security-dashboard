// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Acesso não autorizado' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    
    if (!user) return res.status(401).json({ error: 'Acesso não autorizado' });
    
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Acesso não autorizado' });
  }
};

// Controle de acesso baseado em papel (RBAC)
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Acesso não autorizado' });
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permissão negada' });
    }
    
    next();
  };
};

module.exports = { auth, authorize };