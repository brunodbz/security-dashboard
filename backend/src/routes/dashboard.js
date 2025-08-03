const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const {
  getElasticEvents,
  getTrellixEvents,
  getDefenderEvents,
  getTenableEvents
} = require('../services/securityServices');

// Obter dados do dashboard
router.get('/', auth, async (req, res) => {
  try {
    const [elasticEvents, trellixEvents, defenderEvents, tenableEvents] = await Promise.all([
      getElasticEvents(),
      getTrellixEvents(),
      getDefenderEvents(),
      getTenableEvents()
    ]);

    // Indicadores simulados
    const indicators = {
      assets: 150,
      exposureScore: 7.2,
      vulnerabilities: {
        critical: 5,
        high: 12,
        medium: 23,
        low: 45
      },
      recentEvents: 34
    };

    res.json({
      success: true,
      data: {
        events: {
          elastic: elasticEvents.slice(0, 10),
          trellix: trellixEvents.slice(0, 10),
          defender: defenderEvents.slice(0, 10),
          tenable: tenableEvents.slice(0, 10)
        },
        indicators
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;