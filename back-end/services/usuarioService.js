const models = require('../models');
const menstruacao = require("./cicloMenstrualService")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUsuario = async (request, reply) => {
  const { nome, email, password, data_nascimento } = request.body;
  try {
    if (![nome, email, password, data_nascimento].includes("")) {
      const senha = await bcrypt.hash(password, 8)

      console.log(nome + " " + email + " " + senha)
      const usuario = await models.Usuario.create({ nome, email, senha, data_nascimento });
      reply.send({message: 'usuário cadastrado com sucesso!', dados: usuario});
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

    const {nome, email, id, data_aniversario} = this.user[0]

    const jwtObj = {
      id,
      nome, 
      email,
      data_aniversario,
      ciclo: nextCiclo
    }

    const token = jwt.sign(jwtObj, "secretIdForMyJWTTokenToSecurityBackEnd", {
      expiresIn: '3h'
    })

    return {
      token
    }
  }

  returnData(){
    return this.#dataUser()
  }
  
}

module.exports = {
  createUsuario, login
};
