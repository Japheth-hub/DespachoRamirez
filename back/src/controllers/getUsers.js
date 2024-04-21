const { User, Notification, Category, Record } = require("../db");

module.exports = async function getUsers(){
  try {
      const users = await User.findAll({
        include: [
          { model: Notification },
          { model: Category },
          { model: Record },
        ],
      });
      const clearData = users.map((item) => {
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          records: item.Records,
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
  } catch (error) {
    console.log(error)
    return error
  }
}