const ciclo = require("../models")

const getCicloMenstrual = async (idUser) => {
    return await ciclo.CicloMenstrual.findAll({
        where: {
            usuario_id: idUser
        }
    })
}

const requestCiclo = async(request, reply) => {
    const userId = request.body.id

    const cicloUser = await getCicloMenstrual(userId)
    try {
        if (cicloUser.length > 0) {
            const proxCiclo = getProxCiclo(cicloUser[0].fim)
    
            reply.send({
                dias: proxCiclo
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
    
    const nextCiclo = new Date(parseInt(dateFinal.year), parseInt(dateFinal.month), parseInt(dateFinal.day) + 30)
    const actualDate = new Date()
    const diasMilissegundos = nextCiclo - actualDate

    const diferencaDias =  diasMilissegundos / (1000 * 60 * 60 * 24);

    return Math.ceil(diferencaDias)
}

module.exports = {
    getCicloMenstrual, requestCiclo, getProxCiclo, requestCiclo
}