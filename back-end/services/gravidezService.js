const { Op } = require("sequelize");
const db = require("../models");
const { formatedDateToClient , formatedDateToDataBase } = require("../utils/dateUtils");

const startGravidez = async (request , reply) => {
    const userId  =  request.body.userId;
    const dataInicio = request.body.dataInicio;

    try {

        const usuario = await db.Usuario.findByPk(userId);

        const dataInicioObj = formatedDateToDataBase(dataInicio);

        const duracaoGestacao = 280;
        const dataFimObj = new Date(dataInicioObj);
        dataFimObj.setDate(dataFimObj.getDate() + duracaoGestacao);
        const dataFim = dataFimObj.toISOString().split('T')[0];
            
        const existingGravidez = await db.Gravidez.findOne({
            where: {
                usuario_id: userId,
                [Op.or]: [
                    {
                        inicio: {
                            [Op.between]: [dataInicioObj, dataFimObj]
                        }
                    },
                    {
                        fim: {
                            [Op.between]: [dataInicioObj, dataFimObj]
                        }
                    },
                    {
                        inicio: { [Op.gte]: dataInicioObj },
                        fim: { [Op.lte]: dataFimObj }
                    }
                ]
            }
        });
    
        if (existingGravidez) {
            return reply.code(400).send({ error: 'Já existe uma gravidez registrado para o mesmo período ou sobrepondo-o.' });
        }
        
        const novaGravidez = await usuario.createGravidez({
            inicio: dataInicioObj,
            fim: dataFim,
        });

        reply.send({
            message: 'Gravidez registrada com sucesso!',
            dataFim: formatedDateToClient(novaGravidez.fim),
        })
    } catch (error) {
        console.error(error);
        reply.status(500).send({error: 'Erro ao registrar gravidez'});
    }
}

const getGravidez = async (request , reply) => {
    const {userId}  =  request.query;
    try {
        const gravidezes = await db.Gravidez.findAll({
            where: {
                usuario_id: userId,
            }
        });
        const gravidezesAtualizada = gravidezes.map(gravidez => {
            const gravidezData = gravidez.get();
            gravidezData.inicio = formatedDateToClient(gravidezData.inicio);
            gravidezData.fim = formatedDateToClient(gravidezData.fim);
            return gravidezData;
        });
        reply.send(gravidezesAtualizada);
    } catch (error) {
        reply.code(500).send({ error: 'Erro ao buscar gravidezes' });
    }
  };

  const finishGravidez = async (request , reply) => {
    const {id , data , userId} = request.body;
    try {
        const gravidez = await db.Gravidez.findByPk(id);
        if(!gravidez){
            return reply.code(404).send({message: "Gravidez não encontrada"});
        } else if(userId == gravidez.usuario_id){
            gravidez.fim = formatedDateToDataBase(data);
            await gravidez.save();
        }
        const gravidezAtualizada = { ...gravidez.get() };
        gravidezAtualizada.inicio = formatedDateToClient(gravidezAtualizada.inicio);
        gravidezAtualizada.fim = formatedDateToClient(gravidezAtualizada.fim);
        reply.send(gravidezAtualizada);
    } catch (error) {
        reply.code(500).send({error: 'Erro ao atualizar gravidez'});
    }
  }

module.exports = {
    startGravidez , 
    getGravidez , 
    finishGravidez
}