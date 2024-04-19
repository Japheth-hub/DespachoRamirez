const { User, Notification, Category } = require("../db");

module.exports = async function getUsers(id){
  try {
    if(!id){

      const users = await User.findAll({
        include: [
          { model: Notification },
          { model: Category }
        ],
      });
      const clearData = users.map((item) => {
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          notifications: item.Notifications.map((element) => {
            return {
              id : element.id, 
              name : element.name
            }
          }),
          categories: item.Categories.map((element) => {
            return {
              id : element.id, 
              name : element.name
            }
          })
        }
      })
      return clearData.length > 0 ? clearData : "No hay Usuarios";

    } else {

      const user = await User.findOne({
        where : {id : parseInt(id)}, 
        include : [
          {model : Notification},
          {model : Category}
        ]
      })
      const clearData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        notifications: user.Notifications?.map((element) => {
          return {
            id: element.id,
            name: element.name,
          };
        }),
        categories: user.Categories?.map((element) => {
          return {
            id: element.id,
            name: element.name,
          };
        }),
      };
      return clearData ? clearData : "No existe ese usuario";
    }

  } catch (error) {
    console.log(error)
    return error
  }
}