const models = require('../models');
const bcrypt = require("bcryptjs")

const createUsuario = async (request, reply) => {
  const { nome, email, passrowd, data_nascimento } = request.body;
  try {
    if (![nome, email, passrowd, data_nascimento].includes("")) {
      const senha = await bcrypt.hash(passrowd, 8)

      console.log(nome + " " + email + " " + senha)
      const usuario = await models.Usuario.create({ nome, email, senha });
      reply.send(usuario);
    } else {
      reply.status(400).send({ error: "Falta envio de dados" })
    }
  } catch (err) {

    reply.status(500).send({ error: 'Falha ao criar usuário', details: err.toString() });
  }
};

module.exports = {
  createUsuario
};
