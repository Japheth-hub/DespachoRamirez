const server = require("./src/server");
const { conn } = require("./src/db");
const getUsers = require("./src/helpers/getUsers");
const getNotifications = require('./src/helpers/getNotifications')
const PORT = process.env.PORT;

server.listen(async () => {
  try {
    await conn.sync({ force: true });
    await getUsers();
    await getNotifications();
    console.log(`Listening in ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
