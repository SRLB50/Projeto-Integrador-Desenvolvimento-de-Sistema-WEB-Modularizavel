const fastify = require('fastify')({ logger: true });
const Sequelize = require('sequelize');
const models = require('./models');
const usuarioService = require('./services/usuarioService');

// sincronizar Database
models.sequelize.sync().then(() => {
  console.log('Database sincronizada');
}).catch(err => {
  console.error('Erro ao conectar no banco:', err);
});

// Rota para criar usuário
fastify.post('/usuarios', usuarioService.createUsuario)

// Rotas CRUD para sintomas
fastify.post('/sintomas', sintomasService.createSintoma);
fastify.get('/sintomas', sintomasService.getAllSintomas);
fastify.get('/sintomas/:id', sintomasService.getSintomaById);
fastify.put('/sintomas/:id', sintomasService.updateSintoma);
fastify.delete('/sintomas/:id', sintomasService.deleteSintoma);

// Roda o server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('porta 3000 está rodando http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
