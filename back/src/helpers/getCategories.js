const axios = require("axios");
const { Category } = require("../db");

module.exports = async function getUsers() {
  try {
    const data = ["sports", "finance", "movies"];
    data.map((type) => {
      Category.create({
        name: type,
      });
    });
    console.log("Categorias cargadas");
  } catch (error) {
    console.log(error);
  }
};
