const axios = require("axios");
const { Notification } = require("../db");

module.exports = async function getUsers() {
  try {
    const  data  = ['sms', 'email', 'push']
    data.map((type) => {
      Notification.create({
        name: type
      });
    });
    console.log("Notificaciones cargadas");
  } catch (error) {
    console.log(error);
  }
};
