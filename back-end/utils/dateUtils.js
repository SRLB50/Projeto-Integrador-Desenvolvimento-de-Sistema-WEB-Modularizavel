const formatedDateToDataBase = (string) => {
  const [day, month, year] = string.split("/");
  return `${year}-${month}-${day}`;
};

const formatedDateToClient = (data) => {
  if (data) {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } else {
    return data;
  }
};

module.exports = {
  formatedDateToDataBase,
  formatedDateToClient,
};
