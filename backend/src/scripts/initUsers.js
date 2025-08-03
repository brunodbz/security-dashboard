const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB conectado');
  createUsers();
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
  process.exit(1);
});

const createUsers = async () => {
  try {
    // Verificar se já existem usuários
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Usuários já existem no banco de dados');
      process.exit(0);
    }

    // Criar usuários iniciais
    const users = [
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        active: true
      },
      {
        username: 'gestor',
        password: await bcrypt.hash('gestor123', 10),
        role: 'gestor',
        active: true
      },
      {
        username: 'analista',
        password: await bcrypt.hash('analista123', 10),
        role: 'analista',
        active: true
      }
    ];

    await User.insertMany(users);
    console.log('Usuários criados com sucesso');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar usuários:', error);
    process.exit(1);
  }
};