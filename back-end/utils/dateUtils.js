const formatedDateToDataBase = (string) => {
    const [day, month, year] = string.split('-');
    return `${year}-${month}-${day}`;
}

const formatedDateToClient = (string) => {
    const [year, month, day] = string.split('-');
    return `${day}-${month}-${year}`;
}

module.exports = {
    formatedDateToDataBase,
    formatedDateToClient
}
