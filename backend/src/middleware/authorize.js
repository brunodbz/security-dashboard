const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, error: 'Acesso não autorizado' });
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Permissão negada' });
    }
    
    next();
  };
};

module.exports = { authorize };