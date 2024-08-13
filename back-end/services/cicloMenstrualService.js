const ciclo = require("../models")

const getCicloMenstrual = async (idUser) => {
    const cicloMenstrual = await ciclo.CicloMenstrual.findAll({
        where: {
            usuario_id: idUser
        }
    })

    return await cicloMenstrual;
}

const requestCiclo = async(request, reply) => {

}

module.exports = {
    getCicloMenstrual, requestCiclo
}