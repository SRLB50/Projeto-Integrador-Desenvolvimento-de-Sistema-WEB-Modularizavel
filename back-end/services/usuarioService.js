const models = require('../models');
const menstruacao = require("./cicloMenstrualService")
const bcrypt = require("bcryptjs")

const createUsuario = async (request, reply) => {
  const { nome, email, passrowd } = request.body;
  try {
    if (![nome, email, passrowd].includes("")) {
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

const login = async (request, reply) => {
  const { login, password } = request.body
  try {
    const users = await models.Usuario.findAll({
      where: {
        email: login
      }
    })

    console.log(users)
    if (users.length > 0) {
      const isMatch = await bcrypt.compare(password, users[0].senha)

      if (isMatch) {
        const ciclo = menstruacao.getCicloMenstrual(users[0].id)

        const {nome, email} = users
        reply.send({ response: "Seja bem-vindo!", usuario: {nome, email}, ciclo: ciclo })
      }else{
        reply.status(400).send({ error: "Usuário não encontrado!" })
      }
    } else {
      reply.status(400).send({ error: "Usuário não encontrado!" })
    }
  } catch (error) {
    reply.status(500).send({ erro: error.toString() })
  }
}

module.exports = {
  createUsuario, login
};
