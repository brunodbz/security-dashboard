// Simulação de integração com Elastic
const getElasticEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'Intrusion Attempt', severity: 'High', description: 'Multiple failed login attempts', timestamp: new Date() },
        { id: 2, type: 'Malware Detection', severity: 'Critical', description: 'Trojan detected on workstation', timestamp: new Date() },
        { id: 3, type: 'Data Exfiltration', severity: 'High', description: 'Large data transfer to external IP', timestamp: new Date() },
        { id: 4, type: 'Suspicious Process', severity: 'Medium', description: 'Unusual process execution', timestamp: new Date() },
        { id: 5, type: 'Network Anomaly', severity: 'Medium', description: 'Unusual network traffic pattern', timestamp: new Date() }
      ]);
    }, 300);
  });
};

// Simulação de integração com Trellix
const getTrellixEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'Suspicious Activity', severity: 'Medium', description: 'Unusual data transfer', timestamp: new Date() },
        { id: 2, type: 'Policy Violation', severity: 'Low', description: 'USB device connected', timestamp: new Date() },
        { id: 3, type: 'Threat Detected', severity: 'High', description: 'Known malware signature', timestamp: new Date() },
        { id: 4, type: 'Anomalous Behavior', severity: 'Medium', description: 'User behavior deviation', timestamp: new Date() },
        { id: 5, type: 'Network Scan', severity: 'Low', description: 'Port scanning activity', timestamp: new Date() }
      ]);
    }, 300);
  });
};

// Simulação de integração com Microsoft Defender
const getDefenderEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'Ransomware Activity', severity: 'Critical', description: 'Suspicious encryption process', timestamp: new Date() },
        { id: 2, type: 'Phishing Attempt', severity: 'High', description: 'Malicious email detected', timestamp: new Date() },
        { id: 3, type: 'Suspicious Script', severity: 'Medium', description: 'PowerShell script with suspicious commands', timestamp: new Date() },
        { id: 4, type: 'Memory Exploit', severity: 'Critical', description: 'Memory injection attempt', timestamp: new Date() },
        { id: 5, type: 'Suspicious Network Connection', severity: 'Medium', description: 'Connection to known malicious IP', timestamp: new Date() }
      ]);
    }, 300);
  });
};

// Simulação de integração com Tenable
const getTenableEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, type: 'Vulnerability', severity: 'High', description: 'SQL injection possibility', timestamp: new Date() },
        { id: 2, type: 'Configuration Issue', severity: 'Medium', description: 'Weak encryption algorithm', timestamp: new Date() },
        { id: 3, type: 'Missing Patch', severity: 'High', description: 'Critical security patch missing', timestamp: new Date() },
        { id: 4, type: 'Exposed Service', severity: 'Medium', description: 'Service exposed to internet', timestamp: new Date() },
        { id: 5, type: 'Weak Credential', severity: 'Low', description: 'Default password in use', timestamp: new Date() }
      ]);
    }, 300);
  });
};

// Simulação de envio de alerta para Telegram
const sendTelegramAlert = async (message) => {
  console.log(`[Telegram] Alerta enviado: ${message}`);
  // Em uma implementação real, você usaria:
  // const axios = require('axios');
  // await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
  //   chat_id: process.env.TELEGRAM_CHAT_ID,
  //   text: message
  // });
  return { success: true };
};

module.exports = {
  getElasticEvents,
  getTrellixEvents,
  getDefenderEvents,
  getTenableEvents,
  sendTelegramAlert
};