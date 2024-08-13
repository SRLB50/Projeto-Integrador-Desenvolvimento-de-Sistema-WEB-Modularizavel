const models = require('../models')

const createSintoma = async (request, reply) => {
  const { usuario_id, data, descricao } = request.body; 
    
  try {
    const sintoma = await models.sintoma.create({usuario_id, data, descricao})
    reply.send(sintoma)
  } catch (err) {
    reply.status(400).send({ erro: 'falha ao cadastrar sintoma.', details: err})
  }
}

const getAllSintomas = async (request, reply) => {
  const { usuario_id } = request.body; 
    
  try {
    const sintoma = await models.sintoma.findAll({usuario_id})
    reply.send(sintoma)
  } catch (err) {
    reply.status(400).send({ erro: 'Erro ao obter sintomas.', details: err})
  }
}

const  getSintomaByIdUser = async ( request, reply ) => {
	const { usuario_id } = request.body

	try {
		const sintoma = await models.sintoma.findByPk(usuario_id)
		if(sintoma) {
			reply.send(sintoma)
		} else {
			reply.status(400).send({ erro: "nenhum sintoma encontrado!"})
		}
	} catch (err) {
		reply.status(400).send({ erro: 'Erro ao obter sintomas.', details: err})
	}
}

const  updateSintoma = async ( request, reply ) => {
	const { id } = request.params;
  const { usuario_id, data, descricao } = request.body;

	try {
		const sintoma = await models.sintoma.findByPk(id)
		if(sintoma) {
			sintoma.id = usuario_id
			sintoma.data = data
			sintoma.descricao = descricao
			await sintoma.save()

			reply.send(sintoma)
		} else {
			reply.status(400).send({ erro: "nenhum sintoma encontrado!"})
		}
	} catch (err) {
		reply.status(400).send({ erro: 'Erro ao obter sintomas.', details: err})
	}
}

const deleteSintoma = async ( request, reply ) => {
	const { id } = request.params;

	try {
		const sintoma = await models.sintoma.findByPk(id)
		if(sintoma) {
			await sintoma.destroy()

			reply.send({message: "sintoma deletado com sucesso!"})
		} else {
			reply.status(400).send({ erro: "Não foi possível deletar sintoma!"})
		}
	} catch (err) {
		reply.status(400).send({ erro: 'Erro ao deletar sintomas.', details: err})
	}
}

module.exports = {
  createSintoma,
  getAllSintomas,
  getSintomaByIdUser,
  updateSintoma,
  deleteSintoma,
};