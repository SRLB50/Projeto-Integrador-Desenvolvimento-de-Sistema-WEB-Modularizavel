const fastify = require('fastify')({ logger: true });
const Sequelize = require('sequelize');
const models = require('./models');
const usuarioService = require('./services/usuarioService');
const cicloService = require('./services/cicloMenstrualService');
const authService = require("./services/authService")
const gravidezService = require('./services/gravidezService');

// sincronizar Database
models.sequelize.sync().then(() => {
  console.log('Database sincronizada');
}).catch(err => {
  console.error('Erro ao conectar no banco:', err);
});

// Rota para criar usuário
fastify.post('/usuarios', usuarioService.createUsuario)
fastify.post('/login', authService.login)

//Rotas para ciclo menstrual
fastify.post('/dias-ciclo', cicloService.requestCiclo) // envia a data inicial do próximo ciclo
fastify.post('/iniciar-ciclo' , cicloService.startCiclo)// inicia o ciclo menstrual
fastify.get('/ciclos' , cicloService.getCiclos)// envia todos os ciclos para o front
fastify.put('/encerrar-ciclo' , cicloService.finishCiclo)//encerra o ciclo em aberto

// Rotas para visualizar, criar e atualizar gravidez
fastify.get('/gravidezes' , gravidezService.getGravidez) //envia todas as gravidezes p/ o front
fastify.post('/iniciar-gravidez' , gravidezService.startGravidez) //cria a gravidez
fastify.put('/atualizar-gravidez' , gravidezService.finishGravidez) //atualiza data fim da gravidez

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
