const models = require('../models');

const createUsuario = async (request, reply) => {
  const { nome, email, senha } = request.body;

  try {
    const usuario = await models.Usuario.create({ nome, email, senha });
    reply.send(usuario);
  } catch (err) {
    reply.status(500).send({ error: 'Falha ao criar usuário', details: err });
  }
};

module.exports = {
  createUsuario,
};
