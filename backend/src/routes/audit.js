const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const { auth, authorize } = require('../middleware/auth');

// Obter logs de auditoria com filtros e paginação
router.get('/', auth, authorize(['admin', 'gestor']), async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate, action, search } = req.query;
    const skip = (page - 1) * limit;
    
    const filter = {};
    
    if (startDate && endDate) {
      filter.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (action) {
      filter.action = { $regex: action, $options: 'i' };
    }
    
    if (search) {
      filter.$or = [
        { action: { $regex: search, $options: 'i' } },
        { details: { $regex: search, $options: 'i' } }
      ];
    }
    
    const logs = await AuditLog.find(filter)
      .populate('userId', 'username role')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await AuditLog.countDocuments(filter);
    
    res.json({
      success: true,
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Excluir logs antigos (apenas admin)
router.delete('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const { days = 90 } = req.body;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const result = await AuditLog.deleteMany({ timestamp: { $lt: cutoffDate } });
    
    // Registrar no log de auditoria
    await new AuditLog({
      userId: req.user._id,
      action: 'delete_audit_logs',
      details: `Excluídos ${result.deletedCount} logs de auditoria com mais de ${days} dias`
    }).save();
    
    res.json({ 
      success: true,
      message: `${result.deletedCount} registros de auditoria excluídos`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;