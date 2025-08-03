# Dashboard de Segurança Corporativa para SOC

Um dashboard completo de segurança corporativa desenvolvido para áreas de gestão e SOC (Centro de Operações de Segurança), com autenticação de usuários, controle de acesso por perfil (RBAC), visualização de eventos de segurança, painéis de auditoria e notificações em tempo real.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Integrações](#integrações)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Credenciais de Demonstração](#credenciais-de-demonstração)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🌟 Visão Geral

Este dashboard foi projetado para fornecer uma visão centralizada da postura de segurança de uma organização, permitindo que equipes de SOC monitorem eventos de segurança, gerenciem vulnerabilidades e realizem auditorias de atividades administrativas.

Com uma interface moderna e responsiva, o sistema oferece diferentes níveis de acesso conforme o perfil do usuário (Admin, Gestor, Analista), garantindo que cada usuário visualize apenas as informações permitidas.

## ✨ Funcionalidades

### Autenticação e Controle de Acesso
- Sistema de login com autenticação JWT
- Controle de acesso baseado em papel (RBAC) com três perfis:
  - **Admin**: Acesso completo, pode cadastrar, editar e excluir usuários
  - **Gestor**: Pode visualizar e exportar dados
  - **Analista**: Pode visualizar alertas e configurar fontes de dados

### Dashboard Principal
- Indicadores de segurança: ativos monitorados, score de exposição, eventos recentes
- Visualização dos 10 principais eventos de cada solução:
  - Elastic
  - Trellix
  - Microsoft Defender
  - Tenable
- Gráficos interativos com filtros por período, severidade, perfil e fonte
- Exportação de gráficos em PNG e PDF
- Tooltips dinâmicos com informações detalhadas

### Painel de Auditoria
- Registro de todas as atividades administrativas
- Filtros por data, usuário, tipo de ação e busca por texto
- Paginação de resultados
- Exclusão manual de registros antigos com confirmação
- Exportação do log filtrado para CSV
- Legenda visual por tipo de ação (cores/ícones)

### Notificações em Tempo Real
- Alertas críticos exibidos imediatamente na interface
- Integração simulada com Telegram para envio automático de alertas
- Sistema de notificações visuais com cores diferenciadas por severidade

### Filtros Avançados
- Seleção de intervalo de datas
- Múltiplos tipos de ação (checkbox)
- Busca por palavra-chave em qualquer módulo (alertas, auditoria, gráficos)

### Relatórios e Exportação
- Exportação de dados (alertas, logs) para CSV
- Exportação de gráficos resultantes dos filtros para PNG e PDF
- Consideração dos filtros ativos em todas as exportações

### Experiência do Usuário
- Interface responsiva para desktop e mobile
- Design amigável para área de gestão executiva
- Feedback visual claro em login/logout
- Instruções rápidas e tooltips para funcionalidades-chave

## 🛠 Tecnologias Utilizadas

### Backend
- Node.js com Express
- MongoDB com Mongoose
- JWT para autenticação
- bcryptjs para hash de senhas
- Axios para requisições HTTP

### Frontend
- React com TypeScript
- Tailwind CSS para estilização
- Recharts para gráficos
- React Router para navegação
- Axios para comunicação com API

### Infraestrutura
- Docker e Docker Compose
- Nginx como proxy reverso

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (v16 ou superior) - para desenvolvimento local
- MongoDB - para desenvolvimento local

## 🚀 Instalação e Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/security-dashboard.git
cd security-dashboard
```

### 2. Configurar variáveis de ambiente

Crie os arquivos `.env` nos diretórios `backend` e `frontend`:

#### Backend (.env)
```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb://admin:password@mongodb:27017/security_dashboard?authSource=admin
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
ELASTIC_URL=http://localhost:9200
ELASTIC_USER=elastic
ELASTIC_PASSWORD=your_elastic_password
TENANT_ID=your_tenant_id
DEFENDER_CLIENT_ID=your_defender_client_id
DEFENDER_CLIENT_SECRET=your_defender_client_secret
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3000/api
```

### 3. Executar com Docker Compose

```bash
docker-compose up -d
```

Isso irá iniciar:
- Banco de dados MongoDB
- Backend Node.js
- Frontend React com Nginx

### 4. Acessar o aplicativo

Abra seu navegador e acesse: `http://localhost`

## 🖥️ Uso

### Login

1. Acesse a URL do aplicativo
2. Insira suas credenciais de login
3. Você será redirecionado para o dashboard conforme seu perfil de usuário

### Navegação pelo Dashboard

O dashboard é organizado em abas principais:
- **Visão Geral**: Exibe indicadores principais e gráficos resumidos
- **Eventos de Segurança**: Mostra todos os eventos consolidados das diferentes fontes
- **Vulnerabilidades**: Análise detalhada das vulnerabilidades identificadas
- **Auditoria**: Logs de atividades administrativas com filtros avançados

### Filtros

Em todas as seções, você pode utilizar filtros para refinar os dados exibidos:
- Selecione intervalos de datas
- Escolha tipos de ação específicos
- Utilize a busca por palavra-chave

### Exportação de Dados

1. Aplique os filtros desejados
2. Clique no botão "Exportar" na seção correspondente
3. Escolha o formato (CSV, PNG ou PDF)

### Administração de Usuários (Apenas Admin)

1. Na aba de auditoria, clique em "Gerenciar Usuários"
2. Você pode adicionar, editar ou excluir usuários
3. Defina o perfil de acesso para cada usuário

## 📁 Estrutura do Projeto

```
security-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── middleware/      # Middlewares (autenticação, autorização)
│   │   ├── models/          # Modelos do MongoDB
│   │   ├── routes/          # Rotas da API
│   │   ├── services/        # Serviços de integração
│   │   └── utils/           # Utilitários
│   ├── .env.example         # Exemplo de variáveis de ambiente
│   ├── Dockerfile           # Configuração do Docker para o backend
│   ├── package.json         # Dependências do backend
│   └── server.js            # Arquivo principal do servidor
├── frontend/
│   ├── public/              # Arquivos estáticos
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Contextos (autenticação, etc.)
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços de API
│   │   ├── types/           # Definições de tipos TypeScript
│   │   └── utils/           # Utilitários
│   ├── Dockerfile           # Configuração do Docker para o frontend
│   ├── nginx.conf           # Configuração do Nginx
│   ├── package.json         # Dependências do frontend
│   └── tailwind.config.js   # Configuração do Tailwind CSS
├── docker-compose.yml       # Configuração do Docker Compose
└── README.md                # Este arquivo
```

## 🔌 Integrações

O dashboard foi projetado para se integrar com diversas fontes de dados de segurança. Atualmente, as integrações são simuladas, mas o projeto inclui exemplos de como conectar com APIs reais:

### Elastic

```javascript
// backend/src/services/elasticService.js
const { Client } = require('@elastic/elasticsearch');

const elasticClient = new Client({
  node: process.env.ELASTIC_URL,
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
        sort: [{ timestamp: { order: 'desc' } }],
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
```

### Microsoft Defender

```javascript
// backend/src/services/defenderService.js
const axios = require('axios');

const getDefenderEvents = async () => {
  try {
    const response = await axios.get('https://api.securitycenter.microsoft.com/api/alerts', {
      headers: {
        'Authorization': `Bearer ${await getDefenderAccessToken()}`
      },
      params: { '$top': 10 }
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
```

### Telegram

```javascript
// backend/src/services/telegramService.js
const axios = require('axios');

const sendTelegramAlert = async (message) => {
  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar alerta para Telegram:', error);
    return { success: false, error: error.message };
  }
};
```

## 🔧 Variáveis de Ambiente

### Backend

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| NODE_ENV | Ambiente de execução | production |
| PORT | Porta do servidor | 3000 |
| MONGO_URI | String de conexão com MongoDB | mongodb://admin:password@mongodb:27017/security_dashboard?authSource=admin |
| JWT_SECRET | Chave secreta para JWT | your_jwt_secret_key_here |
| JWT_EXPIRES_IN | Tempo de expiração do token | 24h |
| TELEGRAM_BOT_TOKEN | Token do bot do Telegram | 123456789:ABCdefGHIjklMNOpqrsTUVwxyz |
| TELEGRAM_CHAT_ID | ID do chat do Telegram | -123456789 |
| ELASTIC_URL | URL do servidor Elastic | http://localhost:9200 |
| ELASTIC_USER | Usuário do Elastic | elastic |
| ELASTIC_PASSWORD | Senha do Elastic | your_elastic_password |
| TENANT_ID | ID do tenant do Azure | your_tenant_id |
| DEFENDER_CLIENT_ID | Client ID do Defender | your_defender_client_id |
| DEFENDER_CLIENT_SECRET | Client Secret do Defender | your_defender_client_secret |

### Frontend

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| REACT_APP_API_URL | URL da API do backend | http://localhost:3000/api |

## 🔑 Credenciais de Demonstração

O sistema vem com usuários pré-configurados para demonstração:

| Perfil | Usuário | Senha |
|--------|---------|-------|
| Admin | admin | admin123 |
| Gestor | gestor | gestor123 |
| Analista | analista | analista123 |

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📞 Suporte

Se você tiver alguma dúvida ou encontrar algum problema, por favor:

1. Verifique a documentação
2. Procure por issues existentes
3. Crie uma nova issue com detalhes sobre seu problema

---

Desenvolvido com ❤️ para equipes de segurança.