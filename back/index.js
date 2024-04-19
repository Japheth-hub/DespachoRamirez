const server = require("./src/server");
const { conn } = require("./src/db");
const getUsers = require("./src/helpers/getUsers");
const getNotifications = require('./src/helpers/getNotifications')
const {PORT, TEST} = process.env;


server.listen(PORT, async () => {
  let force = TEST === 'TRUE' ? true : false
  await conn.sync({ force: force });
  if (force) {
    await getUsers();
    await getNotifications();
  }
  console.log(`Listening in ${PORT}`);
});