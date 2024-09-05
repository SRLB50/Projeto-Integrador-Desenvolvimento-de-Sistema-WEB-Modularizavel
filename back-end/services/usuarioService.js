const models = require('../models');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUsuario = async (request, reply) => {
  const { nome, email, password, data_nascimento } = request.body;
  try {
    if (![nome, email, password, data_nascimento].includes("")) {

      const hasUser = await models.Usuario.findAll({
        where: {
          email: email
        }
      })

      if (hasUser.length == 0) {
        const senha = await bcrypt.hash(password, 8)

        console.log(nome + " " + email + " " + senha)
        const usuario = await models.Usuario.create({ nome, email, senha, data_nascimento });
        
        const {id} = usuario

        const objJwt = {nome, email, id, data_nascimento} 
        const token = jwt.sign(objJwt, "secretIdForMyJWTTokenToSecurityBackEnd", {
          expiresIn: '3h'
      })

        if (usuario) {
          
          reply.send({
            status: "1",
            message: 'usuário cadastrado com sucesso!',
            token: token
          });
          
        }
      } else {
        reply.status(400).send({ 
          status : "2",
          error: "Usuário já cadastrado no sistema" 
        })
      }

    } else {
      reply.status(400).send({ 
        status : "2",
        error: "Falta envio de dados" 
      })
    }
  } catch (err) {

    reply.status(500).send({ 
      status : "3",
      error: 'Falha ao criar usuário', 
      details: err.toString() 
    });
  }
};

module.exports = {
  createUsuario
};
