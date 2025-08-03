// backend/src/services/elasticService.js
const { Client } = require('@elastic/elasticsearch');

const elasticClient = new Client({
  node: process.env.ELASTIC_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD
  }
});

const getElasticEvents = async () => {
  try {
    const { body } = await elasticClient.search({
      index: 'security-events',
      body: {
        query: {
          match_all: {}
        },
        sort: [
          { timestamp: { order: 'desc' } }
        ],
        size: 10
      }
    });
    
    return body.hits.hits.map(hit => ({
      id: hit._id,
      ...hit._source
    }));
  } catch (error) {
    console.error('Erro ao buscar eventos do Elastic:', error);
    return [];
  }
};

module.exports = { getElasticEvents };