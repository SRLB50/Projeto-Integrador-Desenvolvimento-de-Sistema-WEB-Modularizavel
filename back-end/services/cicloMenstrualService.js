const ciclo = require("../models")

const getCicloMenstrual = async (idUser) => {
    return await ciclo.CicloMenstrual.findAll({
        where: {
            usuario_id: idUser
        }
    })
}

const requestCiclo = async(request, reply) => {

}

const getProxCiclo = (finalDate) =>{
    console.log("Final Date: " + finalDate )
    const dateFinal = {
        year    : new Date(finalDate).getFullYear(),
        month   : new Date(finalDate).getMonth(),
        day     : new Date(finalDate).getDate()
    }
    console.log("Data Final")
    console.log(dateFinal)
    const nextCiclo = new Date(parseInt(dateFinal.year), parseInt(dateFinal.month), parseInt(dateFinal.day) + 30)
    console.log("Próxima menstruação:")
    console.log(nextCiclo)
    const actualDate = new Date()
    const diasMilissegundos = nextCiclo - actualDate

    const diferencaDias =  diasMilissegundos / (1000 * 60 * 60 * 24);

    return Math.ceil(diferencaDias)
}

module.exports = {
    getCicloMenstrual, requestCiclo, getProxCiclo
}