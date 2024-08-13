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

    if (users.length > 0) {
      const isMatch = await bcrypt.compare(password, users[0].senha)

      if (isMatch) {
        const ciclo = await menstruacao.getCicloMenstrual(users[0].id)

        const dados_usuario = new LoginUser(users, ciclo).returnData()

        reply.send({ response: "Seja bem-vindo!", dados_usuario })
      } else {
        reply.status(400).send({ error: "Usuário não encontrado!" })
      }
    } else {
      reply.status(400).send({ error: "Usuário não encontrado!" })
    }
  } catch (error) {
    reply.status(500).send({ erro: error.toString() })
  }
}

class LoginUser {
  constructor(user, ciclo) {
    this.user = user
    this.ciclo = ciclo
  }

  #dataUser(){
    const nextCiclo =  menstruacao.getProxCiclo(String(this.ciclo[0].fim)) 

    const {nome, email, id} = this.user[0]
    
    return {
      id,
      nome, 
      email,
      ciclo: nextCiclo
    }
  }

  returnData(){
    return this.#dataUser()
  }
  
}

module.exports = {
  createUsuario, login
};
