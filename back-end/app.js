const fastify = require('fastify')({ logger: true });
const models = require('./models');
const usuarioService = require('./services/usuarioService');
const cicloService = require('./services/cicloMenstrualService');
const sintomasService = require('./services/sintomaService');
const authService = require("./services/authService")
const fastifyCors = require('@fastify/cors');

// sincronizar Database
models.sequelize.sync().then(() => {
  console.log('Database sincronizada');
}).catch(err => {
  console.error('Erro ao conectar no banco:', err);
});


fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Rota para criar usuário
fastify.post('/usuarios', usuarioService.createUsuario)
fastify.post('/login', authService.login)
fastify.post('/dias-ciclo', cicloService.requestCiclo)

// Rotas CRUD para sintomas
fastify.post('/sintomas', sintomasService.createSintoma)
fastify.get('/sintomas/:id', sintomasService.getSintomaByIdUser)
fastify.put('/sintomas/:id', sintomasService.updateSintoma)
fastify.delete('/sintomas/:id', sintomasService.deleteSintoma)

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
