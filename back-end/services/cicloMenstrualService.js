const { Op } = require("sequelize")
const ciclo = require("../models")
const { formatedDateToClient , formatedDateToDataBase } = require("../utils/dateUtils")

const getCicloMenstrual = async (idUser) => {
    return await ciclo.CicloMenstrual.findAll({
        where: {
            usuario_id: idUser
        },
        order: [['fim', 'DESC']]
    })
}

const requestCiclo = async(request, reply) => {
    const userId = request.body.userId

    const cicloUser = await getCicloMenstrual(userId)
    try {
        if (cicloUser.length > 0) {
            const proxCiclo = getProxCiclo(cicloUser[0].inicio)
    
            reply.send({
                dias: proxCiclo.diferencaDias,
                data: proxCiclo.nextCiclo
            })
        }else{
            reply.status(400).send({response: "Ciclo menstrual não encontrado!"})
        }
    } catch (error) {
        reply.status(500).send({error: error.toString()})
    }
}

const getProxCiclo = (finalDate) =>{
    console.log("Final Date: " + finalDate )
    const dateFinal = {
        year    : new Date(finalDate).getFullYear(),
        month   : new Date(finalDate).getMonth(),
        day     : new Date(finalDate).getDate()
    }
    
    const nextCiclo = new Date(parseInt(dateFinal.year), parseInt(dateFinal.month), parseInt(dateFinal.day) + 28 + 1)
    const actualDate = new Date()
    const diasMilissegundos = nextCiclo - actualDate

    const diferencaDias =  diasMilissegundos / (1000 * 60 * 60 * 24);
    const formattedNextCiclo = `${nextCiclo.getFullYear()}-${String(nextCiclo.getMonth() + 1).padStart(2, '0')}-${String(nextCiclo.getDate()).padStart(2, '0')}`;
    return {
        diferencaDias: Math.ceil(diferencaDias),
        nextCiclo: formatedDateToClient(formattedNextCiclo)
    }    
}

const startCiclo = async (request , reply) => {
    const userId = request.body.userId;
    const inicio = formatedDateToDataBase(request.body.inicio);
    const fim = new Date().toISOString().split('T')[0];

    try {
        const existingCiclo = await ciclo.CicloMenstrual.findOne({
            where: {
                usuario_id: userId,
                [Op.or]: [
                    {
                        inicio: {
                            [Op.between]: [inicio, fim]
                        }
                    },
                    {
                        fim: {
                            [Op.between]: [inicio, fim]
                        }
                    },
                    {
                        inicio: { [Op.gte]: inicio },
                        fim: { [Op.lte]: fim }
                    }
                ]
            }
        });
    
        if (existingCiclo) {
            return reply.code(400).send({ error: 'Já existe um ciclo registrado para o mesmo período ou sobrepondo-o.' });
        }
        const newCiclo = await ciclo.CicloMenstrual.create({
            usuario_id: userId,
            inicio,
            fim: null,
        });
        const formatedNewCiclo = {...newCiclo.get()};
        formatedNewCiclo.inicio = formatedDateToClient(formatedNewCiclo.inicio);
        reply.send(formatedNewCiclo);
    } catch (error) {
        reply.code(500).send({error: 'Erro ao registrar novo ciclo ' + error.message});
    }
}

const getCiclos = async (request , reply) => {
    const {userId}  =  request.query;
    try {
        const ciclos = await ciclo.CicloMenstrual.findAll({
            where: {
                usuario_id: userId,
            }
        });
        if(ciclos.length > 0){
            const ciclosAtualizados = ciclos.map(ciclo => {
                const cicloData = ciclo.get();
                cicloData.inicio = formatedDateToClient(cicloData.inicio);
                cicloData.fim = formatedDateToClient(cicloData.fim);
                return cicloData;
            });
            reply.send(ciclosAtualizados)
        };
      reply.send({ message: 'Nenhum ciclo registrado'});
    } catch (error) {
        reply.code(500).send({ error: 'Erro ao buscar ciclos' });
    }
  };

  const finishCiclo = async (request , reply) => {
    try {
        const userId = request.body.userId;
        const date = request.body.dataFim;
        const currentCiclo = await ciclo.CicloMenstrual.findOne({
            where: {
                usuario_id: userId,
                fim: null,
            }
        })
        currentCiclo.fim = formatedDateToDataBase(date);
        await currentCiclo.save();
        const formatedCurrentCiclo = {...currentCiclo.get()};
        formatedCurrentCiclo.inicio = formatedDateToClient(formatedCurrentCiclo.inicio);
        formatedCurrentCiclo.fim = formatedDateToClient(formatedCurrentCiclo.fim);
        reply.send(formatedCurrentCiclo);
    } catch (error) {
        reply.code(500).send({error: 'Erro ao buscar ciclo'});
    }
  }

module.exports = {
    getCicloMenstrual, 
    requestCiclo, 
    getProxCiclo, 
    requestCiclo,
    startCiclo,
    getCiclos,
    finishCiclo,
}