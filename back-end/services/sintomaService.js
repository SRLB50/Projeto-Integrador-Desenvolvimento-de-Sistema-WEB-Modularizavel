const models = require('../models')
const { formatedDateToClient , formatedDateToDataBase } = require("../utils/dateUtils")

const createSintoma = async (request, reply) => {
	const { userId, data, descricao } = request.body; 
  
	if(!descricao) {
	  reply.status(400).send({ erro: 'Campo descrição é obrigatório!' });
	  return;
	} else if(!data) {
	  reply.status(400).send({ erro: 'Campo data é obrigatório!' });
	  return;
	}
  
	try {
	  const dataFormated = formatedDateToDataBase(data);
	  const sintoma = await models.Sintomas.create({
		usuario_id: userId,  
		data: dataFormated,
		descricao
	  });
	  reply.send(sintoma);
	} catch (err) {
	  reply.status(500).send({ erro: 'Falha ao cadastrar sintoma.', details: err });
	}
  }

const getSintomaByIdUser = async (request, reply) => {
	const { userId } = request.query;
  
	try {
	  const sintomas = await models.Sintomas.findAll({
		where: { usuario_id: userId } 
	  });
  
	  if (sintomas.length > 0) {
		const sintomaFormatado = sintomas.map(sintoma => { 
			const sintomaData = sintoma.get()
			sintomaData.data = formatedDateToClient(sintoma.data)
			return sintomaData
		})

		reply.send(sintomaFormatado)
		return
	  } else {
		reply.status(200).send({ erro: "Nenhum sintoma encontrado para o usuário especificado!" });
	  }
	} catch (err) {
	  reply.status(500).send({ erro: 'Erro ao obter sintomas.', details: err.message });
	}
  };

  const updateSintoma = async (request, reply) => {
	const { id, descricao } = request.body;
  
	if (!descricao) {
	  reply.status(400).send({ erro: 'Campo descrição é obrigatório!' });
	  return;
	}
  
	try {
	  const sintoma = await models.Sintomas.findByPk(id);
	  if (sintoma) {
		sintoma.descricao = descricao;
		await sintoma.save();
  
		reply.send({ message: 'Alteração realizada com sucesso!' });
	  } else {
		reply.status(404).send({ erro: 'Nenhum sintoma encontrado!' });
	  }
	} catch (err) {
	  reply.status(500).send({ erro: 'Erro ao atualizar sintoma.', details: err });
	}
  };
  

const deleteSintoma = async ( request, reply ) => {
	const { id } = request.query;

	try {
		const sintoma = await models.Sintomas.findByPk(id)
		if(sintoma) {
			await sintoma.destroy()

			reply.send({message: "sintoma deletado com sucesso!"})
		} else {
			reply.status(404).send({ erro: "Não foi possível deletar sintoma!"})
		}
	} catch (err) {
		reply.status(500).send({ erro: 'Erro ao deletar sintomas.', details: err})
	}
}

module.exports = {
  createSintoma,
  getSintomaByIdUser,
  updateSintoma,
  deleteSintoma,
};