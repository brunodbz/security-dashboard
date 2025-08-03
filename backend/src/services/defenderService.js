// backend/src/services/defenderService.js
const axios = require('axios');

const getDefenderEvents = async () => {
  try {
    const response = await axios.get('https://api.securitycenter.microsoft.com/api/alerts', {
      headers: {
        'Authorization': `Bearer ${await getDefenderAccessToken()}`
      },
      params: {
        '$top': 10
      }
    });
    
    return response.data.value.map(alert => ({
      id: alert.id,
      type: alert.category,
      severity: alert.severity,
      description: alert.title,
      timestamp: alert.alertCreationTime
    }));
  } catch (error) {
    console.error('Erro ao buscar eventos do Defender:', error);
    return [];
  }
};

const getDefenderAccessToken = async () => {
  const tokenResponse = await axios.post(`https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`, {
    client_id: process.env.DEFENDER_CLIENT_ID,
    client_secret: process.env.DEFENDER_CLIENT_SECRET,
    scope: 'https://api.securitycenter.microsoft.com/.default',
    grant_type: 'client_credentials'
  });
  
  return tokenResponse.data.access_token;
};

module.exports = { getDefenderEvents };