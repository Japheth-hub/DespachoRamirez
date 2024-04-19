const { Category } = require("../db");

module.exports = async function getNotifications() {
  try {
    const data = await Category.findAll();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
