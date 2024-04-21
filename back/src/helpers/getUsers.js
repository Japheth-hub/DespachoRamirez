const axios = require("axios");
const { User, Notification, Category } = require("../db");

module.exports = async function getUsers() {
  try {
    const { data } = await axios("https://jsonplaceholder.typicode.com/users");
    
    data.map(async (user) => {
      const notif1 = Math.ceil(Math.random() * 3);
      const notif2 = Math.ceil(Math.random() * 3);
      const category1 = Math.ceil(Math.random() * 3);
      const category2 = Math.ceil(Math.random() * 3);
      const [userDB, created] = await User.findOrCreate({
        where: { email: user.email },
        defaults: {
          name: user.name,
          phone: user.phone.split(' ')[0]
        },
      });

      if(created){
        const notifications = await Notification.findOne({where : {id : notif1}})
        const notifications2 = await Notification.findOne({where : {id : notif2}})
        const categories = await Category.findOne({where : {id : category1}});
        const categories2 = await Category.findOne({where : {id : category2}});
        
        await userDB.addNotification(notifications);
        await userDB.addNotification(notifications2);
        await userDB.addCategory(categories);
        await userDB.addCategory(categories2);
      }


    });
    console.log("Usuarios cargados");
  } catch (error) {
    console.log(error);
  }
};
