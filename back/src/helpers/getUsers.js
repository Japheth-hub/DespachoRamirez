const axios = require("axios");
const { User } = require("../db");

module.exports = async function getUsers() {
  try {
    const { data } = await axios("https://jsonplaceholder.typicode.com/users");
    data.map((user) => {
      User.create({
        name: user.name,
        email: user.email,
        phone: user.phone.slice(0, 10),
      });
    });
    console.log("Usuarios cargados");
  } catch (error) {
    console.log(error);
  }
};
